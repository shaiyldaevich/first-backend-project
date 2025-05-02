import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";

export default fp(async (fastify: FastifyInstance) => {
  fastify.route({
    url: "/auth/sign-in",
    method: "POST",
    schema: {
      tags: ["auth"],
      description: "Login user with email and password",
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
        },
      },
    },
    handler: async (
      req: FastifyRequest<{ Body: { email: string; password: string } }>,
      reply: FastifyReply
    ) => {
      const { email, password } = req.body;

      const user = await prisma.auth.findUnique({ where: { email } });
      if (!user) return reply.code(400).send({ error: "Email not found" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return reply.code(401).send({ error: "Invalid password" });

      const token = fastify.jwt.sign(
        { id: user.id, email: user.email },
        { expiresIn: "1h" } // токен 1 саатка жарактуу
      );

      return reply.send({ token });
    },
  });
});
