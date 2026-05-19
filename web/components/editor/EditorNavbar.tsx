"use client";

import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditorNavbar() {
  const router = useRouter();

  async function exportPDF() {
    const element = document.getElementById("resume-preview");

    if (!element) return;

    try {
      /* import only in browser */

      const html2pdf = (await import("html2pdf.js")).default;

      await html2pdf()
        .set({
          margin: 0,

          filename: "resume.pdf",

          image: {
            type: "jpeg",
            quality: 1,
          },

          html2canvas: {
            scale: 2,

            backgroundColor: "#ffffff",
          },

          jsPDF: {
            unit: "mm",

            format: "a4",

            orientation: "portrait",
          },
        })

        .from(element)

        .save();
    } catch (err) {
      console.error(err);

      alert("PDF export failed");
    }
  }

  return (
    <header
      className="
sticky
top-0
z-50

bg-[#0a0a0a]/80

backdrop-blur

border-b border-zinc-900"
    >
      <div
        className="
h-[72px]

px-8

flex
justify-between
items-center"
      >
        {/* LEFT */}

        <div
          className="
flex
items-center
gap-5"
        >
          <button
            onClick={() => router.push("/dashboard")}
            className="
text-zinc-500
hover:text-white

transition-all"
          >
            <ArrowLeft size={16} />
          </button>

          <h1
            className="
text-xl
font-semibold"
          >
            Resume Editor
          </h1>
        </div>

        {/* RIGHT */}

        <button
          onClick={exportPDF}
          className="
px-4 py-2

rounded-lg

border border-zinc-800

hover:bg-zinc-900

transition-all

active:scale-[0.97]

flex gap-2
items-center"
        >
          <Download size={16} />
          Export PDF
        </button>
      </div>
    </header>
  );
}
