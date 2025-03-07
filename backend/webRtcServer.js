import Fastify from "fastify";
import { WebSocketServer } from "ws";
import { spawn } from "child_process";

const STREAM_KEY = process.env.STREAM_KEY;

console.log("Stream key: ", STREAM_KEY);

// Criar servidor HTTPS com Fastify
const fastify = Fastify();

// Criar um servidor HTTP sobre HTTPS
fastify.get("/", async (request, reply) => {
  return { message: "Servidor WebSocket rodando com HTTPS! 🚀" };
});

// Iniciar Fastify primeiro
fastify.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Servidor HTTPS rodando em ${address}`);

  // 🔹 Criar WebSocket Server sobre o mesmo servidor HTTPS
  const wss = new WebSocketServer({ server: fastify.server });

  wss.on("connection", (ws) => {
    console.log("Cliente conectado!");

    const ffmpeg = spawn("ffmpeg", [
      "-f",
      "webm",
      "-i",
      "-",
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-b:v",
      "3000k",
      "-maxrate",
      "3000k",
      "-bufsize",
      "6000k",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-f",
      "flv",
      `rtmps://live.cloudflare.com:443/live/${STREAM_KEY}`,
    ]);

    ws.on("message", (message) => {
      console.log(`Recebendo pacote de vídeo: ${message.length} bytes`);
      ffmpeg.stdin.write(message);
    });

    ws.on("pong", () => console.log("Conexão WebSocket ativa"));
    setInterval(() => ws.ping(), 5000);

    ffmpeg.stderr.on("data", (data) => {
      console.error(`FFmpeg erro: ${data.toString()}`);
    });

    ffmpeg.on("close", (code) => {
      console.log(`FFmpeg encerrado com código ${code}`);
    });
  });

  console.log("✅ Servidor WebSocket seguro rodando na porta 8080!");
});
