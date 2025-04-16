function LivePlayback() {
  return (
    <div className="my-10 ">
      <iframe
        className="w-96 h-[35rem] mx-auto"
        src="https://customer-fjinuof8sy200275.cloudflarestream.com/a30f5ef26e363614e4392edb9eefa132/iframe"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default LivePlayback;
