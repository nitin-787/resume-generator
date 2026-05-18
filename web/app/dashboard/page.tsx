"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Dashboard ke liye Type Interfaces
interface Resume {
  id: string;
  title: string;
  created_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState("");

  // 1. Mock Database se Resumes Fetch karne ka logic (Abhi local state se test kr rhe)
  const fetchResumes = async () => {
    setFetchLoading(true);
    try {
      // Future mein yahan `resumeService.getAllResumes()` call hoga
      // Abhi mock data set kar rahe hain dashboard UI test karne ke liye
      const mockList: Resume[] = [
        { id: "1", title: "Backend Engineer Resume", created_at: "2026-05-18" },
        { id: "2", title: "Frontend Intern Resume", created_at: "2026-05-18" },
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

  // 2. Naya Resume Create karne ka logic
  const handleCreateResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert("Title daalna zaroori hai bhai!");

    setLoading(true);
    setMessage("");

    try {
      // Future mein yahan `resumeService.createResume` call hoga
      // Abhi local test behavior check karne ke liye state update kar rhe
      const newResume: Resume = {
        id: (resumes.length + 1).toString(),
        title: title,
        created_at: new Date().toISOString().split("T")[0],
      };

      setResumes([...resumes, newResume]);
      setMessage("Resume ban gaya successfully (Mock)!");
      setTitle(""); // Form clear
    } catch (error: any) {
      setMessage("Kuch phat gaya!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="border-b border-gray-800 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Apne saare resumes yahan manage karo.
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

        {/* Workspace Layout Split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Panel: Create Form */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Nanya Resume Banayein
            </h2>
            <form onSubmit={handleCreateResume} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Resume Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., SDE Intern Role"
                  className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium p-2.5 rounded transition disabled:bg-gray-800 disabled:text-gray-500"
              >
                {loading ? "Creating..." : "Create 🚀"}
              </button>
            </form>

            {message && (
              <p className="mt-4 text-xs text-center text-blue-400 bg-blue-950/30 p-2 rounded border border-blue-900/50">
                {message}
              </p>
            )}
          </div>

          {/* Right Panel: Resumes Display Grid */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Aapke Resumes</h2>

            {fetchLoading ? (
              <p className="text-sm text-gray-500 animate-pulse">
                Loading your resumes...
              </p>
            ) : resumes.length === 0 ? (
              <div className="border border-dashed border-gray-800 p-8 rounded-lg text-center text-gray-500 text-sm">
                Koi resume nahi mila bhai. Pehla resume create karo!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="bg-gray-900 border border-gray-800 p-4 rounded-lg hover:border-gray-700 transition flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-medium text-gray-200">
                        {resume.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
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
