import { useState } from "react";
import { apiFetch } from "@/lib/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type GraphItem = {
  resultTime: string;
  availability: number;
};

export default function GraphPage() {
  const [enodebId, setEnodebId] = useState("");
  const [cellId, setCellId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState<GraphItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const res = await apiFetch<GraphItem[]>(
        `/raw-data/graph?enodebId=${enodebId}&cellId=${cellId}&startDate=${startDate}&endDate=${endDate}`
      );
      setData(res);
    } catch (err: unknown) {
      alert("Failed to fetch graph: " + (err instanceof Error ? err.message : 'Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Graph</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Enodeb ID"
          className="border p-2 rounded"
          value={enodebId}
          onChange={(e) => setEnodebId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cell ID"
          className="border p-2 rounded"
          value={cellId}
          onChange={(e) => setCellId(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button
        onClick={handleFetch}
        disabled={loading}
        className="mb-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transform hover:scale-105 transition-all"
      >
        {loading ? "Loading..." : "Show Graph"}
      </button>

      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="resultTime" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="availability"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
