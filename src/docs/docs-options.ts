/**
 * @see https://blog.logrocket.com/documenting-express-js-api-swagger/
 */

export const options = {
    definition: {
        openapi: "3.1.0",
        info: {
          title: "Desafio bakend node codesh",
          version: "0.1.0",
          description:
            "Simples API CRUD parte do desafio que efetua atualizações diárias de produtos retirados da API  https://br.openfoodfacts.org/data",
          contact: {
            name: "Manoel Batista",
            email: "manoelbatista902@gmail.com",
          },
        },
        servers: [
          {
            url: "http://localhost:8080/v1",
          },
        ],
      },
      apis: [`${__dirname}/controller/ProductController.ts`],
}


export default options;