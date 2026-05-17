import {
  Brain,
  Shield,
  Radar,
  Sparkles,
  Activity,
  Cpu,
  Eye,
  AlertTriangle,
  Network,
  Mic,
  Command,
  FileText,
  ChevronRight,
  Waves,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = [...Array(45)].map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));

    setParticles(generated);
  }, []);

  const navigation = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Workspace",
      path: "/workspace",
    },
    {
      name: "Live",
      path: "/live",
    },
    {
      name: "Analyze",
      path: "/analyze",
    },
  ];

  const quickActions = [
    {
      title: "Start Live Session",
      desc: "Real-time AI meeting intelligence and cognitive monitoring.",
      icon: Mic,
      action: () => navigate("/live"),
    },
    {
      title: "Analyze Transcript",
      desc: "Upload discussions and detect weak reasoning patterns.",
      icon: FileText,
      action: () => navigate("/analyze"),
    },
    {
      title: "Open Workspace",
      desc: "Manage strategic sessions and organizational reasoning.",
      icon: Brain,
      action: () => navigate("/workspace"),
    },
  ];

  const liveFeed = [
    "Consensus forming too rapidly",
    "Contradiction detected in assumptions",
    "Minority perspective absent",
    "Confidence mismatch identified",
  ];

  const modules = [
    {
      title: "Live Meeting Intelligence",
      desc: "Analyze discussions in real time for consensus acceleration, weak assumptions, and missing viewpoints.",
      icon: Mic,
    },
    {
      title: "Governance Intelligence",
      desc: "Evaluate discussions against policies, governance frameworks, and ethical standards.",
      icon: Shield,
    },
    {
      title: "Strategic Reports",
      desc: "Generate reports with counterarguments, unresolved risks, and reasoning analysis.",
      icon: Eye,
    },
    {
      title: "Agenda Intelligence",
      desc: "Track strategic progress dynamically and identify unresolved decision states.",
      icon: Command,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-zinc-950">
      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden">
        {/* glow blobs */}

        <div className="absolute -left-60 -top-60 h-[45rem] w-[45rem] animate-pulse rounded-full bg-fuchsia-500/10 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-[40rem] w-[40rem] animate-pulse rounded-full bg-cyan-500/10 blur-3xl"></div>

        {/* animated grid */}

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

        {/* orbit rings */}

        <div className="absolute left-1/2 top-20 h-[50rem] w-[50rem] -translate-x-1/2 animate-spin rounded-full border border-zinc-800/40 [animation-duration:60s]"></div>

        <div className="absolute left-1/2 top-40 h-[35rem] w-[35rem] -translate-x-1/2 animate-spin rounded-full border border-zinc-800/40 [animation-duration:40s]"></div>

        {/* floating particles */}

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
                Intelligence OS
              </p>
            </div>
          </div>

          {/* nav items */}

          {navigation.map((item, i) => {
            const active =
              location.pathname === item.path;

            return (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className={`rounded-2xl px-5 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:bg-zinc-800/70 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN */}

      <div className="relative z-10 px-6 pb-20 pt-36 md:px-10">
        {/* HERO */}

        <div className="mx-auto text-center max-w-7xl">
          {/* chips */}

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {[
              {
                icon: Activity,
                text: "AI Systems Active",
                color: "text-green-400",
              },
              {
                icon: Radar,
                text: "Live Cognitive Monitoring",
                color: "text-cyan-400",
              },
              {
                icon: Shield,
                text: "Governance Synced",
                color: "text-fuchsia-400",
              },
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-3 border rounded-2xl border-zinc-800 bg-zinc-900/60 backdrop-blur-xl"
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

          <p className="mb-6 text-sm uppercase tracking-[0.45em] text-zinc-500">
            Organizational Decision Infrastructure
          </p>

          <h1 className="text-6xl font-black leading-none md:text-[8rem]">
            Counterpoint
            <br />
            
          </h1>

          <p className="max-w-4xl mx-auto mt-10 text-xl leading-9 text-zinc-400 md:text-2xl">
            Real-time AI intelligence for meetings,
            governance, dissent analysis,
            and strategic organizational reasoning.
          </p>

          {/* QUICK ACTIONS */}

          <div className="grid grid-cols-1 gap-6 mt-20 lg:grid-cols-3">
            {quickActions.map((item, i) => {
              const Icon = item.icon;

              return (
                <button
                  key={i}
                  onClick={item.action}
                  className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 text-left backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-fuchsia-500/30"
                >
                  {/* glow */}

                  <div className="absolute inset-0 transition opacity-0 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-16 h-16 rounded-3xl bg-fuchsia-500/10">
                      <Icon className="w-8 h-8 text-fuchsia-400" />
                    </div>

                    <h3 className="mt-8 text-3xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-lg leading-8 text-zinc-400">
                      {item.desc}
                    </p>

                    <div className="flex items-center gap-2 mt-8 text-sm font-medium text-fuchsia-400">
                      Open Module

                      <ChevronRight className="w-4 h-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* LIVE FEED */}

        <div className="mx-auto mt-28 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            {/* LEFT */}

            <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    AI Monitoring
                  </p>

                  <h2 className="mt-3 text-4xl font-bold">
                    Intelligence Feed
                  </h2>
                </div>

                <Activity className="w-10 h-10 text-orange-400" />
              </div>

              <div className="mt-10 space-y-4">
                {liveFeed.map((item, i) => (
                  <div
                    key={i}
                    className="p-5 border rounded-2xl border-zinc-800 bg-black/20"
                  >
                    <div className="flex gap-4">
                      <AlertTriangle className="w-5 h-5 mt-1 text-orange-400" />

                      <div>
                        <p className="leading-7 text-zinc-300">
                          {item}
                        </p>

                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
                          Cognitive Monitoring
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}

            <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-cyan-500/5"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                      System State
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                      Infrastructure
                    </h2>
                  </div>

                  <Network className="w-10 h-10 text-cyan-400" />
                </div>

                {/* fake graph aesthetic */}

                <div className="relative p-6 mt-12 overflow-hidden border rounded-2xl border-zinc-800 bg-black/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 to-cyan-500/5"></div>

                  <div className="relative flex items-end h-40 gap-2">
                    {[30, 55, 40, 75, 65, 90, 50, 70].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-xl bg-gradient-to-t from-fuchsia-500/70 to-cyan-400/70"
                          style={{
                            height: `${h}%`,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="mt-10 space-y-5">
                  {[
                    "Transcript Engine Connected",
                    "Governance Layer Synced",
                    "Dissent Monitoring Active",
                    "Strategic Reasoning Online",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between"
                    >
                      <span className="text-zinc-400">
                        {item}
                      </span>

                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}

        <div className="mx-auto mt-36 max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm uppercase tracking-[0.4em] text-zinc-500">
              Platform Modules
            </p>

            <h2 className="text-5xl font-bold leading-tight">
              AI systems for organizational reasoning.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-20 lg:grid-cols-2">
            {modules.map((card, i) => {
              const Icon = card.icon;

              return (
                <div
                  key={i}
                  className="group overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl transition-all hover:border-fuchsia-500/30"
                >
                  {/* visual */}

                  <div className="relative overflow-hidden bg-black border-b h-72 border-zinc-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10"></div>

                    <div className="absolute border rounded-full -left-10 -top-20 h-96 w-96 border-fuchsia-500/20"></div>

                    <div className="absolute bottom-0 right-0 border rounded-full h-80 w-80 border-cyan-500/20"></div>

                    {/* waveform */}

                    <div className="absolute left-0 flex items-end w-full gap-2 px-10 bottom-10 opacity-60">
                      {[20, 40, 60, 45, 70, 35, 90, 50].map(
                        (h, idx) => (
                          <div
                            key={idx}
                            className="flex-1 rounded-full bg-gradient-to-t from-fuchsia-500 to-cyan-400"
                            style={{
                              height: `${h}px`,
                            }}
                          />
                        )
                      )}
                    </div>

                    <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 border left-1/2 top-1/2 h-28 w-28 rounded-3xl border-zinc-700 bg-zinc-900/80 backdrop-blur-xl">
                      <Icon className="w-12 h-12 text-fuchsia-400" />
                    </div>
                  </div>

                  {/* content */}

                  <div className="p-8">
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
                      AI Module
                    </p>

                    <h3 className="text-3xl font-bold">
                      {card.title}
                    </h3>

                    <p className="mt-5 text-lg leading-8 text-zinc-400">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FINAL CTA */}

        <div className="mx-auto mt-40 max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] border border-zinc-800 bg-zinc-900/60 p-16 text-center backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 to-cyan-500/5"></div>

            <div className="relative z-10">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-fuchsia-500/10">
                <Waves className="w-12 h-12 text-fuchsia-400" />
              </div>

              <h2 className="max-w-5xl mx-auto mt-10 text-5xl font-bold leading-tight md:text-6xl">
                Build organizations that think critically.
              </h2>

              <p className="max-w-3xl mx-auto mt-8 text-xl leading-9 text-zinc-400">
                Devil's Advocate transforms meetings
                into intelligent decision environments
                powered by AI reasoning and cognitive diversity.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-14">
                <button
                  onClick={() => navigate("/workspace")}
                  className="px-10 py-5 text-lg font-semibold text-black transition-all bg-white rounded-2xl hover:scale-105"
                >
                  Enter Workspace
                </button>

                <button
                  onClick={() => navigate("/live")}
                  className="px-10 py-5 text-lg font-semibold transition-all border rounded-2xl border-zinc-700 bg-zinc-900 hover:border-fuchsia-500/40"
                >
                  Open Live Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLOAT ANIMATION */}

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

export default Dashboard;
