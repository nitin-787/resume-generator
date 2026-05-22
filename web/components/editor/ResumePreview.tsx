export default function ResumePreview({ resume }: any) {
  return (
    <div className="sticky top-24 self-start">
      <div
        id="resume-preview"
        className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg p-8"
        style={{ color: "#000" }}
      >
        {/* ================= HEADER ================= */}
        <h1 className="text-4xl font-bold text-center">
          {resume.contact?.name}
        </h1>

        <div className="mt-2 text-center text-sm space-x-2">
          <span>{resume.contact?.phone}</span>
          <span>|</span>
          <span>{resume.contact?.email}</span>
          <span>|</span>
          <span>{resume.contact?.github}</span>
          <span>|</span>
          <span>{resume.contact?.linkedin}</span>
        </div>

        {/* ================= SUMMARY ================= */}
        <section className="mt-8">
          <h2 className="font-bold uppercase border-b pb-1">Summary</h2>
          <p className="mt-4 text-sm text-zinc-500">{resume.summary || ""}</p>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section className="mt-10">
          <h2 className="font-bold uppercase border-b pb-1">Experience</h2>

          <div className="mt-5 space-y-6">
            {resume.experience?.map((exp: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between">
                  <strong>{exp.company}</strong>
                  <span>{exp.date}</span>
                </div>
                <div className="mt-1 text-sm italic">{exp.role}</div>
                <ul>
                  <p className="mt-2 text-sm">
                    {exp.description
                      ?.split("\n")
                      .filter(Boolean)
                      .map((line: string, i: number) => (
                        <li key={i}>{line}</li>
                      ))}
                  </p>
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PROJECTS ================= */}
        <section className="mt-10">
          <h2 className="font-bold uppercase border-b pb-1">Projects</h2>

          <div className="mt-5 space-y-6">
            {resume.projects?.map((project: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between item-start">
                  <strong>{project.title}</strong>
                  <span>{project.date}</span>
                </div>
                <div className="mt-1 text-sm italic">{project.stack}</div>
                <ul>
                  <p className="mt-2 text-sm">
                    {project.description

                      ?.split("\n")
                      .filter(Boolean)
                      .map((line: string, i: number) => (
                        <li key={i}>{line}</li>
                      ))}
                  </p>
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SKILLS ================= */}
        <section className="mt-10">
          <h2 className="font-bold uppercase border-b pb-1">
            Technical Skills
          </h2>

          <div className="mt-5 text-sm space-y-2">
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
        <section className="mt-10">
          <h2 className="font-bold uppercase border-b pb-1">Education</h2>

          <div className="mt-5 space-y-6">
            {resume.education?.map((edu: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between">
                  <strong>{edu.college}</strong>
                  <span>{edu.date}</span>
                </div>
                <div className="mt-1 text-sm">{edu.degree}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
