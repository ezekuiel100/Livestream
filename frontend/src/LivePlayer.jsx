import React, { useEffect, useRef } from "react";
import videojs from "video.js";

const LivePlayer = ({ hlsUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        responsive: true,
        fluid: true,
      });

      player.src({
        src: hlsUrl,
        type: "application/x-mpegURL",
      });

      return () => player.dispose();
    }
  }, [hlsUrl]);

  return (
    <div>
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default LivePlayer;
