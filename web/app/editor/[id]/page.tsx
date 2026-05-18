"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

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
  const pathParams = useParams();
  const targetId = pathParams?.id ? String(pathParams.id) : "";

  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiRole, setAiRole] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const localMock: Record<string, ResumeData> = {
      "1": {
        id: "1",
        title: "Backend Engineer Resume",
        templateId: "1",
        content: {
          name: "Nitin",
          email: "nitin@backend.com",
          role: "Golang Developer",
          skills: ["Go", "Gin", "PostgreSQL", "Docker", "Redis"],
          experience:
            "• Built high-performance resume generator backend using Go.\n• Optimized database queries decreasing load times by 40%.",
        },
      },
      "2": {
        id: "2",
        title: "Frontend Intern Resume",
        templateId: "2",
        content: {
          name: "Nitin Kumar",
          email: "nitin@frontend.com",
          role: "Frontend Engineer",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
          experience:
            "• Developed interactive responsive dashboards with Next.js App Router.\n• Implemented state locking mechanism bypassing hydration bugs.",
        },
      },
    };

    if (targetId) {
      const cleanId = targetId.replace(":", "");
      const data = localMock[cleanId];
      if (data) {
        setResume(data);
      } else {
        setResume(null);
      }
      setLoading(false);
    }
  }, [targetId]);

  // 👉 Modern Lab/Oklch Proof PDF Downloader
  const handleDownloadPDF = async () => {
    if (!resume || typeof window === "undefined") return;
    setPdfLoading(true);

    try {
      // Dynamic imports for modern canvas packages
      const { toPng } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("resume-pdf-area");
      if (!element) {
        alert("Resume sheet nahi mili bhai!");
        setPdfLoading(false);
        return;
      }

      // 1. Convert HTML element to high-quality PNG (Bypasses CSS lab() engine crashes)
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2, // Retains extreme crisp sharpness
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      });

      // 2. Create standard professional A4 PDF page setup
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // Standard A4 width in mm
      const pageHeight = 295; // Standard A4 height in mm
      const imgHeight = (element.offsetHeight * imgWidth) / element.offsetWidth;

      let heightLeft = imgHeight;
      let position = 0;

      // 3. Inject image snapshot into clean document vector
      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST",
      );
      heightLeft -= pageHeight;

      // Multi-page handling guard if experience overflows
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          dataUrl,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST",
        );
        heightLeft -= pageHeight;
      }

      // 4. Trigger download
      pdf.save(`${resume.content.name.replace(/\s+/g, "_")}_Resume.pdf`);
    } catch (err) {
      console.error("New PDF engine failed:", err);
      alert("PDF download failed inside modern canvas handler!");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleAiGenerate = () => {
    if (!aiRole) return alert("Pehle koi role toh daalo bhai!");
    setAiLoading(true);
    setTimeout(() => {
      let generatedPoints = "";
      const roleLower = aiRole.toLowerCase();

      if (roleLower.includes("backend") || roleLower.includes("go")) {
        generatedPoints =
          "• Developed scalable RESTful APIs using Go, improving response times by 30%.\n• Containerized application workflows using Docker.";
      } else {
        generatedPoints =
          "• Built responsive user interfaces using Next.js and Tailwind CSS.\n• Integrated REST APIs seamlessly.";
      }

      if (resume) {
        setResume({
          ...resume,
          content: {
            ...resume.content,
            experience: resume.content.experience + "\n" + generatedPoints,
          },
        });
      }
      setAiLoading(false);
      setAiRole("");
    }, 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading Workspace...
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center space-y-4">
        <p className="text-red-400 font-medium">404: Resume Not Found bhai!</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-900 border border-gray-800 text-xs px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation Controls */}
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
          <div className="flex items-center gap-3">
            <span className="text-[11px] bg-gray-900 border border-gray-800 px-2.5 py-1 rounded text-purple-400 font-medium">
              Mode: {resume.templateId === "1" ? "Classic" : "Tech Pro Grid"}
            </span>

            <button
              onClick={handleDownloadPDF}
              disabled={pdfLoading}
              className="bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded font-medium transition disabled:text-gray-600"
            >
              {pdfLoading ? "Generating..." : "Download PDF 📄"}
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded font-medium transition">
              Save Changes
            </button>
          </div>
        </div>

        {/* Workspace Split View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Inputs Panel */}
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
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-sm text-white focus:outline-none"
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
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Experience
                </label>
                <textarea
                  rows={5}
                  value={resume.content.experience}
                  onChange={(e) =>
                    setResume({
                      ...resume,
                      content: {
                        ...resume.content,
                        experience: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-sm text-white focus:outline-none font-mono text-xs whitespace-pre-line resize-none"
                />
              </div>
            </div>

            {/* AI Writer */}
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
              <h2 className="text-purple-400 uppercase tracking-wider text-xs font-semibold">
                ✨ AI Resume Writer
              </h2>
              <input
                type="text"
                value={aiRole}
                onChange={(e) => setAiRole(e.target.value)}
                placeholder="e.g., Go Developer"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-sm text-white focus:outline-none"
              />
              <button
                onClick={handleAiGenerate}
                disabled={aiLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium p-2.5 rounded transition disabled:bg-gray-800"
              >
                {aiLoading ? "AI thinking..." : "Generate with AI 🚀"}
              </button>
            </div>
          </div>

          {/* LIVE PREVIEW SHEET (Target Area) 🎨 */}
          <div
            id="resume-pdf-area"
            className="bg-white text-black p-8 rounded-lg shadow-2xl min-h-[550px] flex flex-col justify-between border border-gray-200"
          >
            {/* Template 1 */}
            {resume.templateId === "1" && (
              <div className="space-y-6">
                <div className="border-b-2 border-gray-900 pb-2 text-center">
                  <h1 className="text-2xl font-bold uppercase tracking-wide">
                    {resume.content.name}
                  </h1>
                  <p className="text-xs font-semibold text-gray-600 mt-1">
                    {resume.content.role} | {resume.content.email}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold border-b border-gray-300 uppercase text-xs tracking-wider mb-2">
                    Technical Skills
                  </h3>
                  <p className="text-sm text-gray-800">
                    {resume.content.skills.join(", ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold border-b border-gray-300 uppercase text-xs tracking-wider mb-2">
                    Professional Experience
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-serif">
                    {resume.content.experience}
                  </p>
                </div>
              </div>
            )}

            {/* Template 2 */}
            {resume.templateId === "2" && (
              <div className="space-y-6">
                <div className="bg-slate-900 text-white p-4 rounded -mx-4 -mt-4">
                  <h1 className="text-2xl font-extrabold tracking-tight uppercase">
                    {resume.content.name}
                  </h1>
                  <p className="text-xs text-blue-400 font-mono mt-0.5">
                    {resume.content.role} // {resume.content.email}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="col-span-1 border-r border-gray-200 pr-3 space-y-2">
                    <h3 className="font-extrabold text-xs uppercase tracking-wide text-gray-900">
                      Core Tech
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {resume.content.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-700 border border-gray-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <h3 className="font-extrabold text-xs uppercase tracking-wide text-gray-900 border-b pb-1">
                      Projects & Experience
                    </h3>
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line font-mono">
                      {resume.content.experience}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center text-[10px] text-gray-400 border-t pt-4 border-gray-100 mt-8">
              Generated via SaaS Resume Builder Layout Engine
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
