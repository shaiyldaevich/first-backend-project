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
const prisma_1 = require("../../lib/prisma");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
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
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id) {
                    reply.badRequest("id notfound");
                }
                const res = yield prisma_1.prisma.task.delete({
                    where: {
                        id: parseInt(id),
                    },
                });
                reply.status(200).send(res);
            }
            catch (error) {
                console.error(error);
                reply.status(500).send({ error: "internal server error" });
            }
        }),
    });
}));
