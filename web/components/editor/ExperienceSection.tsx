export default function ExperienceSection({ resume, setResume }: any) {
  /* prevent crashes */

  if (!resume) {
    return null;
  }

  function addExperience() {
    setResume({
      ...resume,

      experience: [
        ...(resume.experience || []),

        {
          company: "",
          role: "",
          date: "",
        },
      ],
    });
  }

  function removeExperience(index: number) {
    setResume({
      ...resume,

      experience: resume.experience.filter((_: any, i: number) => i !== index),
    });
  }

  function updateField(
    index: number,

    field: string,

    value: string
  ) {
    const updated = [...(resume.experience || [])];

    updated[index] = {
      ...updated[index],

      [field]: value,
    };

    setResume({
      ...resume,

      experience: updated,
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
      <div
        className="
flex justify-between
items-center"
      >
        <h2>Experience</h2>

        <button
          onClick={addExperience}
          className="
px-3 py-2

rounded-lg

border border-zinc-800

hover:bg-zinc-900

transition-all"
        >
          + Add
        </button>
      </div>

      <div
        className="
space-y-6
mt-6"
      >
        {(resume.experience || []).map((exp: any, index: number) => (
          <div
            key={index}
            className="
border border-zinc-900

rounded-xl

p-4"
          >
            <div
              className="
flex justify-between
mb-4"
            >
              <div
                className="
text-sm
text-zinc-500"
              >
                Experience
                {index + 1}
              </div>

              <button
                onClick={() => removeExperience(index)}
                className="
text-red-400
text-xs"
              >
                Delete
              </button>
            </div>

            <div
              className="
space-y-4"
            >
              <input
                value={exp.company || ""}
                onChange={(e) =>
                  updateField(
                    index,

                    "company",

                    e.target.value
                  )
                }
                placeholder="
Company"
                className="
input"
              />

              <input
                value={exp.role || ""}
                onChange={(e) =>
                  updateField(
                    index,

                    "role",

                    e.target.value
                  )
                }
                placeholder="
Role"
                className="
input"
              />

              <input
                value={exp.date || ""}
                onChange={(e) =>
                  updateField(
                    index,

                    "date",

                    e.target.value
                  )
                }
                placeholder="
Date"
                className="
input"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
