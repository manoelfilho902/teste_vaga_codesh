import { AppDataSource } from "./data-source";

import express = require('express');
import cors = require('cors');
import path = require('path');
import { AppV1Router } from "./controller/Router";
// import swaggerJsdoc = require("swagger-jsdoc");
import swaggerUi = require("swagger-ui-express");
import options from "./docs/docs-options";
import { url } from "inspector";
import { Product } from "./entity/Product";

export const PORT = 8080;


AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/v1', AppV1Router)


    //swagger config
    // const specs = swaggerJsdoc(options)
    app.use(express.static("public"));
    app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(require('./docs/openapi3_0.json'), { explorer: true}))



    app.listen(PORT, () => console.log('Server is runing port: ', PORT))
}).catch(error => console.log(error))

//::Todo criar arquivo de teste e reaproveitar esse procedimento
/*let p: Product[] = JSON.parse(`
    [{
        "code": 20221126,
        "status": "published",
        "imported_t": "2020-02-07T16:00:00Z",
        "url": "https://world.openfoodfacts.org/product/20221126",
        "creator": "securita",
        "created_t": 1415302075,
        "last_modified_t": 1572265837,
        "product_name": "Madalenas quadradas",
        "quantity": "380 g (6 x 2 u.)",
        "brands": "La Cestera",
        "categories": "Lanches comida, Lanches doces, Biscoitos e Bolos, Bolos, Madalenas",
        "labels": "Contem gluten, Contém derivados de ovos, Contém ovos",
        "cities": "",
        "purchase_places": "Braga,Portugal",
        "stores": "Lidl",
        "ingredients_text": "farinha de trigo, açúcar, óleo vegetal de girassol, clara de ovo, ovo, humidificante (sorbitol), levedantes químicos (difosfato dissódico, hidrogenocarbonato de sódio), xarope de glucose-frutose, sal, aroma",
        "traces": "Frutos de casca rija,Leite,Soja,Sementes de sésamo,Produtos à base de sementes de sésamo",
        "serving_size": "madalena 31.7 g",
        "serving_quantity": 31.7,
        "nutriscore_score": 17,
        "nutriscore_grade": "d",
        "main_category": "en:madeleines",
        "image_url": "https://static.openfoodfacts.org/images/products/20221126/front_pt.5.400.jpg"
     }]
     
    `)
     let p1 = p[0];
     Object.keys(p[0]).forEach(element => {
        console.log(`        ${element}:
            type: ${typeof p1[element]}
            description: auto generated field         
            example: ${p1[element]}`
    );
     });

/*
    AppDataSource.getRepository(Product).save(p);

*/