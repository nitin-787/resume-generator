"use client";

export default function SkillsSection({ resume, setResume }: any) {
  function update(field: string, value: string) {
    setResume({
      ...resume,
      skills: {
        ...resume.skills,
        [field]: value,
      },
    });
  }

  /* AI */
  async function generateAI() {
    try {
      const token = localStorage.getItem("token");

      const skills = [
        resume.skills?.languages || "",
        resume.skills?.frameworks || "",
        resume.skills?.cloud || "",
        resume.skills?.tools || "",
      ]
        .filter(Boolean)
        .join(",");

      const res = await fetch("http://localhost:8080/api/ai/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "Full Stack Developer",
          skills: skills.split(",").map((s: string) => s.trim()),
        }),
      });

      const response = await res.json();
      const bullets = response.data.bullets.join("\n");

      alert("AI Generated:\n\n" + bullets);
    } catch (err) {
      console.error(err);
      alert("AI failed");
    }
  }

  return (
    <div className="rounded-xl border border-zinc-900 bg-[#0d0d0d] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Technical Skills</h2>

        <button
          onClick={generateAI}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Generate AI
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <input
          value={resume.skills.languages}
          onChange={(e) => update("languages", e.target.value)}
          placeholder="Languages"
          className="input"
        />

        <input
          value={resume.skills.frameworks}
          onChange={(e) => update("frameworks", e.target.value)}
          placeholder="Frameworks"
          className="input"
        />

        <input
          value={resume.skills.cloud}
          onChange={(e) => update("cloud", e.target.value)}
          placeholder="Cloud"
          className="input"
        />

        <input
          value={resume.skills.tools}
          onChange={(e) => update("tools", e.target.value)}
          placeholder="Tools"
          className="input"
        />
      </div>
    </div>
  );
}
