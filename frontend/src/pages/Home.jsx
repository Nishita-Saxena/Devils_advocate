import { useState } from "react";
import API from "../services/api";

function Home() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeTranscript = async () => {
    if (!transcript.trim()) return;

    try {
      setLoading(true);

      const response = await API.post("/analyze", {
        transcript,
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        Devil's Advocate
      </h1>

      <textarea
        className="w-full h-64 p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        placeholder="Paste brainstorming transcript..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <button
        onClick={analyzeTranscript}
        className="mt-4 px-6 py-3 bg-white text-black rounded-xl font-semibold"
      >
        {loading ? "Analyzing..." : "Analyze Discussion"}
      </button>

      {result && (
        <div className="mt-10 space-y-6">
          <div className="bg-zinc-900 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-2">
              Groupthink Score
            </h2>
            <p>{result.groupthink_score}</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-2">
              Counterargument
            </h2>
            <p>{result.counterargument}</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-2">
              Blind Spot
            </h2>
            <p>{result.blind_spot}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;