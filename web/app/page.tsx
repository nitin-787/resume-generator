"use client";

import { useState } from "react";
import { generateAI } from "@/lib/api";

export default function Home() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit() {
    setLoading(true);
    setError("");
    try {
      const data = await generateAI(
        role,
        skills
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      );
      setBullets(data.bullets);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>AI Resume Generator</h1>

      <input
        placeholder="Role (e.g. Frontend Developer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <br />
      <br />

      <button onClick={onSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate bullets"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </main>
  );
}
