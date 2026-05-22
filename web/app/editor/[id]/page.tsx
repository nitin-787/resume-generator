"use client";

import { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EditorNavbar from "@/components/editor/EditorNavbar";
import ResumeForm from "@/components/editor/ResumeForm";
import ResumePreview from "@/components/editor/ResumePreview";
import EditorStats from "@/components/editor/EditorStats";
import { mockResume } from "@/data/mockResume";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [resume, setResume] = useState(mockResume);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadResume() {
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
          throw new Error("Failed to load resume");
        }

        const current = response.data.find(
          (r: any) => String(r.id) === String(id)
        );

        if (current) {
          const content = JSON.parse(current.content);
          setResume({
            ...mockResume,
            ...content,

            skills: {
              ...mockResume.skills,
              ...content.skills,
            },

            contact: {
              ...mockResume.contact,
              ...content.contact,
            },

            summary: content.summary || "",
          });
        }
      } catch (err) {
        console.error(err);
        setResume(mockResume);
      }
      setLoaded(true);
    }

    loadResume();
  }, [id, router]);

  useEffect(() => {
    if (!loaded || !resume) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSaving(true);

        const token = localStorage.getItem("token");
        await fetch(`http://localhost:8080/api/resumes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: resume.contact?.name || "Resume",
            content: JSON.stringify(resume),
          }),
        });

        setSaving(false);
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [resume, id, loaded]);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex justify-center items-center font-medium">
        Loading Workspace...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-600">
      <EditorNavbar resume={resume} resumeId={id} saving={saving} />

      <div className="max-w-[1850px] mx-auto px-8 py-8">
        {/* <EditorStats resume={resume} /> */}

        <div className="grid grid-cols-[820px_820px] gap-12 justify-center mt-8">
          <ResumeForm resume={resume} setResume={setResume} />
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}
