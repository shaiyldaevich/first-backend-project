import app from "./src/app";
import dotenv from "dotenv"
dotenv.config()
const server = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT), host: "0.0.0.0" });
    console.log("server is running on port", process.env.APP_URL);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

server()