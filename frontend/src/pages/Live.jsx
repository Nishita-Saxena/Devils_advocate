import { useState, useRef } from "react";

function Live() {

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [finalReport, setFinalReport] = useState(null);

  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");
  const analysisRunningRef = useRef(false);

  const startListening = () => {

    setTranscript("");
    setAnalysis(null);
    setFinalReport(null);

    transcriptRef.current = "";

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition not supported");

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;

    recognition.onresult = async (event) => {

      let finalTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        const result = event.results[i];

        if (result.isFinal) {

          finalTranscript +=
            result[0].transcript + " ";
        }
      }

      if (finalTranscript.trim() !== "") {

        transcriptRef.current += finalTranscript;

        setTranscript(
          transcriptRef.current
        );

        // LIVE ANALYSIS

        if (!analysisRunningRef.current) {

          analysisRunningRef.current = true;

          try {

            const response = await fetch(
              "http://127.0.0.1:8000/live-analysis",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  transcript:
                    transcriptRef.current,
                }),
              }
            );

            const data =
              await response.json();

            setAnalysis(data);

          } catch (err) {

            console.error(err);

          } finally {

            analysisRunningRef.current = false;
          }
        }
      }
    };

    recognition.start();

    setIsListening(true);
  };

 const stopListening = async () => {

  setIsListening(false);

  if (recognitionRef.current) {

    recognitionRef.current.stop();
  }

  // WAIT for final speech chunks

  setTimeout(async () => {

    try {

      console.log(
        "FINAL TRANSCRIPT:",
        transcriptRef.current
      );

      const response = await fetch(
        "http://127.0.0.1:8000/final-analysis",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            transcript:
              transcriptRef.current,
          }),
        }
      );

      const data = await response.json();

      console.log("FINAL REPORT:", data);

      setFinalReport(data);

    } catch (err) {

      console.error(err);
    }

  }, 2000);
};

  return (
    <div className="min-h-screen p-8 text-white bg-zinc-950">

      <h1 className="mb-8 text-6xl font-bold">
        Live Meeting Analysis
      </h1>
      
      {/*live analysis*/}
      {isListening && (

        <div className="flex items-center gap-3 mb-8">

          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

          <p className="text-lg text-zinc-400">
            Live AI listening...
          </p>

        </div>
      )}

      {/* BUTTON */}

      <button
        onClick={
          isListening
            ? stopListening
            : startListening
        }
        className="px-6 py-3 font-semibold text-black transition bg-white rounded-2xl hover:scale-105"
      >
        {isListening
          ? "Stop Listening"
          : "Start Listening"}
      </button>

      {/* TRANSCRIPT */}

      <div className="p-6 mt-10 border bg-zinc-900 rounded-2xl border-zinc-800">

        <h2 className="mb-4 text-2xl font-bold">
          Live Transcript
        </h2>

        <p className="leading-8 whitespace-pre-wrap text-zinc-300">
          {transcript ||
            "Waiting for discussion..."}
        </p>

      </div>

      {/* LIVE ANALYSIS */}

      {analysis && (

        <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-2">

          <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">

            <h2 className="mb-2 text-xl font-bold">
              Groupthink Risk
            </h2>

            <p>
              {analysis.groupthink_score}
            </p>

          </div>

          <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">

            <h2 className="mb-2 text-xl font-bold">
              Ignored Stakeholder
            </h2>

            <p>
              {analysis.ignored_stakeholder}
            </p>

          </div>

          <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">

            <h2 className="mb-2 text-xl font-bold">
              Ethical Risk
            </h2>

            <p>
              {analysis.ethical_risk}
            </p>

          </div>

          <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">

            <h2 className="mb-2 text-xl font-bold">
              Missing Perspective
            </h2>

            <p>
              {analysis.missing_perspective}
            </p>

          </div>

        </div>
      )}

      {/* FINAL REPORT */}

      {finalReport && (

        <div className="mt-16">

          <h2 className="mb-8 text-5xl font-bold">
            Final Meeting Report
          </h2>

          <div className="space-y-6">

            <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">

              <h3 className="mb-2 text-2xl font-bold">
                Groupthink Score
              </h3>

              <p>
                {finalReport.groupthink_score}
              </p>

            </div>

            <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">

              <h3 className="mb-2 text-2xl font-bold">
                Counterargument
              </h3>

              <p>
                {finalReport.counterargument}
              </p>

            </div>

            <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">

              <h3 className="mb-2 text-2xl font-bold">
                Blind Spot
              </h3>

              <p>
                {finalReport.blind_spot}
              </p>

            </div>

            <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">

              <h3 className="mb-2 text-2xl font-bold">
                Ignored Stakeholder
              </h3>

              <p>
                {finalReport.ignored_stakeholder}
              </p>

            </div>

            <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">

              <h3 className="mb-2 text-2xl font-bold">
                Ethical Risk
              </h3>

              <p>
                {finalReport.ethical_risk}
              </p>

            </div>

            <div className="p-6 border bg-zinc-900 rounded-2xl border-zinc-800">

              <h3 className="mb-2 text-2xl font-bold">
                Recommendation
              </h3>

              <p>
                {finalReport.recommendation}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Live;

