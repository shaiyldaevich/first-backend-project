import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { prisma } from "../../lib/prisma";

export default fp(async (fastify: FastifyInstance) => {
  fastify.route({
    url: "/task/:id",
    method: "PUT",
    schema: {
      tags: ["task"],
      description: "create",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
        },
        required: ["id"],
      },
      body: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
        },
        required: ["title"],
      },

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
      req: FastifyRequest<{ Body: { title: string }; Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      const { title } = req.body;
      const { id } = req.params;
      try {
        const res = await prisma.task.update({
          where: { id: parseInt(id) },
          data: { title },
        });
        reply.status(201).send(res);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "internal server error" });
      }
    },
  });
});
