import {
  Brain,
  Shield,
  Mic,
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Waves,
  Radar,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";

function Workspace() {
  // ====================================
  // STATES
  // ====================================

  const [agenda, setAgenda] = useState("");
  const [agendaItems, setAgendaItems] = useState([]);

  const [policyText, setPolicyText] = useState("");

  const [isListening, setIsListening] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const [analysis, setAnalysis] =
    useState(null);

  const [finalReport, setFinalReport] =
    useState(null);

  const recognitionRef = useRef(null);

  const transcriptRef = useRef("");

  const analysisRunningRef = useRef(false);

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = [...Array(40)].map(
      (_, i) => ({
        id: i,
        size: Math.random() * 4 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
      })
    );

    setParticles(generated);
  }, []);

  // ====================================
  // GENERATE AGENDA
  // ====================================

  const generateAgenda = () => {
    const items = agenda
      .split("\n")
      .filter((item) => item.trim() !== "")
      .map((item) => ({
        text: item,
        completed: false,
      }));

    setAgendaItems(items);
  };

  // ====================================
  // START LISTENING
  // ====================================

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

        setTranscript(transcriptRef.current);

        // ====================================
        // AGENDA TRACKING
        // ====================================

        const updatedAgenda = agendaItems.map(
          (item) => {
            if (item.completed) return item;

            const agendaWords = item.text
              .toLowerCase()
              .split(" ");

            const transcriptLower =
              transcriptRef.current.toLowerCase();

            const matchedWords =
              agendaWords.filter((word) =>
                transcriptLower.includes(word)
              );

            const similarity =
              matchedWords.length /
              agendaWords.length;

            return {
              ...item,
              completed: similarity > 0.5,
            };
          }
        );

        setAgendaItems(updatedAgenda);

        // ====================================
        // LIVE ANALYSIS
        // ====================================

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
                  policy_context:
                    policyText,
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

  // ====================================
  // STOP LISTENING
  // ====================================

  const stopListening = async () => {
    setIsListening(false);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setTimeout(async () => {
      try {
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
              policy_context:
                policyText,
            }),
          }
        );

        const data =
          await response.json();

        setFinalReport(data);
      } catch (err) {
        console.error(err);
      }
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-zinc-950">
      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-60 -top-60 h-[40rem] w-[40rem] rounded-full bg-fuchsia-500/10 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-[35rem] w-[35rem] rounded-full bg-cyan-500/10 blur-3xl"></div>

        {/* grid */}

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 85%)",
          }}
        />

        {/* rings */}

        <div className="absolute left-1/2 top-20 h-[50rem] w-[50rem] -translate-x-1/2 animate-spin rounded-full border border-zinc-800/40 [animation-duration:60s]"></div>

        <div className="absolute left-1/2 top-40 h-[35rem] w-[35rem] -translate-x-1/2 animate-spin rounded-full border border-zinc-800/40 [animation-duration:40s]"></div>

        {/* particles */}

        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* CONTENT */}

      <div className="relative z-10 px-6 pt-24 pb-20 md:px-10">
        {/* HEADER */}

        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-zinc-500">
                Intelligence Workspace
              </p>

              <h1 className="text-5xl font-black md:text-7xl">
                Decision Environment
              </h1>

              <p className="max-w-3xl mt-6 text-xl leading-9 text-zinc-400">
                Context-aware organizational
                intelligence with live agenda
                tracking, governance reasoning,
                and AI-assisted analysis.
              </p>
            </div>

            {/* status */}

            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div
                  className={`h-4 w-4 rounded-full ${
                    isListening
                      ? "bg-red-500 animate-pulse"
                      : "bg-green-500"
                  }`}
                ></div>

                <div>
                  <p className="font-semibold">
                    {isListening
                      ? "AI Listening Active"
                      : "Workspace Ready"}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Real-time cognitive monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FLOW SECTION */}

          <div className="grid grid-cols-1 gap-8 mt-20 xl:grid-cols-3">
            {/* STEP 1 */}

            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-fuchsia-500/10">
                  <Shield className="h-7 w-7 text-fuchsia-400" />
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Step 01
                  </p>

                  <h2 className="text-2xl font-bold">
                    Policy Context
                  </h2>
                </div>
              </div>

              <p className="mt-6 leading-8 text-zinc-400">
                Upload organizational policies
                so AI can evaluate discussions
                against governance frameworks.
              </p>

              <input
                type="file"
                accept=".txt"
                className="block w-full p-4 mt-8 border rounded-2xl border-zinc-700 bg-zinc-950 text-zinc-400"
                onChange={(e) => {
                  const file =
                    e.target.files[0];

                  if (!file) return;

                  const reader =
                    new FileReader();

                  reader.onload = (event) => {
                    setPolicyText(
                      event.target.result
                    );
                  };

                  reader.readAsText(file);
                }}
              />

              {policyText && (
                <div className="p-5 mt-6 border rounded-2xl border-green-500/20 bg-green-500/10">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />

                    <p className="font-semibold text-green-300">
                      Policy Context Loaded
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2 */}

            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-cyan-500/10">
                  <FileText className="h-7 w-7 text-cyan-400" />
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Step 02
                  </p>

                  <h2 className="text-2xl font-bold">
                    Meeting Agenda
                  </h2>
                </div>
              </div>

              <p className="mt-6 leading-8 text-zinc-400">
                Define discussion goals so AI
                can track progress dynamically
                during meetings.
              </p>

              <textarea
                value={agenda}
                onChange={(e) =>
                  setAgenda(e.target.value)
                }
                placeholder={`Budget approval
Hiring discussion
Security review`}
                className="w-full h-48 p-4 mt-8 border rounded-2xl border-zinc-700 bg-zinc-950"
              />

              <button
                onClick={generateAgenda}
                className="px-6 py-4 mt-6 font-semibold text-black transition bg-white rounded-2xl hover:scale-105"
              >
                Generate Agenda Tracker
              </button>
            </div>

            {/* STEP 3 */}

            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-orange-500/10">
                  <Mic className="text-orange-400 h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Step 03
                  </p>

                  <h2 className="text-2xl font-bold">
                    Live Intelligence
                  </h2>
                </div>
              </div>

              <p className="mt-6 leading-8 text-zinc-400">
                Start live meeting analysis
                and continuously monitor
                organizational reasoning.
              </p>

              <button
                onClick={
                  isListening
                    ? stopListening
                    : startListening
                }
                className={`mt-10 flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-5 font-semibold transition ${
                  isListening
                    ? "bg-red-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                <Mic className="w-5 h-5" />

                {isListening
                  ? "Stop Listening"
                  : "Start Listening"}
              </button>

              <div className="mt-8 space-y-4">
                {[
                  "Transcript Engine",
                  "Agenda Tracking",
                  "Policy Analysis",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between"
                  >
                    <span className="text-zinc-400">
                      {item}
                    </span>

                    <div
                      className={`h-2 w-2 rounded-full ${
                        isListening
                          ? "bg-green-500"
                          : "bg-zinc-700"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ANALYSIS SECTION */}

          <div className="mt-20 grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            {/* TRANSCRIPT */}

            <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Live Discussion
                  </p>

                  <h2 className="mt-3 text-4xl font-bold">
                    Transcript Stream
                  </h2>
                </div>

                <Waves className="w-10 h-10 text-fuchsia-400" />
              </div>

              <div className="mt-10 min-h-[420px] rounded-[2rem] border border-zinc-800 bg-black/30 p-8">
                <p className="leading-9 whitespace-pre-wrap text-zinc-300">
                  {transcript ||
                    "Waiting for discussion..."}
                </p>
              </div>
            </div>

            {/* SIDE INTELLIGENCE */}

            <div className="space-y-8">
              {/* agenda tracking */}

              <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                      Meeting Progress
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                      Agenda Tracking
                    </h2>
                  </div>

                  <Radar className="h-9 w-9 text-cyan-400" />
                </div>

                <div className="mt-8 space-y-4">
                  {agendaItems.length > 0 ? (
                    agendaItems.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-5 border rounded-2xl border-zinc-800 bg-black/20"
                        >
                          <p className="text-zinc-300">
                            {item.text}
                          </p>

                          <div
                            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                              item.completed
                                ? "bg-green-500 text-black"
                                : "bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            {item.completed
                              ? "Completed"
                              : "Pending"}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="p-5 border rounded-2xl border-zinc-800 bg-black/20 text-zinc-500">
                      Generate agenda tracking to
                      monitor discussion progress.
                    </div>
                  )}
                </div>
              </div>

              {/* live analysis */}

              <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                      AI Signals
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                      Live Analysis
                    </h2>
                  </div>

                  <Sparkles className="text-orange-400 h-9 w-9" />
                </div>

                {analysis ? (
                  <div className="mt-8 space-y-5">
                    {[
                      {
                        title: "Groupthink Risk",
                        value:
                          analysis.groupthink_score,
                        icon: AlertTriangle,
                        color: "text-orange-400",
                      },
                      {
                        title: "Ethical Risk",
                        value:
                          analysis.ethical_risk,
                        icon: Shield,
                        color: "text-red-400",
                      },
                      {
                        title:
                          "Missing Perspective",
                        value:
                          analysis.missing_perspective,
                        icon: Brain,
                        color: "text-cyan-400",
                      },
                    ].map((item, i) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={i}
                          className="p-5 border rounded-2xl border-zinc-800 bg-black/20"
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`h-5 w-5 ${item.color}`}
                            />

                            <p className="font-semibold">
                              {item.title}
                            </p>
                          </div>

                          <p className="mt-4 leading-8 text-zinc-400">
                            {item.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 mt-8 border rounded-2xl border-zinc-800 bg-black/20 text-zinc-500">
                    Live analysis will appear once
                    AI monitoring begins.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FINAL REPORT */}

          {finalReport && (
            <div className="mt-24">
              <div className="max-w-4xl">
                <p className="mb-5 text-sm uppercase tracking-[0.4em] text-zinc-500">
                  Executive Summary
                </p>

                <h2 className="text-5xl font-bold">
                  Final Intelligence Report
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 mt-14 md:grid-cols-2">
                {[
                  {
                    title: "Groupthink Score",
                    value:
                      finalReport.groupthink_score,
                  },
                  {
                    title: "Counterargument",
                    value:
                      finalReport.counterargument,
                  },
                  {
                    title: "Blind Spot",
                    value:
                      finalReport.blind_spot,
                  },
                  {
                    title: "Recommendation",
                    value:
                      finalReport.recommendation,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl transition-all hover:border-fuchsia-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">
                        {item.title}
                      </h3>

                      <ChevronRight className="w-5 h-5 transition text-zinc-600 group-hover:translate-x-1 group-hover:text-white" />
                    </div>

                    <p className="mt-6 leading-9 text-zinc-400">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FLOAT */}

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          100% {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Workspace;
