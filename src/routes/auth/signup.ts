import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SignUpBody {
  email: string;
  password: string;
}

export default fp(async (fastify: FastifyInstance) => {
  fastify.route({
    url: "/auth/sign-up",
    method: "POST",
    schema: {
      tags: ["auth"],
      description: "User registration",
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "number" },
                email: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: async (
      req: FastifyRequest<{ Body: SignUpBody }>,
      reply: FastifyReply
    ) => {
      const { email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.auth.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return reply.send({
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    },
  });
});
