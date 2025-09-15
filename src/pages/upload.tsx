import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file first!");

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("files", file);

      const res = await apiFetch<{ message: string; inserted: number }>(
        "/raw-data/upload",
        { method: "POST", body: formData }
      );

      setMessage(`✅ ${res.message}, Inserted: ${res.inserted}`);
    } catch (err: unknown) {
      setMessage(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 animate-pulse">Upload CSV</h1>
      <input
        type="file"
        accept=".csv"
        className="mb-4"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {message && <p className="mt-4 text-lg font-medium">{message}</p>}
    </div>
  );
}
