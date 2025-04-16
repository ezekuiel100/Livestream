import React, { useState, useRef } from "react";
import WHIPClient from "./WHIPClient.js";

const LiveStreamingPage = ({ url, setIsLiveStarted }) => {
  const [isStreaming, setIsStreaming] = useState(false);

  const videoRef = useRef(null);
  const whipClientRef = useRef(null);

  async function startStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const videoElement = videoRef.current;
      videoElement.srcObject = stream;

      const whipClient = new WHIPClient(url, videoElement);
      whipClientRef.current = whipClient;
      await whipClient.start(stream);

      setIsStreaming(true);
      setIsLiveStarted(true);
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
    }
  }

  async function stopStream() {
    if (whipClientRef.current) {
      await whipClientRef.current.stop();
    }
    if (whipClientRef.current) {
      whipClientRef.current.close();
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
