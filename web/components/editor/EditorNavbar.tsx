"use client";

import { ArrowLeft, Download, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditorNavbar({ resume, resumeId }: any) {
  const router = useRouter();

  async function saveResume() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8080/api/resumes/${resumeId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: resume.contact.name || "My Resume",
          content: JSON.stringify({
            name: resume.contact.name,
            skills: resume.skills.languages
              .split(",")
              .map((s: string) => s.trim()),
          }),
        }),
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.error);
      }

      alert("Saved ✓");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  }

  async function exportPDF() {
    const original = document.getElementById("resume-preview");
    if (!original) return;

    const clone = original.cloneNode(true) as HTMLElement;
    clone.style.background = "#fff";
    clone.style.color = "#000";
    clone.style.position = "fixed";
    clone.style.left = "-99999px";
    clone.style.top = "0";

    /* REMOVE TAILWIND COLORS */
    clone.querySelectorAll("*").forEach((el: any) => {
      el.style.color = "#000";
      el.style.backgroundColor = "transparent";
      el.style.borderColor = "#ccc";
      el.style.boxShadow = "none";
    });

    document.body.appendChild(clone);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(clone, {
        backgroundColor: "#fff",
        scale: 2,
        useCORS: true,
      });

      const jsPDF = (await import("jspdf")).default;
      const pdf = new jsPDF("p", "mm", "a4");

      const img = canvas.toDataURL("image/png");
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");

      document.body.removeChild(clone);
    } catch (err) {
      console.error(err);
      alert("PDF failed");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 bg-[#0a0a0a]/80 backdrop-blur-sm">
      <div className="flex h-[72px] items-center justify-between px-8">
        <div className="flex items-center gap-5">
          <button
            onClick={() => router.push("/dashboard")}
            className="hover:text-zinc-400"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="font-semibold text-white">Resume Editor</h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={saveResume}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-900"
          >
            <Save size={16} />
            Save
          </button>

          <button
            onClick={exportPDF}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-900"
          >
            <Download size={16} />
            PDF
          </button>
        </div>
      </div>
    </header>
  );
}
