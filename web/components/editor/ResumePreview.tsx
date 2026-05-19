export default function ResumePreview({ resume }: any) {
  return (
    <div
      className="
sticky
top-24

self-start"
    >
      <div
        id="resume-preview"
        className="
bg-white
text-black

w-[850px]
min-h-[1200px]

p-[55px]

shadow-[0_20px_80px_rgba(0,0,0,0.35)]

transition-all"
      >
        {/* ================= HEADER ================= */}

        <h1
          className="
text-4xl
font-bold
text-center"
        >
          {resume.contact?.name}
        </h1>

        <div
          className="
text-center
text-sm

mt-2

space-x-2"
        >
          <span>{resume.contact?.phone}</span>

          <span>|</span>

          <span>{resume.contact?.email}</span>

          <span>|</span>

          <span>{resume.contact?.github}</span>

          <span>|</span>

          <span>{resume.contact?.linkedin}</span>
        </div>

        {/* ================= EXPERIENCE ================= */}

        <section
          className="
mt-10"
        >
          <h2
            className="
font-bold
uppercase

border-b

pb-1"
          >
            Experience
          </h2>

          <div
            className="
space-y-6
mt-5"
          >
            {resume.experience?.map((exp: any, i: number) => (
              <div key={i}>
                <div
                  className="
flex justify-between"
                >
                  <strong>{exp.company}</strong>

                  <span>{exp.date}</span>
                </div>

                <div
                  className="
italic
text-sm
mt-1"
                >
                  {exp.role}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PROJECTS ================= */}

        <section
          className="
mt-10"
        >
          <h2
            className="
font-bold
uppercase

border-b

pb-1"
          >
            Projects
          </h2>

          <div
            className="
space-y-6
mt-5"
          >
            {resume.projects?.map((project: any, i: number) => (
              <div key={i}>
                <div
                  className="
flex justify-between"
                >
                  <strong>{project.title}</strong>

                  <span>{project.date}</span>
                </div>

                <div
                  className="
italic
text-sm
mt-1"
                >
                  {project.stack}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SKILLS ================= */}

        <section
          className="
mt-10"
        >
          <h2
            className="
font-bold
uppercase

border-b

pb-1"
          >
            Technical Skills
          </h2>

          <div
            className="
mt-5

space-y-2

text-sm"
          >
            <div>
              <strong>Languages:</strong> {resume.skills?.languages}
            </div>

            <div>
              <strong>Frameworks:</strong> {resume.skills?.frameworks}
            </div>

            <div>
              <strong>Cloud:</strong> {resume.skills?.cloud}
            </div>

            <div>
              <strong>Tools:</strong> {resume.skills?.tools}
            </div>
          </div>
        </section>

        {/* ================= EDUCATION ================= */}

        <section
          className="
mt-10"
        >
          <h2
            className="
font-bold
uppercase

border-b

pb-1"
          >
            Education
          </h2>

          <div
            className="
space-y-6
mt-5"
          >
            {resume.education?.map((edu: any, i: number) => (
              <div key={i}>
                <div
                  className="
flex justify-between"
                >
                  <strong>{edu.college}</strong>

                  <span>{edu.date}</span>
                </div>

                <div
                  className="
text-sm
mt-1"
                >
                  {edu.degree}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FOOTER ================= */}

        <div
          className="
border-t

mt-14
pt-5

text-xs

text-zinc-500

text-center"
        >
          Generated using CV_CRAFT
        </div>
      </div>
    </div>
  );
}
