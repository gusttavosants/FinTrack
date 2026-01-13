import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { env } from "./lib/env";
import { authRoutes } from "./routes/auth.routes";

const app = fastify();

// Registrar JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

// Registrar rotas
app.register(authRoutes);

// Rota de teste (opcional)
app.get("/", async () => {
  return { hello: "world" };
});

// Iniciar servidor
const start = async () => {
  try {
    await app.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();


