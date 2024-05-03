import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Product } from "./entity/Product"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test123",
    database: "Open_Food_Facts",
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/**/entity/*.*`],
    migrations: [],
    subscribers: [],
})
