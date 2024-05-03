import { Router } from "express";
import { ProductRouter } from "./ProductController";

export const AppV1Router = Router();

AppV1Router.use('/products', ProductRouter)