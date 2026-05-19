export default function SkillsSection({ resume, setResume }: any) {
  function update(
    field: string,

    value: string
  ) {
    setResume({
      ...resume,

      skills: {
        ...resume.skills,

        [field]: value,
      },
    });
  }

  return (
    <div
      className="
bg-[#0d0d0d]

border border-zinc-900

rounded-xl

p-6"
    >
      <h2
        className="
font-medium"
      >
        Technical Skills
      </h2>

      <div
        className="
grid
grid-cols-2

gap-4

mt-6"
      >
        <input
          value={resume.skills.languages}
          onChange={(e) =>
            update(
              "languages",

              e.target.value
            )
          }
          placeholder="
Languages"
          className="
input"
        />

        <input
          value={resume.skills.frameworks}
          onChange={(e) =>
            update(
              "frameworks",

              e.target.value
            )
          }
          placeholder="
Frameworks"
          className="
input"
        />

        <input
          value={resume.skills.cloud}
          onChange={(e) =>
            update(
              "cloud",

              e.target.value
            )
          }
          placeholder="
Cloud"
          className="
input"
        />

        <input
          value={resume.skills.tools}
          onChange={(e) =>
            update(
              "tools",

              e.target.value
            )
          }
          placeholder="
Tools"
          className="
input"
        />
      </div>
    </div>
  );
}
