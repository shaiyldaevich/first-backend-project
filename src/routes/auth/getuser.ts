import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { prisma } from "../../lib/prisma";

export default fp(async (fastify: FastifyInstance) => {
  fastify.route({
    url: "/auth/getuser",
    method: "GET",
    schema: {
      tags: ["auth"],
      description: "auth",
      //   params: {
      //     type: "object",
      //     properties: {
      //       id: {
      //         type: "number",
      //       },
      //     },
      //     required: ["id"],
      //   },
      //   body: {
      //     type: "object",
      //     properties: {
      //       email: {
      //         type: "string",
      //       },
      //     },
      //     required: ["id"],
      //   },

      //   response: {
      //     201: {
      //       type: "object",
      //       properties: {
      //         id: {
      //           type: "number",
      //         },
      //         email: {
      //           type: "string",
      //         },
      //       },
      //     },
      //   },
    },
    preHandler: [fastify.authJWT],
    handler: async (req: FastifyRequest, reply: FastifyReply) => {
      //   const { id } = req.params;
      try {
        // if (!id) {
        //   reply.badRequest("id notfound");
        // }
        // const res = await prisma.auth.findFirst({
        //   where: {
        //     id: parseInt(id),
        //   },
        // });
        const res = await prisma.auth.findFirst();
        reply.status(200).send(res);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "internal server error" });
      }
    },
  });
});
