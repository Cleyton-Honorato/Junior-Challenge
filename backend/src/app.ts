import Fastify from "fastify";
import cors from "@fastify/cors";
import { ringRoutes } from "./routes/ring.routes";

const app = Fastify();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
});
app.register(ringRoutes);

export default app;
