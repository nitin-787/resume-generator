"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface ResumeData {
  id: string;
  title: string;
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
  const pathParams = useParams();

  // ID ko nikal kar string mein convert kiya
  const targetId = pathParams?.id ? String(pathParams.id) : "";

  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Ek dum hardcore fallback dictionary banayi loop ke andar hi
    const localMock: Record<string, ResumeData> = {
      "1": {
        id: "1",
        title: "Backend Engineer Resume",
        content: {
          name: "Nitin",
          email: "nitin@gmail.com",
          role: "Golang Developer",
          skills: ["Go", "Gin", "PostgreSQL", "Docker"],
          experience: "Built a high-performance resume generator using Go.",
        },
      },
      "2": {
        id: "2",
        title: "Frontend Intern Resume",
        content: {
          name: "Nitin",
          email: "nitin@gmail.com",
          role: "Frontend Engineer",
          skills: ["React", "Next.js", "TypeScript", "Tailwind"],
          experience:
            "Developed interactive dashboards with Next.js App Router.",
        },
      },
    };

    console.log("Effect ke andar targetId:", targetId);

    if (targetId) {
      // Agar Next.js URL se ":1" ya kuch ganda la raha h toh usko saaf kiya
      const cleanId = targetId.replace(":", "");
      console.log("Cleaned ID for matching:", cleanId);

      const data = localMock[cleanId];
      if (data) {
        setResume(data);
      } else {
        setResume(null);
      }
      setLoading(false);
    }
  }, [targetId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-sm tracking-wider animate-pulse text-gray-400">
          Loading Workspace...
        </p>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center space-y-4">
        <p className="text-red-400 font-medium">404: Resume Not Found bhai!</p>
        <p className="text-xs text-gray-500">
          URL se final aayi hui ID yeh hai:{" "}
          <span className="text-gray-300">{targetId}</span>
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-900 border border-gray-800 text-xs px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Navigation */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
          <div>
            <span
              onClick={() => router.push("/dashboard")}
              className="text-xs text-gray-500 cursor-pointer hover:underline"
            >
              ← Dashboard
            </span>
            <h1 className="text-xl font-bold mt-1">{resume.title}</h1>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded font-medium transition">
            Save Changes
          </button>
        </div>

        {/* Editor Workspace Split View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Panel: Form Inputs */}
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
              <h2 className="text-gray-400 uppercase tracking-wider text-xs font-semibold">
                Edit Details
              </h2>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={resume.content.name}
                  onChange={(e) =>
                    setResume({
                      ...resume,
                      content: { ...resume.content, name: e.target.value },
                    })
                  }
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Target Role
                </label>
                <input
                  type="text"
                  value={resume.content.role}
                  onChange={(e) =>
                    setResume({
                      ...resume,
                      content: { ...resume.content, role: e.target.value },
                    })
                  }
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Live Preview Sheet */}
          <div className="bg-white text-black p-8 rounded-lg shadow-2xl min-h-[500px] flex flex-col justify-between border border-gray-200">
            <div>
              <h1 className="text-2xl font-bold border-b-2 border-gray-900 pb-2 uppercase tracking-wide">
                {resume.content.name}
              </h1>
              <p className="text-sm font-semibold text-gray-600 mt-1">
                {resume.content.role}
              </p>
              <p className="text-xs text-gray-500">{resume.content.email}</p>

              <div className="mt-6">
                <h3 className="font-bold border-b border-gray-300 uppercase text-xs tracking-wider mb-2">
                  Technical Skills
                </h3>
                <p className="text-sm text-gray-800">
                  {resume.content.skills.join(", ")}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="font-bold border-b border-gray-300 uppercase text-xs tracking-wider mb-2">
                  Experience
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {resume.content.experience}
                </p>
              </div>
            </div>

            <div className="text-center text-[10px] text-gray-400 border-t pt-4 border-gray-100 mt-8">
              Generated via SaaS Resume Builder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
