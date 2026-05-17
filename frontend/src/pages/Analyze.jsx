import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import API from "../services/api";

import {
  Brain,
  FileText,
  LayoutDashboard,
  Mic,
  Upload,
  Sparkles,
  Shield,
  AlertTriangle,
  Eye,
  Activity,
  ChevronRight,
  ScanSearch,
} from "lucide-react";

function Home() {
  // ====================================
  // NAVIGATION
  // ====================================

  const navigate = useNavigate();
  const location = useLocation();

  // ====================================
  // STATES
  // ====================================

  const [transcript, setTranscript] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [activeTab, setActiveTab] =
    useState("manual");

  const [particles, setParticles] =
    useState([]);

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
  // ANALYZE MANUAL
  // ====================================

  const analyzeTranscript =
    async () => {
      if (!transcript.trim()) return;

      try {
        setLoading(true);

        const response =
          await API.post(
            "/analyze",
            {
              transcript,
            }
          );

        setResult(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  // ====================================
  // UPLOAD PDF
  // ====================================

  const uploadPDF = async () => {
    if (!selectedFile) return;

    const formData =
      new FormData();

    formData.append(
      "file",
      selectedFile
    );

    try {
      setLoading(true);

      const response =
        await API.post(
          "/upload-pdf",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
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

      {/* FLOATING NAV */}

      <div className="fixed z-50 -translate-x-1/2 left-1/2 top-6">
        <div className="flex items-center gap-3 px-4 py-3 border shadow-2xl rounded-3xl border-zinc-800/80 bg-zinc-900/70 backdrop-blur-2xl">
          {/* logo */}

          <div className="flex items-center gap-3 pr-4 mr-2 border-r border-zinc-800">
            <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-fuchsia-500/10">
              <Brain className="w-5 h-5 text-fuchsia-400" />
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-bold">
                Devil's Advocate
              </p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                Discussion Analysis
              </p>
            </div>
          </div>

          {/* nav items */}

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
                Cognitive Intelligence
              </p>

              <h1 className="text-5xl font-black md:text-7xl">
                Analyze Discussions
              </h1>

              <p className="max-w-3xl mt-6 text-xl leading-9 text-zinc-400">
                Upload transcripts or paste
                discussions to uncover
                groupthink, blind spots,
                ethical risks, and missing
                perspectives.
              </p>
            </div>

            {/* status */}

            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div
                  className={`h-4 w-4 rounded-full ${
                    loading
                      ? "bg-orange-500 animate-pulse"
                      : "bg-green-500"
                  }`}
                ></div>

                <div>
                  <p className="font-semibold">
                    {loading
                      ? "AI Processing"
                      : "Analysis Ready"}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Decision intelligence
                    engine
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TABS */}

          <div className="flex flex-wrap gap-4 mt-16">
            <button
              onClick={() =>
                setActiveTab("manual")
              }
              className={`rounded-2xl px-6 py-4 font-semibold transition ${
                activeTab === "manual"
                  ? "bg-white text-black"
                  : "border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white"
              }`}
            >
              Manual Input
            </button>

            <button
              onClick={() =>
                setActiveTab("pdf")
              }
              className={`rounded-2xl px-6 py-4 font-semibold transition ${
                activeTab === "pdf"
                  ? "bg-white text-black"
                  : "border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white"
              }`}
            >
              Upload PDF
            </button>
          </div>

          {/* INPUT AREA */}

          <div className="mt-10 rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-10 backdrop-blur-xl">
            {/* MANUAL */}

            {activeTab === "manual" && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                      Discussion Input
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                      Manual Analysis
                    </h2>
                  </div>

                  <ScanSearch className="w-10 h-10 text-fuchsia-400" />
                </div>

                <textarea
                  className="mt-10 h-72 w-full rounded-[2rem] border border-zinc-800 bg-black/30 p-6 text-lg outline-none"
                  placeholder="Paste brainstorming transcript, board meeting discussion, strategic planning conversation..."
                  value={transcript}
                  onChange={(e) =>
                    setTranscript(
                      e.target.value
                    )
                  }
                />

                <button
                  onClick={
                    analyzeTranscript
                  }
                  className="flex items-center gap-3 px-8 py-5 mt-8 text-lg font-semibold text-black transition bg-white rounded-2xl hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />

                  {loading
                    ? "Analyzing Discussion..."
                    : "Analyze Discussion"}
                </button>
              </>
            )}

            {/* PDF */}

            {activeTab === "pdf" && (
              <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-fuchsia-500/10">
                  <Upload className="w-12 h-12 text-fuchsia-400" />
                </div>

                <h2 className="mt-10 text-4xl font-bold">
                  Upload Discussion PDF
                </h2>

                <p className="max-w-2xl mt-6 text-lg leading-8 text-zinc-400">
                  Extract and analyze
                  strategic discussions,
                  brainstorming sessions,
                  governance meetings, and
                  organizational reasoning.
                </p>

                <label className="mt-12 cursor-pointer rounded-[2rem] border border-zinc-800 bg-zinc-900 px-10 py-6 text-lg font-semibold transition hover:scale-105 hover:border-fuchsia-500/30">
                  {loading
                    ? "Extracting and analyzing..."
                    : "Select PDF to Analyze"}

                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file =
                        e.target
                          .files[0];

                      if (file) {
                        setSelectedFile(
                          file
                        );

                        const formData =
                          new FormData();

                        formData.append(
                          "file",
                          file
                        );

                        setLoading(
                          true
                        );

                        API.post(
                          "/upload-pdf",
                          formData,
                          {
                            headers:
                              {
                                "Content-Type":
                                  "multipart/form-data",
                              },
                          }
                        )
                          .then(
                            (
                              response
                            ) => {
                              setResult(
                                response.data
                              );
                            }
                          )
                          .catch(
                            (
                              error
                            ) => {
                              console.error(
                                error
                              );
                            }
                          )
                          .finally(
                            () => {
                              setLoading(
                                false
                              );
                            }
                          );
                      }
                    }}
                  />
                </label>

                {selectedFile && (
                  <p className="mt-6 text-zinc-500">
                    Selected:{" "}
                    {
                      selectedFile.name
                    }
                  </p>
                )}
              </div>
            )}
          </div>

          {/* RESULTS */}

          {result && (
            <div className="mt-24">
              <div className="max-w-4xl">
                <p className="mb-5 text-sm uppercase tracking-[0.4em] text-zinc-500">
                  Executive Summary
                </p>

                <h2 className="text-5xl font-bold">
                  Analysis Results
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 mt-14 md:grid-cols-2">
                {[
                  {
                    title:
                      "Groupthink Score",
                    value:
                      result.groupthink_score,
                    icon: Activity,
                    color:
                      "text-orange-400",
                  },
                  {
                    title:
                      "Counterargument",
                    value:
                      result.counterargument,
                    icon: Sparkles,
                    color:
                      "text-fuchsia-400",
                  },
                  {
                    title:
                      "Blind Spot",
                    value:
                      result.blind_spot,
                    icon: Eye,
                    color:
                      "text-cyan-400",
                  },
                  {
                    title:
                      "Ignored Stakeholder",
                    value:
                      result.ignored_stakeholder,
                    icon:
                      AlertTriangle,
                    color:
                      "text-yellow-400",
                  },
                  {
                    title:
                      "Ethical Risk",
                    value:
                      result.ethical_risk,
                    icon: Shield,
                    color:
                      "text-red-400",
                  },
                  {
                    title:
                      "Confidence Level",
                    value:
                      result.confidence_level,
                    icon: Brain,
                    color:
                      "text-green-400",
                  },
                ].map((item, i) => {
                  const Icon =
                    item.icon;

                  return (
                    <div
                      key={i}
                      className="group overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl transition-all hover:border-fuchsia-500/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-black/30">
                            <Icon
                              className={`h-6 w-6 ${item.color}`}
                            />
                          </div>

                          <h3 className="text-2xl font-bold">
                            {
                              item.title
                            }
                          </h3>
                        </div>

                        <ChevronRight className="w-5 h-5 transition text-zinc-600 group-hover:translate-x-1 group-hover:text-white" />
                      </div>

                      <p className="mt-8 leading-9 text-zinc-400">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
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

export default Home;
