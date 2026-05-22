import ContactSection from "./ContactSection";
import SkillSection from "./SkillSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectSection";
import EducationSection from "./EducationSection";
import TemplateSwitcher from "./TemplateSwitcher";
import SummarySection from "./SummarySection";

export default function ResumeForm({ resume, setResume }: any) {
  /* stop all undefined crashes */

  if (!resume) {
    return (
      <div
        className="
text-zinc-500
p-10"
      >
        Loading editor...
      </div>
    );
  }

  return (
    <div
      className="
space-y-6"
    >
      <TemplateSwitcher />

      <ContactSection resume={resume} setResume={setResume} />

      <SummarySection resume={resume} setResume={setResume} />
      <SkillSection resume={resume} setResume={setResume} />

      <ExperienceSection resume={resume} setResume={setResume} />

      <ProjectsSection resume={resume} setResume={setResume} />

      <EducationSection resume={resume} setResume={setResume} />
    </div>
  );
}
