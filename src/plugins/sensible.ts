import { FastifyInstance } from "fastify"
import fp from "fastify-plugin"
import sensible from "@fastify/sensible"

export default fp(async(fastify:FastifyInstance)=>{
fastify.register(sensible)

})