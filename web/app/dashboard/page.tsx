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
        throw new Error();
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteResume(id: string) {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:8080/api/resumes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.error);
      }

      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-8 py-10">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-8">
          <div>
            <h1 className="text-4xl font-semibold">Dashboard</h1>
            <p className="mt-3 text-zinc-500">Manage resumes</p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="flex gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-900"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* BODY */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[340px_1fr]">
          {/* CREATE SIDEBAR */}
          <div className="h-fit rounded-xl border border-zinc-900 p-6 bg-[#0d0d0d]/40">
            <form onSubmit={createResume} className="space-y-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resume title"
                className="w-full rounded-xl border border-zinc-800 bg-transparent p-4 text-sm outline-none focus:border-zinc-700"
              />

              <div className="space-y-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelected(t.id)}
                    className={`w-full text-left rounded-xl border p-4 transition-all ${
                      selected === t.id
                        ? "border-white bg-white/5"
                        : "border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="flex w-full justify-center gap-2 rounded-xl bg-white p-4 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                <Plus size={18} />
                Create Resume
              </button>
            </form>
          </div>

          {/* RESUMES LIST */}
          <div>
            {loading ? (
              <div className="text-zinc-500 text-sm">Loading...</div>
            ) : resumes.length === 0 ? (
              <div className="text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl p-12 text-center">
                No resumes found. Create your first one on the left sidebar!
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="rounded-xl border border-zinc-900 bg-[#0d0d0d]/30 p-6 hover:border-zinc-800 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-zinc-100">
                      {resume.title}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-500">
                      Created: {resume.created_at}
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-medium text-green-500">
                        <FileText size={14} />
                        ATS Ready
                      </div>

                      <div className="flex gap-4 text-sm font-medium">
                        <button
                          onClick={() => deleteResume(resume.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => router.push(`/editor/${resume.id}`)}
                          className="flex items-center gap-1 text-zinc-300 hover:text-white"
                        >
                          Open
                          <ArrowRight size={14} />
                        </button>
                      </div>
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
