import { useState } from "react";
import API from "../services/api";

function Home() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("manual");

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

  const uploadPDF = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);

      const response = await API.post(
        "/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 text-white bg-zinc-950">
      
      <h1 className="mb-8 font-bold lowercase text-7xl">
        Devil's Advocate
      </h1>

      <div className="flex gap-4 mb-10">

        <button
          onClick={() => setActiveTab("manual")}
          className={`px-5 py-3 rounded-2xl font-semibold transition ${
            activeTab === "manual"
              ? "bg-white text-black"
              : "bg-zinc-700 text-white"
          }`}
        >
          Manual Input
        </button>

        <button
          onClick={() => setActiveTab("pdf")}
          className={`px-5 py-3 rounded-2xl font-semibold transition ${
            activeTab === "pdf"
              ? "bg-white text-black"
              : "bg-zinc-700 text-white"
          }`}
        >
          Upload PDF
        </button>

      </div>

      {/* MANUAL INPUT MODE */}

      {activeTab === "manual" && (
        <>
          <textarea
            className="w-full h-64 p-4 border rounded-2xl bg-zinc-900 border-zinc-700"
            placeholder="Paste brainstorming transcript..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />

          <button
            onClick={analyzeTranscript}
            className="px-6 py-3 mt-4 font-semibold text-black transition bg-white rounded-2xl hover:scale-105"
          >
            {loading ? "Analyzing Discussion..." : "Analyze Discussion"}
          </button>
        </>
      )}

      {/* PDF MODE */}

      {activeTab === "pdf" && (
        <div className="flex flex-col items-center justify-center mt-20">

          <label className="flex items-center justify-center w-64 h-64 text-2xl text-center transition rounded-full cursor-pointer bg-zinc-700 hover:scale-105">

            <div className="px-6">
              {loading
            ? "Extracting and analyzing discussion..."
            : "Click here to upload and analyze discussion"}
            </div>

            <input
  type="file"
  accept=".pdf"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      const formData = new FormData();
      formData.append("file", file);

      setLoading(true);

      API.post("/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          setResult(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }}
/>
          </label>
        </div>
      )}

      {/* RESULTS */}

      {result && (
        <div className="mt-10 space-y-6">

          <div className="p-6 border shadow-lg bg-zinc-900 rounded-2xl border-zinc-800">
            <h2 className="mb-2 text-2xl font-bold">
              Groupthink Score
            </h2>
            <p>{result.groupthink_score}</p>
          </div>

          <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">
            <h2 className="mb-2 text-2xl font-bold">
              Counterargument
            </h2>
            <p>{result.counterargument}</p>
          </div>

          <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">
            <h2 className="mb-2 text-2xl font-bold">
              Blind Spot
            </h2>
            <p>{result.blind_spot}</p>
          </div>

          <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">
            <h2 className="mb-2 text-2xl font-bold">
              Ignored Stakeholder
            </h2>
            <p>{result.ignored_stakeholder}</p>
          </div>

          <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">
            <h2 className="mb-2 text-2xl font-bold">
              Ethical Risk
            </h2>
            <p>{result.ethical_risk}</p>
          </div>

          <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">
            <h2 className="mb-2 text-2xl font-bold">
              Confidence Level
            </h2>
            <p>{result.confidence_level}</p>
          </div>

        </div>
      )}
    </div>
  );
}

export default Home;
