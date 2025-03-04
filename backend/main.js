import Fastify from "fastify";
import cors from "@fastify/cors";

const CLOUDFLARE_API_KEY = process.env.CLOUDFLARE_API_KEY;

const fastify = Fastify();

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST"],
});

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.post("/create-live", async (request, reply) => {
  try {
    const { name } = request.body;

    const response = await fetch(`https://api.cloudflare.com/client/v4/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    return reply.send(response.data);
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ error: "Erro ao criar live" });
  }
});

fastify.listen({ port: 3000 }, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
