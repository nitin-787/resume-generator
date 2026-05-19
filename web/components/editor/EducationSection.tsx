export default function EducationSection({ resume, setResume }: any) {
  function addEducation() {
    setResume({
      ...resume,

      education: [
        ...resume.education,

        {
          college: "",
          degree: "",
          date: "",
        },
      ],
    });
  }

  function removeEducation(index: number) {
    setResume({
      ...resume,

      education: resume.education.filter((_: any, i: number) => i !== index),
    });
  }

  function update(
    index: number,

    field: string,

    value: string
  ) {
    const updated = [...resume.education];

    updated[index] = {
      ...updated[index],

      [field]: value,
    };

    setResume({
      ...resume,

      education: updated,
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
        <h2>Education</h2>

        <button
          onClick={addEducation}
          className="
px-3 py-2

rounded-lg

border border-zinc-800

hover:bg-zinc-900

active:scale-[0.97]

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
        {resume.education.map((edu: any, index: number) => (
          <div
            key={index}
            className="
border border-zinc-900

rounded-xl

p-4"
          >
            <div
              className="
flex justify-between"
            >
              <div
                className="
text-sm
text-zinc-500"
              >
                Education
                {index + 1}
              </div>

              <button
                onClick={() => removeEducation(index)}
                className="
text-xs
text-red-400"
              >
                Delete
              </button>
            </div>

            <div
              className="
space-y-4
mt-4"
            >
              <input
                value={"edu.college"}
                onChange={(e) =>
                  update(
                    index,

                    "college",

                    e.target.value
                  )
                }
                placeholder="
College"
                className="
input"
              />

              <input
                value={"edu.degree"}
                onChange={(e) =>
                  update(
                    index,

                    "degree",

                    e.target.value
                  )
                }
                placeholder="
Degree"
                className="
input"
              />

              <input
                value={"edu.date"}
                onChange={(e) =>
                  update(
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
