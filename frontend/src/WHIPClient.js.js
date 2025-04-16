export default class WHIPClient {
  constructor(endpoint, videoElement) {
    this.endpoint = endpoint;
    this.videoElement = videoElement;
    this.pc = null;
    this.track = null;
  }

  async start(stream) {
    this.pc = new RTCPeerConnection();

    // Adiciona todas as faixas da câmera ao PeerConnection
    stream.getTracks().forEach((track) => {
      this.pc.addTrack(track, stream);
    });

    this.videoElement.srcObject = stream;

    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);

    // Envia o SDP para o servidor Cloudflare (WHIP endpoint)
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/sdp",
      },
      body: offer.sdp,
    });

    const answer = await res.text();
    await this.pc.setRemoteDescription({
      type: "answer",
      sdp: answer,
    });
  }

  async stop() {
    if (this.pc) {
      this.pc.getSenders().forEach((sender) => sender.track.stop());
      this.pc.close();
      this.pc = null;
    }
  }
}
