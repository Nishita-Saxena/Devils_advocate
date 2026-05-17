import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Brain,
  Mic,
  FileText,
  LayoutDashboard,
  Activity,
  AlertTriangle,
  Waves,
  Shield,
  Sparkles,
} from "lucide-react";

function Live() {
  // ====================================
  // NAVIGATION
  // ====================================

  const navigate = useNavigate();
  const location = useLocation();

  // ====================================
  // STATES
  // ====================================

  const [isListening, setIsListening] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const [analysis, setAnalysis] =
    useState(null);

  const [finalReport, setFinalReport] =
    useState(null);

  const [particles, setParticles] =
    useState([]);

  // ====================================
  // REFS
  // ====================================

  const recognitionRef = useRef(null);

  const transcriptRef = useRef("");

  const analysisRunningRef =
    useRef(false);

  // ====================================
  // PARTICLES
  // ====================================

  useEffect(() => {
    const generated = [...Array(35)].map(
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
  // NAV ITEMS
  // ====================================

  const navigation = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Workspace",
      path: "/workspace",
      icon: Brain,
    },
    {
      title: "Live",
      path: "/live",
      icon: Mic,
    },
    {
      title: "Analyze",
      path: "/analyze",
      icon: FileText,
    },
  ];

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
      alert(
        "Speech Recognition not supported"
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;

    recognition.onresult = async (
      event
    ) => {
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
        transcriptRef.current +=
          finalTranscript;

        setTranscript(
          transcriptRef.current
        );

        // ====================================
        // LIVE ANALYSIS
        // ====================================

        if (
          !analysisRunningRef.current
        ) {
          analysisRunningRef.current = true;

          try {
            const response =
              await fetch(
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
        const response =
          await fetch(
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
            backgroundSize:
              "70px 70px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 85%)",
          }}
        />

        {/* rings */}

        <div className="absolute left-1/2 top-20 h-[50rem] w-[50rem] -translate-x-1/2 animate-spin rounded-full border border-zinc-800/40 [animation-duration:60s]"></div>

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

      {/* FLOATING NAVBAR */}

      <div className="fixed z-50 -translate-x-1/2 left-1/2 top-6">
        <div className="flex items-center gap-3 px-4 py-3 border shadow-2xl rounded-3xl border-zinc-800/80 bg-zinc-900/70 backdrop-blur-2xl">
          {/* LOGO */}

          <div className="flex items-center gap-3 pr-4 mr-2 border-r border-zinc-800">
            <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-fuchsia-500/10">
              <Brain className="w-5 h-5 text-fuchsia-400" />
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-bold">
                Devil's Advocate
              </p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                Live Intelligence
              </p>
            </div>
          </div>

          {/* NAV ITEMS */}

          {navigation.map((item, i) => {
            const active =
              location.pathname ===
              item.path;

            const Icon = item.icon;

            return (
              <button
                key={i}
                onClick={() =>
                  navigate(item.path)
                }
                className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:bg-zinc-800/70 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />

                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN */}

      <div className="relative z-10 px-6 pt-40 pb-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* HERO */}

          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-zinc-500">
                Real-Time Intelligence
              </p>

              <h1 className="text-5xl font-black md:text-7xl">
                Live Meeting Analysis
              </h1>

              <p className="max-w-3xl mt-6 text-xl leading-9 text-zinc-400">
                Continuous AI-powered
                meeting intelligence,
                live transcript monitoring,
                and cognitive risk
                detection.
              </p>
            </div>

            {/* STATUS */}

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
                      : "System Ready"}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Real-time monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTROL PANEL */}

          <div className="mt-16 rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-10 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Live Controls
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  Meeting Intelligence
                </h2>
              </div>

              <button
                onClick={
                  isListening
                    ? stopListening
                    : startListening
                }
                className={`flex items-center gap-3 rounded-2xl px-8 py-5 text-lg font-semibold transition ${
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
            </div>

            {/* chips */}

            <div className="flex flex-wrap gap-4 mt-10">
              {[
                {
                  icon: Activity,
                  text: "Live Monitoring",
                  color: "text-green-400",
                },
                {
                  icon: Shield,
                  text: "Ethics Analysis",
                  color: "text-cyan-400",
                },
                {
                  icon: Sparkles,
                  text: "AI Reasoning",
                  color: "text-fuchsia-400",
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-5 py-3 border rounded-2xl border-zinc-800 bg-black/20"
                  >
                    <Icon
                      className={`h-4 w-4 ${item.color}`}
                    />

                    <p className="text-sm text-zinc-300">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CONTENT */}

          <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
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

              <div className="mt-10 min-h-[500px] rounded-[2rem] border border-zinc-800 bg-black/30 p-8">
                <p className="leading-9 whitespace-pre-wrap text-zinc-300">
                  {transcript ||
                    "Waiting for discussion..."}
                </p>
              </div>
            </div>

            {/* ANALYSIS */}

            <div className="space-y-8">
              <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                      AI Monitoring
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                      Live Signals
                    </h2>
                  </div>

                  <Activity className="text-orange-400 h-9 w-9" />
                </div>

                {analysis ? (
                  <div className="mt-8 space-y-5">
                    {[
                      {
                        title:
                          "Groupthink Risk",
                        value:
                          analysis.groupthink_score,
                      },
                      {
                        title:
                          "Ignored Stakeholder",
                        value:
                          analysis.ignored_stakeholder,
                      },
                      {
                        title:
                          "Ethical Risk",
                        value:
                          analysis.ethical_risk,
                      },
                      {
                        title:
                          "Missing Perspective",
                        value:
                          analysis.missing_perspective,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-5 border rounded-2xl border-zinc-800 bg-black/20"
                      >
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-orange-400" />

                          <p className="font-semibold">
                            {item.title}
                          </p>
                        </div>

                        <p className="mt-4 leading-8 text-zinc-400">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 mt-8 border rounded-2xl border-zinc-800 bg-black/20 text-zinc-500">
                    Live analysis will
                    appear once monitoring
                    begins.
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
                  Final Meeting Report
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 mt-14 md:grid-cols-2">
                {[
                  {
                    title:
                      "Groupthink Score",
                    value:
                      finalReport.groupthink_score,
                  },
                  {
                    title:
                      "Counterargument",
                    value:
                      finalReport.counterargument,
                  },
                  {
                    title:
                      "Blind Spot",
                    value:
                      finalReport.blind_spot,
                  },
                  {
                    title:
                      "Ignored Stakeholder",
                    value:
                      finalReport.ignored_stakeholder,
                  },
                  {
                    title:
                      "Ethical Risk",
                    value:
                      finalReport.ethical_risk,
                  },
                  {
                    title:
                      "Recommendation",
                    value:
                      finalReport.recommendation,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl"
                  >
                    <h3 className="text-2xl font-bold">
                      {item.title}
                    </h3>

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

export default Live;
