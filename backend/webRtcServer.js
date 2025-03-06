import { WebSocketServer } from "ws";
import { spawn } from "child_process";

const STREAM_KEY = process.env.STREAM_KEY;

const wss = new WebSocketServer({ port: 8080 });

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
    `rtmp://live.cloudflare.com/live/${STREAM_KEY}`,
  ]);

  ws.on("message", (message) => ffmpeg.stdin.write(message));

  ws.on("message", (data) => {
    console.log(`Recebendo pacote de vídeo: ${data.length} bytes`);
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

console.log("Servidor WebSocket rodando na porta 8080...");
