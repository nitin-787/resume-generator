"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Download,
  Sparkles,
  Bold,
  Italic,
  List,
} from "lucide-react";

interface ResumeData {
  id: string;
  title: string;
  templateId: string;

  content: {
    name: string;
    email: string;
    role: string;
    skills: string[];
    experience: string;
  };
}

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [skillInput, setSkillInput] = useState("");

  const [resume, setResume] = useState<ResumeData | null>(null);

  useEffect(() => {
    setResume({
      id: String(params.id),

      title: "Backend Resume",

      templateId: "1",

      content: {
        name: "Nitin Sharma",

        email: "nitin@gmail.com",

        role: "Full Stack Developer",

        skills: ["React", "Node", "Docker", "MongoDB"],

        experience: `Built scalable APIs.
Improved performance by 30%.
Worked with deployment pipelines.
Optimized backend services.`,
      },
    });

    setLoading(false);
  }, []);

  function save() {
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
    }, 700);
  }

  function addSkill(e: React.KeyboardEvent) {
    if (e.key === "Enter" && skillInput && resume) {
      e.preventDefault();

      setResume({
        ...resume,

        content: {
          ...resume.content,

          skills: [...resume.content.skills, skillInput],
        },
      });

      setSkillInput("");
    }
  }

  if (loading) {
    return (
      <div
        className="
min-h-screen
bg-[#0a0a0a]
flex
items-center
justify-center
text-white"
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
min-h-screen
bg-[#0a0a0a]
text-white"
    >
      {/* subtle grid */}

      <div
        className="
fixed inset-0
opacity-[0.03]
bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
bg-[size:42px_42px]"
      />

      <div
        className="
relative
max-w-[1700px]
mx-auto
px-8
py-10"
      >
        {/* HEADER */}

        <div
          className="
flex justify-between
items-center
border-b border-zinc-900
pb-8"
        >
          <div>
            <button
              onClick={() => router.push("/dashboard")}
              className="
flex gap-2
text-zinc-500
hover:text-white
transition-all
active:scale-[0.98]
"
            >
              <ArrowLeft size={16} />
              Dashboard
            </button>

            <h1
              className="
text-4xl
font-semibold
mt-5"
            >
              {resume?.title}
            </h1>
          </div>

          <div
            className="
flex gap-3"
          >
            <button
              className="
px-5 py-3
rounded-xl
border border-zinc-800

hover:bg-zinc-900
transition-all
active:scale-[0.98]

flex gap-2
items-center"
            >
              <Download size={16} />
              Export
            </button>

            <button
              onClick={save}
              className="
px-5 py-3
rounded-xl
bg-white
text-black

hover:opacity-90
transition-all
active:scale-[0.98]

flex gap-2
items-center"
            >
              <Save size={16} />

              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* MAIN */}

        <div
          className="
grid
lg:grid-cols-[520px_1fr]
gap-12
mt-10
items-start"
        >
          {/* ================= LEFT ================= */}

          <div
            className="
space-y-6
max-w-[520px]"
          >
            {/* details */}

            <div
              className="
border border-zinc-900
rounded-xl
bg-[#0d0d0d]
p-6"
            >
              <h2>Details</h2>

              <div
                className="
space-y-5
mt-6"
              >
                <input
                  value={resume?.content.name}
                  onChange={(e) =>
                    setResume({
                      ...resume!,

                      content: {
                        ...resume!.content,

                        name: e.target.value,
                      },
                    })
                  }
                  className="
w-full
px-4 py-4
rounded-xl
border border-zinc-800
bg-transparent

focus:ring-1
focus:ring-zinc-700
outline-none"
                />

                <input
                  value={resume?.content.role}
                  onChange={(e) =>
                    setResume({
                      ...resume!,

                      content: {
                        ...resume!.content,

                        role: e.target.value,
                      },
                    })
                  }
                  className="
w-full
px-4 py-4
rounded-xl
border border-zinc-800
bg-transparent"
                />
              </div>
            </div>

            {/* skills */}

            <div
              className="
border border-zinc-900
rounded-xl
bg-[#0d0d0d]
p-6"
            >
              <h2>Skills</h2>

              <div
                className="
flex flex-wrap
gap-2
mt-5"
              >
                {resume?.content.skills.map((skill) => (
                  <button
                    key={skill}
                    className="
px-3 py-2
rounded-full
bg-zinc-900

hover:bg-zinc-800

transition-all
active:scale-[0.95]
"
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                placeholder="
Add skill + Enter"
                className="
w-full
mt-5
px-4 py-4
rounded-xl
border border-zinc-800
bg-transparent"
              />
            </div>

            {/* experience */}

            <div
              className="
border border-zinc-900
rounded-xl
bg-[#0d0d0d]
p-6"
            >
              <div
                className="
flex justify-between"
              >
                <h2>Experience</h2>

                <div
                  className="
flex gap-2"
                >
                  {[Bold, Italic, List].map((Icon, i) => (
                    <button
                      key={i}
                      className="
p-2
rounded-lg

hover:bg-zinc-900

transition-all
active:scale-[0.95]
"
                    >
                      <Icon size={15} />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={10}
                value={resume?.content.experience}
                onChange={(e) =>
                  setResume({
                    ...resume!,

                    content: {
                      ...resume!.content,

                      experience: e.target.value,
                    },
                  })
                }
                className="
w-full
mt-5
px-4 py-4
rounded-xl
border border-zinc-800
bg-transparent
resize-none"
              />
            </div>
          </div>

          {/* ================= RIGHT ================= */}

          <div className="sticky top-8">
            <div
              className="
mx-auto

bg-white
text-black

w-[794px]
min-h-[1123px]

shadow-2xl

p-[60px]

transition-all"
            >
              {/* name */}

              <h1
                className="
text-[40px]
font-bold"
              >
                {resume?.content.name}
              </h1>

              <p
                className="
text-zinc-600
text-lg
mt-2"
              >
                {resume?.content.role}
              </p>

              <p
                className="
text-sm
text-zinc-500
mt-2"
              >
                {resume?.content.email}
              </p>

              <div
                className="
border-b
mt-8"
              />

              {/* skills */}

              <section
                className="
mt-10"
              >
                <h2
                  className="
font-semibold
text-lg
mb-4"
                >
                  Skills
                </h2>

                <div
                  className="
flex flex-wrap
gap-3"
                >
                  {resume?.content.skills.map((s) => (
                    <span
                      key={s}
                      className="
text-[15px]
text-zinc-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              {/* experience */}

              <section
                className="
mt-12"
              >
                <h2
                  className="
font-semibold
text-lg
mb-4"
                >
                  Experience
                </h2>

                <p
                  className="
leading-8
text-[15px]
whitespace-pre-wrap"
                >
                  {resume?.content.experience}
                </p>
              </section>

              {/* projects */}

              <section
                className="
mt-12"
              >
                <h2
                  className="
font-semibold
text-lg
mb-4"
                >
                  Projects
                </h2>

                <p
                  className="
leading-8
text-[15px]"
                >
                  Built AI Resume Builder using Next.js, Go backend and PDF
                  export.
                </p>
              </section>

              <footer
                className="
border-t
mt-20
pt-6
text-xs
text-zinc-500"
              >
                Generated using CVCRAFT
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
