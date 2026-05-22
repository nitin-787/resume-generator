export default function SummarySection({ resume, setResume }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-zinc-900 rounded-xl p-6">
      <h2 className="font-medium text-white">Professional Summary</h2>
      <p className="mt-2 text-sm text-zinc-500">
        Short intro for recruiters and ATS systems
      </p>

      <textarea
        value={resume.summary || ""}
        onChange={(e) =>
          setResume({
            ...resume,
            summary: e.target.value,
          })
        }
        rows={5}
        placeholder="Write a short summary about yourself..."
        className="mt-5 w-full rounded-xl border border-zinc-800 bg-transparent p-4 text-sm outline-none resize-none focus:border-zinc-700"
      />
    </div>
  );
}
