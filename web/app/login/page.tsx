"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password)
      return alert("Email aur password dono daalo bhai!");

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Backend se ye flat data aaya bhai:", data);

      // Ab koi data.data nahi, seedha data.token!
      if (res.ok && data.success && data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed!");
      }
    } catch (err: any) {
      setError("Backend server se connect nahi ho pa raha!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md rounded-lg bg-gray-900 p-8 shadow-lg border border-gray-800">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          SaaS Resume Generator
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-900/50 border border-red-500 rounded text-sm text-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nitin@gmail.com"
              className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded font-medium transition disabled:bg-gray-700 text-sm"
          >
            {loading ? "Logging in..." : "Login Karo 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}
