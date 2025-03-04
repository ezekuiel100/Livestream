import React, { useState } from "react";

const CreateLiveButton = ({ setHlsUrl }) => {
  const [loading, setLoading] = useState(false);

  const createLiveStream = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/create-live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Minha Live" }),
      });

      const data = await response.json();
      console.log("Nova live criada:", data);

      // Atualiza o HLS URL para exibir a live no player
      if (data.result?.hls) {
        setHlsUrl(data.result.hls);
      } else {
        alert("Erro ao criar a live");
      }
    } catch (error) {
      console.error("Erro ao criar live:", error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={createLiveStream}
      disabled={loading}
      className="p-2 bg-gray-300 m-2"
    >
      {loading ? "Criando Live..." : "Criar Live"}
    </button>
  );
};

export default CreateLiveButton;
