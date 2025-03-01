import React, { useState } from "react";
import axios from "axios";

function App() {
    const [text, setText] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (!text) {
            alert("Please enter a description!");
            return;
        }

        setLoading(true);
        const apiKey = "5b4e9762-16da-43e6-b2b2-3df3d3f7c5b8"; // Replace with your actual API Key
        const url = "https://api.deepai.org/api/text2img";

        try {
            const response = await axios.post(url, { text: text }, {
                headers: { "api-key": apiKey }
            });

            setImageUrl(response.data.output_url);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to generate image. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", fontFamily: "Arial", padding: "20px" }}>
            <h1>🚀 AI Text-to-Image Generator</h1>
            <input 
                type="text" 
                placeholder="Enter a description..." 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
            />
            <br />
            <button onClick={generateImage} style={{ padding: "10px 20px" }}>
                {loading ? "Generating..." : "Generate Image"}
            </button>
            <br />
            {imageUrl && (
                <div>
                    <img src={imageUrl} alt="Generated" style={{ marginTop: "20px", width: "400px" }} />
                    <br />
                    <a href={imageUrl} download="generated-image.jpg">
                        <button style={{ marginTop: "10px", padding: "10px" }}>Download Image</button>
                    </a>
                </div>
            )}
        </div>
    );
}

export default App;
