import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10">
      <h1 className="text-6xl font-bold mb-4">
        Devil's Advocate
      </h1>

      <p className="text-zinc-400 text-xl mb-10">
        AI-powered cognitive diversity for smarter decisions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate("/analyze")}
          className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl hover:border-white transition"
        >
          <h2 className="text-3xl font-bold mb-3">
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
