import path from "path";

export const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Météo",
            version: "1.0.0",
            description: "Documentation de l'API Météo",
        },
        servers: [
            {
                url: "http://localhost:3000",
                descriptions: "Serveur local"
            }
        ]
    },  
    apis: [path.resolve(__dirname, "./controllers/*.ts")]
};