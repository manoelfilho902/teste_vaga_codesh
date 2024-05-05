import { NextFunction, Request, Response, Router } from "express";
import { CustomBaseEntity } from "../../entity/common/BaseEntity";
import { Product } from "../../entity/Product";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

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
    total_size: number
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
        let sort = {};
        let col  = getMainColumn(repository);
        if(req.query.sort){
            let aux = req.query.sort.toString();
            let fields = aux.substring(0, aux.lastIndexOf(','));
            let dir = aux.substring(aux.lastIndexOf(',')+1); //+1 para ignorar a vírgula
            console.log(dir);
            
            for(let field of fields.split(',')){
                sort[field] = dir;
            }           
        } else{
            sort[col.databaseName] = 'ASC';
            page.sort = {
                by: col.databaseName,
                ord: 'ASC'
            }
        }
        repository.count().then(c => {
            if(c && c > 0){
                repository.find({ skip: page.size * page.page, take: page.size, order: sort }).then(result => {
                    page.content = result;
                    page.total_size = c;
                    page.size = result.length;
                    res.send(page)
                }).catch(err => next(err))
            }else{
                page.size = 0;
                res.send(page)
            }
        }).catch(err => next(err))
    }

    static getByID<T extends CustomBaseEntity>(req: Request, res: Response, next: NextFunction, repository: Repository<T>) {
        if (!req.params.code || isNaN(Number(req.params.code))) {
            res.status(400).send('Please send a valid code!');
        }

        
        let col = getMainColumn(repository);

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

export function setRoutes<c extends BaseController<CustomBaseEntity>>(router: Router, controller: c ){
    router.get(CONTROLLER_METHODS_ENTRY_POINT.get, controller.get);
    router.get(CONTROLLER_METHODS_ENTRY_POINT.getByID, controller.getByID);
    router.put(CONTROLLER_METHODS_ENTRY_POINT.put, controller.put);
    router.delete(CONTROLLER_METHODS_ENTRY_POINT.deleteByID, controller.deleteByID);
}

/**
 * @description Busca a coluna ID do model a partir dos metadados
 * @param repository 
 * @returns 
 */
export function getMainColumn<T>(repository: Repository<T>): ColumnMetadata {
    let columns = AppDataSource.getMetadata(repository.target).columns;
    let col = columns[0];
    // procura a coluna id
    for (let index = 0; index < columns.length; index++) {
        if (col.isPrimary) {
            break;
        }
        col = columns[index];
    }

    return col;
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
        total_size: 0,
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

