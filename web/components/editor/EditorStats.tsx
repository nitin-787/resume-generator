export default function EditorStats({ resume }: any) {
  /* prevent crashes */

  if (!resume) {
    return (
      <div
        className="
bg-[#0d0d0d]

border border-zinc-900

rounded-xl

p-6"
      >
        Loading stats...
      </div>
    );
  }

  /* safe words count */

  const words =
    JSON.stringify(resume || {})

      ?.split(" ").length || 0;

  const checks = [
    ["Contact", !!resume.contact?.name],

    ["Experience", resume.experience?.length > 0],

    ["Projects", resume.projects?.length > 0],

    ["Education", resume.education?.length > 0],
  ];

  const completion = Math.floor(
    (checks.filter((x) => x[1]).length / checks.length) * 100
  );

  const ats = Math.min(
    60 +
      (resume.projects?.length || 0) * 5 +
      (resume.experience?.length || 0) * 5 +
      words / 20,

    95
  );

  return (
    <div
      className="
grid
grid-cols-4
gap-4"
    >
      <div
        className="
bg-[#0d0d0d]
border border-zinc-900
rounded-xl
p-5"
      >
        <div
          className="
text-sm
text-zinc-500"
        >
          ATS
        </div>

        <div
          className="
text-3xl
font-semibold
mt-2"
        >
          {Math.floor(ats)}
        </div>
      </div>

      <div
        className="
bg-[#0d0d0d]
border border-zinc-900
rounded-xl
p-5"
      >
        <div
          className="
text-sm
text-zinc-500"
        >
          Completion
        </div>

        <div
          className="
text-3xl
font-semibold
mt-2"
        >
          {completion}%
        </div>
      </div>

      <div
        className="
bg-[#0d0d0d]
border border-zinc-900
rounded-xl
p-5"
      >
        <div
          className="
text-sm
text-zinc-500"
        >
          Words
        </div>

        <div
          className="
text-3xl
font-semibold
mt-2"
        >
          {words}
        </div>
      </div>

      <div
        className="
bg-[#0d0d0d]
border border-zinc-900
rounded-xl
p-5"
      >
        <div
          className="
text-sm
text-zinc-500"
        >
          Projects
        </div>

        <div
          className="
text-3xl
font-semibold
mt-2"
        >
          {resume.projects?.length || 0}
        </div>
      </div>
    </div>
  );
}
