import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { topics } from "../data/parsedData";
import Container from "../components/container";

const Topics = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("all");

  // Fake stats for now (later connect to real data)
  const totalTopics = topics.length;
  const totalQuestions = topics.reduce((s, t) => s + t.questions.length, 0);
  const accuracy = 68;
  const avgTime = 52;

  // Fake performance generator
  const topicStats = useMemo(() => {
    return topics.map((t) => {
      const progress = Math.floor(Math.random() * 100);
      const avg = 30 + Math.floor(Math.random() * 90);

      let strength = "medium";
      if (progress < 40) strength = "weak";
      else if (progress > 75) strength = "strong";

      return {
        ...t,
        progress,
        avgTime: avg,
        strength,
      };
    });
  }, []);

  const filteredTopics = topicStats.filter((t) => {
    if (search === "all") return true;
    return t.strength === search;
  });

  return (
    <Container>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">📘 Important Topics</h1>
        <p className="text-gray-400">
          Topics extracted from your notes. Revise smartly.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Topics" value={totalTopics} />
        <StatCard label="Questions" value={totalQuestions} />
        <StatCard label="Accuracy" value={`${accuracy}%`} />
        <StatCard label="Avg Time" value={`${avgTime}s`} />
      </div>

      {/* Suggestions */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-5 mb-8">
        <h3 className="font-semibold mb-2">💡 Smart Suggestions</h3>
        <p className="text-gray-300">
          You should revise: <span className="text-yellow-400">Stack</span>,{" "}
          <span className="text-red-400">Queue</span> and{" "}
          <span className="text-yellow-400">Recursion</span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-8">
        {["all", "strong", "medium", "weak"].map((f) => (
          <button
            key={f}
            onClick={() => setSearch(f)}
            className={`px-4 py-2 rounded-full border ${
              search === f
                ? "bg-indigo-600 border-indigo-400"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className={`group relative p-6 rounded-2xl border backdrop-blur transition-all hover:scale-[1.02]
              ${
                topic.strength === "strong"
                  ? "border-green-500/30 bg-green-500/5"
                  : topic.strength === "weak"
                  ? "border-red-500/30 bg-red-500/5"
                  : "border-yellow-500/30 bg-yellow-500/5"
              }`}
          >
            {/* Strength Badge */}
            <div
              className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full ${
                topic.strength === "strong"
                  ? "bg-green-500/20 text-green-400"
                  : topic.strength === "weak"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {topic.strength.toUpperCase()}
            </div>

            <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {topic.questions.length} Questions
            </p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1 text-gray-400">
                <span>Progress</span>
                <span>{topic.progress}%</span>
              </div>
              <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    topic.strength === "strong"
                      ? "bg-green-400"
                      : topic.strength === "weak"
                      ? "bg-red-400"
                      : "bg-yellow-400"
                  }`}
                  style={{ width: `${topic.progress}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              ⚡ Avg Time: {topic.avgTime}s
            </p>

            {/* Actions */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => navigate(`/topics/${topic.id}`)}
                className="flex-1 py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-500"
              >
                📄 View
              </button>
              <button
                onClick={() => navigate(`/quiz/${topic.id}`)}
                className="flex-1 py-2 text-sm rounded bg-green-600 hover:bg-green-500"
              >
                🧠 Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Topics;
