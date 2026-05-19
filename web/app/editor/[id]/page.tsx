"use client";

import { useEffect, useState } from "react";
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

          /*
          Backend currently stores:
          {
            name:"Nitin",
            skills:["Go","C++"]
          }

          Frontend expects:
          contact:{}
          skills:{}
          projects:[]
          education:[]
          */

          setResume({
            ...mockResume,

            contact: {
              ...mockResume.contact,

              name: content.name || mockResume.contact.name,
            },

            skills: {
              ...mockResume.skills,

              languages: Array.isArray(content.skills)
                ? content.skills.join(", ")
                : mockResume.skills.languages,
            },

            /*
            keep mock data until backend
            stores full structure
            */

            projects: mockResume.projects,

            education: mockResume.education,

            experience: mockResume.experience,
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
      <EditorNavbar resume={resume} resumeId={id} />

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
