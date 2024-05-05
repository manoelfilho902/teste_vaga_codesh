
import { NextFunction, Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { BaseController, BaseControllerImpl, TypedRequest, setRoutes } from "./common/BaseController";

/**
 * @swagger
 * components:
 *      schemas:
 *          product:
 *              type: Object
 *              required:
 *                  - code
 *                  - status
 *                  - imported_t
 *                  - url
 *                  - creator
 *                  - created_t
 *                  - last_modified_t
 *                  - product_name
 *                  - quantity
 *                  - brands
 *                  - categories
 *                  - labels
 *                  - cities
 *                  - purchase_places
 *                  - stores
 *                  - ingredients_text
 *                  - traces
 *                  - serving_size
 *                  - serving_quantity
 *                  - nutriscore_score
 *                  - nutriscore_grade
 *                  - main_category
 *                  - image_url
 *               properties:
 *                   code:
 *                     type: number
 *                     description: auto generated field        
 *                   status:
 *                     type: string
 *                     description: auto generated field        
 *                   imported_t:
 *                     type: string
 *                     format: date
 *                     description: auto generated field        
 *                   url:
 *                     type: string
 *                     description: auto generated field        
 *                   creator:
 *                     type: string
 *                     description: auto generated field        
 *                   created_t:
 *                     type: number
 *                     description: auto generated field        
 *                   last_modified_t:
 *                     type: number
 *                     description: auto generated field        
 *                   product_name:
 *                     type: string
 *                     description: auto generated field        
 *                   quantity:
 *                     type: string
 *                     description: auto generated field        
 *                   brands:
 *                     type: string
 *                     description: auto generated field        
 *                   categories:
 *                     type: string
 *                     description: auto generated field        
 *                   labels:
 *                     type: string
 *                     description: auto generated field        
 *                   cities:
 *                     type: string
 *                     description: auto generated field        
 *                   purchase_places:
 *                     type: string
 *                     description: auto generated field        
 *                   stores:
 *                     type: string
 *                     description: auto generated field        
 *                   ingredients_text:
 *                     type: string
 *                     description: auto generated field        
 *                   traces:
 *                     type: string
 *                     description: auto generated field        
 *                   serving_size:
 *                     type: string
 *                     description: auto generated field        
 *                   serving_quantity:
 *                     type: number
 *                     description: auto generated field        
 *                   nutriscore_score:
 *                     type: number
 *                     description: auto generated field        
 *                   nutriscore_grade:
 *                     type: string
 *                     description: auto generated field        
 *                   main_category:
 *                     type: string
 *                     description: auto generated field        
 *                   image_url:
 *                     type: string
 *                     description: auto generated field
 *               example: 
 *                   code: 20221126
 *                   status: published
 *                   imported_t: 2020-02-07T16:00:00Z
 *                   url: https://world.openfoodfacts.org/product/20221126
 *                   creator: securita
 *                   created_t: 1415302075
 *                   last_modified_t: 1572265837
 *                   product_name: Madalenas quadradas
 *                   quantity: 380 g (6 x 2 u.)
 *                   brands: La Cestera
 *                   categories: Lanches comida, Lanches doces, Biscoitos e Bolos, Bolos, Madalenas
 *                   labels: Contem gluten, Contém derivados de ovos, Contém ovos
 *                   cities: 
 *                   purchase_places: Braga,Portugal
 *                   stores: Lidl
 *                   ingredients_text: farinha de trigo, açúcar, óleo vegetal de girassol, clara de ovo, ovo, humidificante (sorbitol), levedantes químicos (difosfato dissódico, hidrogenocarbonato de sódio), xarope de glucose-frutose, sal, aroma
 *                   traces: Frutos de casca rija,Leite,Soja,Sementes de sésamo,Produtos à base de sementes de sésamo
 *                   serving_size: madalena 31.7 g
 *                   serving_quantity: 31.7
 *                   nutriscore_score: 17
 *                   nutriscore_grade: d
 *                   main_category: en:madeleines
 *                   image_url: https://static.openfoodfacts.org/images/products/20221126/front_pt.5.400.jpg
 *               
 */

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

setRoutes(ProductRouter, controller);

export default ProductRouter;