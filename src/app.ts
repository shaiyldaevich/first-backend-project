import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import AutoLoad from "@fastify/autoload";
import path from "path";
const app = Fastify({ logger: true });

app.register(AutoLoad, {
  dir: path.join(__dirname, "plugins"),
});
app.get("/",(req:FastifyRequest,reply:FastifyReply)=>{
    reply.status(200).send({message:"fastify is working"})
})
app.register(AutoLoad, {
  dir: path.join(__dirname, "routes"),
  options: { prefix: "api/v1" },
});

export default app