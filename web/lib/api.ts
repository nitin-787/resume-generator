export async function generateAI(role: string, skills: string[]) {
  const res = await fetch("http://localhost:8080/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role, skills }),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "API failed");
  }

  return JSON.parse(text) as { bullets: string[] };
}
