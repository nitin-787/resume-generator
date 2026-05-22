export default function ContactSection({ resume, setResume }: any) {
  function update(field: string, value: string) {
    setResume({
      ...resume,
      contact: {
        ...resume.contact,
        [field]: value,
      },
    });
  }

  return (
    <div className="bg-[#0d0d0d] border border-zinc-900 rounded-xl p-6">
      <h2 className="mb-5 font-medium">Contact</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          value={resume.contact?.name || ""}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Name"
          className="input"
        />

        <input
          value={resume.contact?.email || ""}
          onChange={(e) => update("email", e.target.value)}
          placeholder="Email"
          className="input"
        />

        <input
          value={resume.contact?.phone || ""}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="Phone"
          className="input"
        />

        <input
          value={resume.contact?.github || ""}
          onChange={(e) => update("github", e.target.value)}
          placeholder="Github URL"
          className="input"
        />

        <input
          value={resume.contact?.linkedin || ""}
          onChange={(e) => update("linkedin", e.target.value)}
          placeholder="LinkedIn URL"
          className="input"
        />
      </div>
    </div>
  );
}
