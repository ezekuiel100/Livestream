import React, { useState, useRef } from "react";

const LiveStreamingPage = () => {
  const [isStreaming, setIsStreaming] = useState(false);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const socketRef = useRef(null);

  async function startStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const videoElement = videoRef.current;
      videoElement.srcObject = stream;

      socketRef.current = new WebSocket(
        "wss://livestream-production-498a.up.railway.app"
      );
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0 && socketRef.current.readyState === 1) {
          socketRef.current.send(event.data);
        }
      };

      mediaRecorderRef.current.start(1000); // Enviar dados a cada 1s
      setIsStreaming(true);
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
    }
  }

  function stopStream() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (socketRef.current) {
      socketRef.current.close();
    }
    setIsStreaming(false);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">LiveStream App</h1>
          {isStreaming && (
            <div className="bg-red-500 px-3 py-1 rounded-full flex items-center">
              <span className="animate-pulse mr-1">●</span> AO VIVO
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow justify-center container mx-auto p-4 flex flex-col md:flex-row gap-4">
        <div className="w-full  md:w-1/3 flex flex-col ">
          <div className="relative h-[70vh] bg-black rounded-lg overflow-hidden aspect-video mb-4">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover p-4 "
            />
          </div>

          <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg">
            <button
              onClick={isStreaming ? stopStream : startStream}
              className={`px-4 py-2 rounded font-bold bg-green-500 hover:bg-green-600 text-white cursor-pointer`}
            >
              {isStreaming ? "Encerrar Transmissão" : "Iniciar Transmissão"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveStreamingPage;
