import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ThriftNG API",
      version: "1.0.0",
      description: "API documentation for ThriftNG backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // 👇 where swagger should look for docs
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
