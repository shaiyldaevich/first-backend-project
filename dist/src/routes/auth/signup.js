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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
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
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = req.body;
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield prisma.auth.create({
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
        }),
    });
}));
