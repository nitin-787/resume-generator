export default function ContactSection({ resume, setResume }: any) {
  return (
    <div
      className="
bg-[#0d0d0d]

border border-zinc-900

rounded-xl

p-6"
    >
      <h2
        className="
mb-5"
      >
        Contact
      </h2>

      <div
        className="
grid
grid-cols-2
gap-4"
      >
        <input
          value={resume.contact.name}
          onChange={(e) =>
            setResume({
              ...resume,

              contact: {
                ...resume.contact,

                name: e.target.value,
              },
            })
          }
          placeholder="
Name"
          className="
input"
        />

        <input
          value={resume.contact.email}
          onChange={(e) =>
            setResume({
              ...resume,

              contact: {
                ...resume.contact,

                email: e.target.value,
              },
            })
          }
          placeholder="
Email"
          className="
input"
        />
      </div>
    </div>
  );
}
