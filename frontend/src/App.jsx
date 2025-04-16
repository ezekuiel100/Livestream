import { useState } from "react";
import LiveStreamingPage from "./LiveStreamingPage";
import CreateLiveButton from "./CreateLiveButton";
import LivePlayback from "./LivePlayback";

const liveUrl = import.meta.env.VITE_LIVE_URL;
const playbackUrl = import.meta.env.VITE_PLAYBACK_URL;

function App() {
  // const [id, setId] = useState(null);
  // const [url, setUrl] = useState(null);
  const [isLiveStarted, setIsLiveStarted] = useState(false);

  return (
    <>
      {/* <CreateLiveButton setId={setId} setUrl={setUrl} /> */}
      <LiveStreamingPage url={liveUrl} setIsLiveStarted={setIsLiveStarted} />

      {isLiveStarted && <LivePlayback playbackUrl={playbackUrl} />}
    </>
  );
}

export default App;
