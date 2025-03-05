import Fastify from "fastify";
import cors from "@fastify/cors";
import fetch from "node-fetch";

const CLOUDFLARE_API_KEY = process.env.CLOUDFLARE_API_KEY;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

if (!CLOUDFLARE_API_KEY) {
  console.error("❌ CLOUDFLARE_API_KEY não está definida!");
}

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

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();
    return reply.send(data);
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ error: "Erro ao criar live" });
  }
});

fastify.listen({ port: 3000 }, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
