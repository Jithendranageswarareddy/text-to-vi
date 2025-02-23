import React, { useState } from "react";
import axios from "axios";

function App() {
    const [text, setText] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const generateVideo = async () => {
        const API_KEY = "key_63c78976f1a38b896d471f75374f7dd065cb950c7ec48a577e48721a92254a7a51944701013f863b23b710d50259bb8975467f64a772b4e871504433122731f3";
        const response = await axios.post(
            "https://api.runwayml.com/v1/gen2",
            {
                prompt: text, // Send user input to Runway ML
                motion: "cinematic",
                duration: 5, // Video length in seconds
            },
            { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        setVideoUrl(response.data.video_url);
    };

    return (
        <div className="p-5">
            <h1 className="text-xl font-bold">Text-to-Video Generator</h1>
            <textarea
                className="border p-2 w-full"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your script..."
            />
            <button className="bg-blue-500 text-white p-2 mt-2" onClick={generateVideo}>
                Generate Video
            </button>
            {videoUrl && (
                <video src={videoUrl} controls className="mt-4 w-full"></video>
            )}
        </div>
    );
}

export default App;
