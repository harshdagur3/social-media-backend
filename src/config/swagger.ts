import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Social Media API",
            version: "1.0.0",
            description: "API documentation for our social media backend",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },

    },
    apis: ["./src/routes/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📘 Swagger docs available at http://localhost:5000/api-docs");
};