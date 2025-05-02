import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";


export default fp(async (fastify: FastifyInstance) => {
  const schemas = [
 
  ];

  // schemas.forEach((schema) => {
  //   if (!fastify.getSchema(schema.$id)) {
  //     fastify.addSchema(schema);
  //   }
  // });

  const swaggerOptions = {
    swagger: {
      info: {
        title: "Fastify auth API",
        description: "API документация вашего сервера",
        version: "1.0.0",
      },
      host: "http://localhost:8000",
      basePath: "/",
    },
  };

  fastify.register(swagger, swaggerOptions);

  fastify.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: { docExpansion: "none", deepLinking: false },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });
});
