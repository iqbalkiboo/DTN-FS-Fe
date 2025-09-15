"use client";

import Card from "../components/Card";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome</h1>
      <Card
        title="Iqbalkiboo"
        description="Ini Test untuk masuk ke DTN"
      />
    </main>
  );
}
