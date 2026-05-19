"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText, LogOut, Plus } from "lucide-react";

interface Resume {
  id: string;
  title: string;
  templateId: string;
  created_at: string;
}

const TEMPLATES = [
  {
    id: "1",
    name: "ATS Minimal",
    desc: "Clean layout for placements",
  },

  {
    id: "2",
    name: "Developer Pro",
    desc: "For SDE / backend roles",
  },
];

export default function Dashboard() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState("1");
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResumes() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/resumes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await res.json();
        if (!res.ok || !response.success) {
          throw new Error("Failed");
        }

        setResumes(
          response.data.map((r: any) => ({
            id: String(r.id),
            title: r.title,
            templateId: r.template_id,
            created_at: new Date(r.created_at).toLocaleDateString(),
          }))
        );
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    loadResumes();
  }, [router]);

  async function createResume(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/api/resumes", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title,
          template_id: selected,
          content: JSON.stringify({
            name: "",
            skills: [],
          }),
        }),
      });

      const response = await res.json();

      if (!res.ok || !response.success) {
        throw new Error(response.message);
      }

      /* refresh */

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      className="
min-h-screen
bg-[#0a0a0a]
text-white"
    >
      {/* grid */}

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
max-w-7xl
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
            <h1
              className="
text-4xl
font-semibold"
            >
              Dashboard
            </h1>

            <p
              className="
text-zinc-500
mt-3"
            >
              Manage resumes and templates
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/")}
              className="
px-4 py-2
rounded-xl
border border-zinc-800
hover:bg-zinc-900
hover:border-zinc-700
transition-all
duration-150
active:scale-[0.97]"
            >
              Home
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");

                router.push("/login");
              }}
              className="
px-4 py-2
rounded-xl
border border-zinc-800
hover:bg-zinc-900
hover:border-zinc-700
transition-all
duration-150
active:scale-[0.97]
flex gap-2 items-center"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* stats */}

        <div
          className="
grid md:grid-cols-3
gap-5 mt-10"
        >
          {[
            ["12", "Resumes"],
            ["94", "ATS Score"],
            ["7", "Interviews"],
          ].map((item) => (
            <div
              key={item[0]}
              className="
border border-zinc-900
rounded-xl
p-6
bg-[#0d0d0d]
hover:bg-[#111]
hover:border-zinc-800
transition-all"
            >
              <div
                className="
text-3xl
font-semibold"
              >
                {item[0]}
              </div>

              <div
                className="
text-sm
text-zinc-500
mt-2"
              >
                {item[1]}
              </div>
            </div>
          ))}
        </div>

        {/* BODY */}

        <div
          className="
grid
lg:grid-cols-[340px_1fr]
gap-8
mt-10"
        >
          {/* CREATE */}

          <div
            className="
border border-zinc-900
rounded-xl
bg-[#0d0d0d]
p-6 h-fit"
          >
            <h2
              className="
text-xl
font-medium"
            >
              New Resume
            </h2>

            <p
              className="
text-sm
text-zinc-500
mt-2"
            >
              Create tailored resumes
            </p>

            <form
              onSubmit={createResume}
              className="
mt-8
space-y-5"
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resume title"
                className="
w-full
px-4 py-4
rounded-xl
bg-transparent
border border-zinc-800
transition-all
focus:border-zinc-600
focus:ring-1
focus:ring-zinc-700
outline-none"
              />

              <div
                className="
space-y-3"
              >
                {TEMPLATES.map((tmpl) => (
                  <button
                    type="button"
                    key={tmpl.id}
                    onClick={() => setSelected(tmpl.id)}
                    className={`

w-full
text-left
rounded-xl
border
p-4
cursor-pointer
transition-all
duration-200
active:scale-[0.98]

${
  selected === tmpl.id
    ? `
border-white
bg-zinc-900
shadow-[0_0_0_1px_rgba(255,255,255,.05)]
`
    : `
border-zinc-800
hover:border-zinc-700
hover:bg-zinc-900/50
`
}

`}
                  >
                    <div>{tmpl.name}</div>

                    <div
                      className="
text-sm
text-zinc-500
mt-1"
                    >
                      {tmpl.desc}
                    </div>
                  </button>
                ))}
              </div>

              <button
                className="
w-full
py-4
rounded-xl
bg-white
text-black
font-medium
flex justify-center
gap-2

transition-all
duration-150

hover:opacity-90
hover:scale-[1.01]

active:scale-[0.98]
active:translate-y-[1px]
"
              >
                <Plus size={18} />
                Create Resume
              </button>
            </form>
          </div>

          {/* RESUMES */}

          <div>
            <div
              className="
flex justify-between
items-center"
            >
              <h2
                className="
text-2xl
font-medium"
              >
                Your resumes
              </h2>

              <span
                className="
text-sm
text-zinc-500"
              >
                {resumes.length}
                total
              </span>
            </div>

            {loading ? (
              <div
                className="
mt-10
text-zinc-500"
              >
                Loading...
              </div>
            ) : (
              <div
                className="
grid md:grid-cols-2
gap-5 mt-8"
              >
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="
border border-zinc-900
rounded-xl
bg-[#0d0d0d]
p-6

hover:border-zinc-700
hover:bg-[#111]

hover:-translate-y-1

transition-all
duration-200"
                  >
                    <div
                      className="
flex justify-between"
                    >
                      <div>
                        <h3
                          className="
font-medium"
                        >
                          {resume.title}
                        </h3>

                        <p
                          className="
text-sm
text-zinc-500
mt-2"
                        >
                          Template {resume.templateId}
                        </p>
                      </div>

                      <div
                        className="
text-xs
text-zinc-500"
                      >
                        {resume.created_at}
                      </div>
                    </div>

                    <div
                      className="
mt-10
flex justify-between
items-center"
                    >
                      <div
                        className="
flex gap-2
text-green-500
text-sm
items-center"
                      >
                        <FileText size={16} />
                        ATS Ready
                      </div>

                      <button
                        onClick={() => router.push(`/editor/${resume.id}`)}
                        className="
flex gap-2
items-center

hover:text-zinc-300

transition-all
duration-150

active:scale-[0.96]
"
                      >
                        Open
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
