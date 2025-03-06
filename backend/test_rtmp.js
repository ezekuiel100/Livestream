import { exec } from "child_process";

exec(
  `curl -v "rtmps://live.cloudflare.com:443/live/${process.env.STREAM_KEY}"`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao conectar à Cloudflare: ${error.message}`);
      return;
    }
    console.log(`Saída do CURL: ${stdout}`);
    console.error(`Erro do CURL: ${stderr}`);
  }
);
