// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Graph & Upload",
  description: "Upload CSV and show graph data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* Navbar Global */}
        <nav className="bg-white shadow-md px-6 py-4 flex gap-6 items-center sticky top-0 z-10">
          <Link
            href="/upload"
            className="text-blue-600 font-semibold hover:underline hover:scale-105 transition-transform"
          >
            Upload
          </Link>
          <Link
            href="/graph"
            className="text-green-600 font-semibold hover:underline hover:scale-105 transition-transform"
          >
            Show Graph
          </Link>
        </nav>

        {/* Content dari setiap page */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
