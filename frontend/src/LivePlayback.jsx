import React, { useEffect, useRef } from "react";
import WHEPClient from "./WHEPClient.js";

const LivePlayback = ({ playbackUrl }) => {
  const videoRef = useRef(null);
  const clientRef = useRef(null);

  useEffect(() => {
    const startPlayback = async () => {
      if (playbackUrl && videoRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        clientRef.current = new WHEPClient(playbackUrl, videoRef.current);
        await clientRef.current.start();
      }
    };

    startPlayback();

    return () => {
      if (clientRef.current) {
        clientRef.current.stop();
      }
    };
  }, [playbackUrl]);

  return (
    <div className="w-full h-full bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LivePlayback;
