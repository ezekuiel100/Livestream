export default class WHEPClient {
  constructor(endpoint, videoElement) {
    this.endpoint = endpoint;
    this.videoElement = videoElement;
    this.pc = null;
  }

  async start() {
    this.pc = new RTCPeerConnection();

    this.pc.addEventListener("track", (event) => {
      console.log("🎥 Track recebida:", event.streams[0]);
      this.videoElement.srcObject = event.streams[0];
    });

    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);

    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/sdp",
      },
      body: offer.sdp,
    });

    const answer = await res.text();
    console.log("📨 Resposta WHEP:", answer);

    if (!res.ok || !answer.startsWith("v=")) {
      throw new Error(
        `❌ Erro ao conectar ao WebRTC playback: ${res.status}\nConteúdo recebido:\n${answer}`
      );
    }

    await this.pc.setRemoteDescription({
      type: "answer",
      sdp: answer,
    });
  }

  async stop() {
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
  }
}
