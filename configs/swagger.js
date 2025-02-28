import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: " Interfer Associates API Web Manager - Backend",
            version: "1.0.0",
            description: "API robusta con solo backend utilizando Node.js, Express y MongoDB desarrolla una solución eficiente y moderna para gestionar la incorporación de nuevos socios y empresas a su famosa feria “Interfer”, la cual les permitirá a las empresas registrar sus datos e información crucial , además, de la generación de reportes en formato Excel con toda la información de las empresas registradas.",
            contact:{
                name: "Anthony Josue Escobar Ponce",
                email: "anthonyescobarponce@Outlook.com"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/InterferAssociatesManager/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}