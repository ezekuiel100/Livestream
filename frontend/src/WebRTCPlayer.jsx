import React, { useEffect, useRef } from "react";

const WebRTCPlayer = ({ remoteSDP }) => {
  const videoRef = useRef(null);
  const peerConnection = new RTCPeerConnection();

  useEffect(() => {
    // Adiciona um transceptor para receber vídeo
    peerConnection.addTransceiver("video", { direction: "recvonly" });

    // Quando receber uma track, exibe no vídeo
    peerConnection.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };

    // Criar oferta SDP
    peerConnection
      .createOffer()
      .then((offer) => peerConnection.setLocalDescription(offer))
      .then(() => {
        console.log(
          "Oferta enviada para o servidor:",
          peerConnection.localDescription
        );
      });

    // Definir o SDP remoto quando disponível
    if (remoteSDP) {
      peerConnection.setRemoteDescription(new RTCSessionDescription(remoteSDP));
    }

    return () => peerConnection.close();
  }, [remoteSDP]);

  return (
    <div>
      <h2>WebRTC Player</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default WebRTCPlayer;
