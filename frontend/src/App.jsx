import { useState } from "react";
import LiveStreamingPage from "./LiveStreamingPage";

function App() {
  const [id, setId] = useState(null);
  const [url, setUrl] = useState(null);

  return (
    <>
      {/* <CreateLiveButton setId={setId} setUrl={setUrl} /> */}
      <LiveStreamingPage />
    </>
  );
}

export default App;
