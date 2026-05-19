"use client";

import { useEffect, useState } from "react";

import EditorNavbar from "@/components/editor/EditorNavbar";
import ResumeForm from "@/components/editor/ResumeForm";
import ResumePreview from "@/components/editor/ResumePreview";
import EditorStats from "@/components/editor/EditorStats";

import { mockResume } from "@/data/mockResume";

export default function Page() {
  const [resume, setResume] = useState(mockResume);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("resume");

      if (saved) {
        const parsed = JSON.parse(saved);

        /* merge with defaults */

        setResume({
          ...mockResume,

          ...parsed,

          contact: {
            ...mockResume.contact,

            ...parsed.contact,
          },

          skills: {
            ...mockResume.skills,

            ...parsed.skills,
          },
        });
      }
    } catch {
      localStorage.removeItem("resume");

      setResume(mockResume);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "resume",

      JSON.stringify(resume)
    );
  }, [resume, loaded]);

  if (!loaded) {
    return (
      <div
        className="
min-h-screen
bg-[#0a0a0a]
text-white

flex
justify-center
items-center"
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
      <EditorNavbar />

      <div
        className="
max-w-[1850px]
mx-auto
px-8
py-8"
      >
        <EditorStats resume={resume} />

        <div
          className="
grid
grid-cols-[820px_820px]

gap-12

justify-center

mt-8"
        >
          <ResumeForm resume={resume} setResume={setResume} />

          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}
