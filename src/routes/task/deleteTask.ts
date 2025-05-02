import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { prisma } from "../../lib/prisma";

export default fp(async (fastify: FastifyInstance) => {
  fastify.route({
    url: "/task/:id",
    method: "DELETE",
    schema: {
      tags: ["task"],
      description: "create",
      params: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
        },
        required: ["id"],
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
      req: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      const { id } = req.params;
      try {
        if (!id) {
          reply.badRequest("id notfound");
        }
        const res = await prisma.task.delete({
          where: {
            id: parseInt(id),
          },
        });
        reply.status(200).send(res);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "internal server error" });
      }
    },
  });
});
