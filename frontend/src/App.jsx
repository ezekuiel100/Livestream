import { useState } from "react";
import CreateLiveButton from "./CreateLiveButton";
import LiveStream from "./LiveStream";

function App() {
  const [id, setId] = useState(null);
  const [url, setUrl] = useState(null);

  return (
    <>
      {/* <CreateLiveButton setId={setId} setUrl={setUrl} /> */}
      <LiveStream id={id} url={url} />
    </>
  );
}

export default App;
