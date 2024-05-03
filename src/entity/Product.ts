import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, ValueTransformer } from "typeorm"
import { CustomBaseEntity } from "./common/BaseEntity";

/**
 * @description converte o tempo de segundos para timestamp sem time zone para melhorar
 * a visualização do banco. Observe que nesse caso o TypeORM e o proprio PostgreSQL irão
 * ajustar ao time zone padrão SGBD.
 */
export const timestampConverter = {
    to(value: number) {
        const d = new Date(1970, 1, 1);
        d.setSeconds(value)
        return new Date(value * 1000.0);
    },
    from(value: Date) {        
        return Math.floor(value.getTime()/1000.0)
    }

}

@Entity()
export class Product extends CustomBaseEntity{
    @PrimaryColumn()
    code: number;
    @Column()
    status: string;
    @Column({ type: 'timestamp' })
    imported_t: Date;
    @Column()
    url: string;
    @Column()
    creator: string;
    @Column({ type: 'timestamp', transformer: timestampConverter })
    created_t: number;
    @Column({ type: 'timestamp', transformer: timestampConverter })
    last_modified_t: number;
    @Column()
    product_name: string;
    @Column()
    quantity: string;
    @Column()
    brands: string;
    @Column()
    categories: string;
    @Column()
    labels: string;
    @Column()
    cities: string;
    @Column()
    purchase_places: string;
    @Column()
    stores: string;
    @Column()
    ingredients_text: string;
    @Column()
    traces: string;
    @Column()
    serving_size: string;
    @Column({type: 'decimal'})
    serving_quantity: number;
    @Column()
    nutriscore_score: number;
    @Column()
    nutriscore_grade: string;
    @Column()
    main_category: string;
    @Column()
    image_url: string;

    constructor() {
        super();
    }
}

