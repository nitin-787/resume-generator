export default function ProjectsSection({ resume, setResume }: any) {
  if (!resume) {
    return null;
  }

  function addProject() {
    setResume({
      ...resume,

      projects: [
        ...(resume.projects || []),

        {
          title: "",
          stack: "",
          date: "",
        },
      ],
    });
  }

  function removeProject(index: number) {
    setResume({
      ...resume,

      projects: resume.projects.filter((_: any, i: number) => i !== index),
    });
  }

  function update(
    index: number,

    field: string,

    value: string
  ) {
    const updated = [...(resume.projects || [])];

    updated[index] = {
      ...updated[index],

      [field]: value,
    };

    setResume({
      ...resume,

      projects: updated,
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
        <h2>Projects</h2>

        <button
          onClick={addProject}
          className="
px-3 py-2

rounded-lg

border border-zinc-800

hover:bg-zinc-900"
        >
          + Add
        </button>
      </div>

      <div
        className="
space-y-6
mt-6"
      >
        {(resume.projects || []).map((project: any, index: number) => (
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
                Project
                {index + 1}
              </div>

              <button
                onClick={() => removeProject(index)}
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
                value={project.title}
                onChange={(e) =>
                  update(
                    index,

                    "title",

                    e.target.value
                  )
                }
                placeholder="
Project Name"
                className="
input"
              />

              <input
                value={project.stack}
                onChange={(e) =>
                  update(
                    index,

                    "stack",

                    e.target.value
                  )
                }
                placeholder="
Tech Stack"
                className="
input"
              />

              <input
                value={project.date}
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
