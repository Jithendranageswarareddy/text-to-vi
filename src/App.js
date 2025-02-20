import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = "https://c79c-34-125-115-66.ngrok-free.app/generate"; // Replace with your latest Ngrok URL

  const generateImage = async () => {
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true);
    setImageUrl("");

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.image_url) {
        setImageUrl(data.image_url);
      } else {
        alert("Error generating image. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the backend!");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>AI Image Generator</h1>
      <input
        type="text"
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={generateImage} style={{ padding: "10px 20px" }}>
        Generate
      </button>

      {loading && <p>Generating image...</p>}

      {imageUrl && (
        <div>
          <h3>Generated Image:</h3>
          <img src={imageUrl} alt="Generated" style={{ width: "300px", marginTop: "10px" }} />
          <br />
          <a href={imageUrl} download="generated_image.png">
            <button style={{ marginTop: "10px", padding: "10px 20px" }}>Download Image</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
