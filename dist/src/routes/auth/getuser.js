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
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
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
                const res = yield prisma_1.prisma.auth.findFirst();
                reply.status(200).send(res);
            }
            catch (error) {
                console.error(error);
                reply.status(500).send({ error: "internal server error" });
            }
        }),
    });
}));
