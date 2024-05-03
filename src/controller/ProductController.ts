
import { NextFunction, Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { BaseController, BaseControllerImpl, CONTROLLER_METHODS_ENTRY_POINT, TypedRequest } from "./common/BaseController";


export class ProductController implements BaseController<Product> {
    private static repository = AppDataSource.getRepository(Product);

    get(req: Request, res: Response, next: NextFunction) {
        return BaseControllerImpl.get<Product>(req, res, next, ProductController.repository)
    }
    getByID(req: Request, res: Response, next: NextFunction) {
        return BaseControllerImpl.getByID<Product>(req, res, next, ProductController.repository)
    }
    put(req: TypedRequest<Product>, res: Response, next: NextFunction) {
        return BaseControllerImpl.put<Product>(req, res, next, ProductController.repository)
    }
    delete(req: TypedRequest<Product>, res: Response, next: NextFunction) {
        return BaseControllerImpl.delete<Product>(req, res, next, ProductController.repository)
    }
    deleteByID(req: Request, res: Response, next: NextFunction) {
        return BaseControllerImpl.deleteByID<Product>(req, res, next, ProductController.repository)
    }

}

export const ProductRouter = Router();

const controller = new ProductController();

ProductRouter.get(CONTROLLER_METHODS_ENTRY_POINT.get, controller.get);
ProductRouter.get(CONTROLLER_METHODS_ENTRY_POINT.getByID, controller.getByID);
ProductRouter.put(CONTROLLER_METHODS_ENTRY_POINT.put, controller.put);
ProductRouter.delete(CONTROLLER_METHODS_ENTRY_POINT.deleteByID, controller.deleteByID);


export default ProductRouter;