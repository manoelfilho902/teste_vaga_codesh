import { NextFunction, Request, Response } from "express";
import { CustomBaseEntity } from "../../entity/common/BaseEntity";
import { Product } from "../../entity/Product";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

/**
 * @param T is any type of body from a request
 */
export interface TypedRequest<T> extends Express.Request, Request {
    body: T
}

/**
 * @param T type of content list
 * @param contet list of T
 * @param page is the page number init in 0
 * @param size total of elements of this request
 * @param sort sort by and the direction
 */
export interface page<T> {
    content: T[];
    page: number;
    size: number;
    sort: {
        by: string,
        ord: 'ASC' | 'DES'
    }
}


/**
 * @param T the entity class
 */

export interface BaseController<T extends CustomBaseEntity> {
    get(req: Request, res: Response, next: NextFunction);
    getByID(req: Request, res: Response, next: NextFunction);
    put(req: TypedRequest<Product>, res: Response, next: NextFunction);
    delete(req: TypedRequest<Product>, res: Response, next: NextFunction);
    deleteByID(req: Request, res: Response, next: NextFunction);
}

export abstract class BaseControllerImpl {

    static get<T extends CustomBaseEntity>(req: Request, res: Response, next: NextFunction, repository: Repository<T>) {
        let page = getPage(req);
        repository.find({ skip: page.size * page.page, take: page.size }).then(result => {
            res.send(result)
        }).catch(err => next(err))
    }

    static getByID<T extends CustomBaseEntity>(req: Request, res: Response, next: NextFunction, repository: Repository<T>) {
        if (!req.params.code || isNaN(Number(req.params.code))) {
            res.status(400).send('Please send a valid code!');
        }

        let columns = AppDataSource.getMetadata(repository.target).columns;
        let col = columns[0];
        // procura a coluna id
        for (let index = 0; index < columns.length; index++) {
            if (col.isPrimary) {
                break;
            }
            col = columns[index];
        }
        let where = {};
        where[col.databaseName] = req.params.code;

        repository.findOneByOrFail(where).then(val => {
            res.send(val);
        }).catch(err => next(err))
    }

    static put<T extends CustomBaseEntity>(req: TypedRequest<Product>, res: Response, next: NextFunction, repository: Repository<T>) {
        if (!isValid(req.body) || Object.getOwnPropertyNames(req.body).length === 0) {
            res.status(400).send('Object is null or undefine!');
        }
        let entity = repository.create(req.body as any);

         repository.save(entity).then(vl => res.send(vl)).catch(err => next(err));
    }

    static delete<T extends CustomBaseEntity>(req: TypedRequest<Product>, res: Response, next: NextFunction, repository: Repository<T>) {
        throw Error('method not implemented');
    }

    static deleteByID<T extends CustomBaseEntity>(req: Request, res: Response, next: NextFunction, repository: Repository<T>) {
        if (!req.params.code || isNaN(Number(req.params.code))) {
            res.status(400).send('Please send a valid code!');
        }

        let columns = AppDataSource.getMetadata(repository.target).columns;
        let col = columns[0];
        // procura a coluna id
        for (let index = 0; index < columns.length; index++) {
            if (col.isPrimary) {
                break;
            }
            col = columns[index];
        }
        let where = {};
        where[col.databaseName] = req.params.code;

        repository.delete(where).then(val => {
            res.send(val);
        }).catch(err => next(err))
    }
}


/**
 * @param T the entity class
 * @description a class whit QBE e functions
 */
export class queryBuider<T extends CustomBaseEntity> {

}

export const CONTROLLER_METHODS_ENTRY_POINT = {
    get: '',
    getByID: '/:code',
    put: '',
    delete: '',
    deleteByID: '/:code',
}


export function getPage<T>(req: Request): page<T> {
    let page: page<T> = {
        content: [],
        page: 0,
        size: 50,
        sort: {
            by: '',
            ord: "ASC"
        }
    }

    if (req.query) {
        page.page = ConvertParamNumeric(req.query.page);
        page.size = ConvertParamNumeric(req.query.size);
        if (req.query.sort) {
            let aux = req.query.sort.toString();
            if (aux) {
                let arr = aux.split(',');
                if (arr.length > 1)
                    page.sort = {
                        by: aux.substring(0, aux.lastIndexOf(',')),
                        ord: arr[arr.length - 1] === 'DES' ? 'DES' : 'ASC'
                    }
            }
        }
    }

    return page;
}

export function ConvertParamNumeric(value: any) {
    let aux = Number(value);
    return value && !isNaN(aux) ? aux.valueOf() : 0;
}

export function isValid(value: any) {
    return value != null && value !== undefined;
}

