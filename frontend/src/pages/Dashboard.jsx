import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-10 text-white bg-zinc-950">
      <h1 className="mb-4 text-6xl font-bold">
        Devil's Advocate
      </h1>

      <p className="mb-10 text-xl text-zinc-400">
        AI-powered cognitive diversity for smarter decisions.
      </p>
      <button
        onClick={() => navigate("/live")}
        className="p-10 transition border bg-zinc-900 border-zinc-800 rounded-3xl hover:border-white"
      >
        <h2 className="mb-3 text-3xl font-bold">
          Live Meeting
        </h2>

        <p className="text-zinc-400">
          Real-time AI meeting intelligence and groupthink detection.
        </p>
      </button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <button
          onClick={() => navigate("/analyze")}
          className="p-10 transition border bg-zinc-900 border-zinc-800 rounded-3xl hover:border-white"
        >
          <h2 className="mb-3 text-3xl font-bold">
            Analyze Discussion
          </h2>

          <p className="text-zinc-400">
            Upload transcripts or enter discussions manually.
          </p>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
