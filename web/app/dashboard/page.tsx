"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Resume {
  id: string;
  title: string;
  templateId: string;
  created_at: string;
}

// Static Templates List for Selection
const AVAILABLE_TEMPLATES = [
  {
    id: "1",
    name: "Classic Minimalist",
    desc: "Clean black & white design for SDE roles.",
    color: "bg-slate-900",
  },
  {
    id: "2",
    name: "Tech Pro Grid",
    desc: "Two-column modern layout for backend engineers.",
    color: "bg-indigo-950",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("1"); // Default Template '1'
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchResumes = async () => {
    setFetchLoading(true);
    try {
      const mockList: Resume[] = [
        {
          id: "1",
          title: "Backend Engineer Resume",
          templateId: "1",
          created_at: "2026-05-18",
        },
        {
          id: "2",
          title: "Frontend Intern Resume",
          templateId: "2",
          created_at: "2026-05-18",
        },
      ];
      setResumes(mockList);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreateResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert("Title daalna zaroori hai bhai!");

    setLoading(true);
    setMessage("");

    try {
      const newResume: Resume = {
        id: (resumes.length + 1).toString(),
        title: title,
        templateId: selectedTemplate, // Chosen template goes here
        created_at: new Date().toISOString().split("T")[0],
      };

      setResumes([...resumes, newResume]);
      setMessage(`Resume ban gaya! Template ID: ${selectedTemplate} use ki h.`);
      setTitle("");
    } catch (error: any) {
      setMessage("Kuch phat gaya!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-gray-800 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Apne saare resumes aur templates yahan manage karo.
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="text-xs bg-gray-900 border border-gray-800 hover:bg-gray-800 px-3 py-1.5 rounded text-gray-400 transition"
          >
            Logout
          </button>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Panel: Form with Template Selector */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg h-fit space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Nanya Resume</h2>
              <p className="text-xs text-gray-500">
                Title aur design choose karo.
              </p>
            </div>

            <form onSubmit={handleCreateResume} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Resume Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Golang Backend Role"
                  className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Template Radio Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Choose Layout Template
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {AVAILABLE_TEMPLATES.map((tmpl) => (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`p-3 rounded border text-left cursor-pointer transition ${
                        selectedTemplate === tmpl.id
                          ? "border-blue-500 bg-blue-950/20"
                          : "border-gray-800 bg-gray-950/40 hover:border-gray-700"
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-200">
                        {tmpl.name}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {tmpl.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium p-2.5 rounded transition disabled:bg-gray-800"
              >
                {loading ? "Creating..." : "Create Resume 🚀"}
              </button>
            </form>

            {message && (
              <p className="text-xs text-center text-blue-400 bg-blue-950/30 p-2 rounded border border-blue-900/50">
                {message}
              </p>
            )}
          </div>

          {/* Right Panel: Resumes Display Grid */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Aapke Resumes</h2>

            {fetchLoading ? (
              <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
            ) : resumes.length === 0 ? (
              <div className="border border-dashed border-gray-800 p-8 rounded-lg text-center text-gray-500 text-sm">
                Koi resume nahi mila bhai.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="bg-gray-900 border border-gray-800 p-4 rounded-lg hover:border-gray-700 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-200">
                          {resume.title}
                        </h3>
                        <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400 border border-gray-700">
                          Template {resume.templateId}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        ID: {resume.id} | Date: {resume.created_at}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-800 flex justify-end">
                      <button
                        onClick={() => router.push(`/editor/${resume.id}`)}
                        className="text-xs text-blue-500 font-medium hover:underline bg-transparent border-none cursor-pointer"
                      >
                        Open Editor →
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
