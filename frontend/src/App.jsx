import CreateLiveButton from "./CreateLiveButton";
import LivePlayer from "./LivePlayer";

function App() {
  return (
    <>
      <h1 className="text-2xl">Live Streaming com Cloudflare</h1>
      <LivePlayer />
      <CreateLiveButton />
    </>
  );
}

export default App;
