"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../lib/prisma");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
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
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield prisma_1.prisma.auth.findUnique({ where: { email } });
            if (!user)
                return reply.code(400).send({ error: "Email not found" });
            const valid = yield bcrypt_1.default.compare(password, user.password);
            if (!valid)
                return reply.code(401).send({ error: "Invalid password" });
            const token = fastify.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "1h" } // токен 1 саатка жарактуу
            );
            return reply.send({ token });
        }),
    });
}));
