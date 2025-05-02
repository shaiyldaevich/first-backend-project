import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { prisma } from "../../lib/prisma";

export default fp(async (fastify: FastifyInstance) => {
  fastify.route({
    url: "/task",
    method: "GET",
    schema: {
        tags: ["task"],
        description: "create",
        // params: {
        //   type: "object",
        //   properties: {
        //     id: {
        //       type: "number",
        //     },
            
        //   },
        //   required: ["id"],
        // },
  
        response: {
          201: {
            type: "object",
            properties: {
              id: {
                type: "number",
              },
              title: {
                type: "string",
              },
            },
          },
        },
      },
    handler: async (
      req: FastifyRequest,
      reply: FastifyReply
    ) => {
      
      try {
        const res = await prisma.task.findMany()
        reply.status(200).send(res);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "internal server error" });
      }
    },
  });
});
