"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Layout,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* grid */}

      <div
        className="
      fixed inset-0 opacity-[0.03]
      bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
      bg-[size:42px_42px]"
      />

      {/* ================= NAVBAR ================= */}

      <header
        className="
      border-b border-zinc-900
      sticky top-0
      bg-[#0a0a0a]/80
      backdrop-blur z-50"
      >
        <div
          className="
        max-w-7xl
        mx-auto
        px-8
        h-20
        flex justify-between items-center"
        >
          <button
            onClick={() => router.push("/")}
            className="text-3xl font-bold"
          >
            CV
            <span className="text-blue-500">CRAFT</span>
          </button>

          <div className="flex gap-5">
            <button
              onClick={() => router.push("/login")}
              className="
            text-zinc-400"
            >
              Sign in
            </button>

            <button
              onClick={() => router.push("/register")}
              className="
            px-5 py-2
            rounded-xl
            bg-white
            text-black"
            >
              Create account
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section
        className="
      max-w-7xl
      mx-auto
      px-8
      py-28
      grid
      lg:grid-cols-2
      gap-20
      items-center"
      >
        <div>
          <div
            className="
          text-sm
          text-zinc-500"
          >
            AI Resume Builder
          </div>

          <h1
            className="
          text-6xl
          font-semibold
          leading-tight
          tracking-tight
          mt-6"
          >
            Build resumes recruiters actually read.
          </h1>

          <p
            className="
          text-zinc-400
          mt-8
          leading-8
          max-w-lg"
          >
            Create ATS optimized resumes, tailor them for roles, generate AI
            bullet points and export recruiter-ready PDFs.
          </p>

          <div
            className="
          flex gap-4
          mt-12"
          >
            <button
              onClick={() => router.push("/register")}
              className="
            px-6 py-4
            rounded-xl
            bg-white
            text-black
            flex items-center gap-2"
            >
              Start free
              <ArrowRight size={18} />
            </button>

            <button
              className="
            px-6 py-4
            rounded-xl
            border border-zinc-800"
            >
              View templates
            </button>
          </div>

          {/* stats */}

          <div
            className="
          flex gap-14
          mt-16"
          >
            {[
              ["10K+", "Users"],
              ["92%", "ATS"],
              ["50+", "Templates"],
            ].map((item) => (
              <div key={item[0]}>
                <div
                  className="
                text-3xl font-semibold"
                >
                  {item[0]}
                </div>

                <div
                  className="
                text-sm
                text-zinc-500
                mt-2"
                >
                  {item[1]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* resume preview */}

        <div
          className="
        border border-zinc-900
        rounded-xl
        p-8
        bg-[#0d0d0d]"
        >
          <div
            className="
          flex justify-between"
          >
            <div>
              <div
                className="
              text-xl
              font-semibold"
              >
                Nitin Sharma
              </div>

              <div
                className="
              text-zinc-500
              mt-2"
              >
                Full Stack Developer
              </div>
            </div>

            <div
              className="
            text-green-500
            text-sm"
            >
              ATS 94/100
            </div>
          </div>

          <div className="mt-10">
            <div
              className="
            text-sm
            mb-4"
            >
              Experience
            </div>

            <div className="space-y-3">
              <div className="h-2 bg-zinc-800 rounded" />
              <div className="h-2 bg-zinc-800 rounded" />
              <div className="h-2 bg-zinc-800 rounded w-4/5" />
            </div>
          </div>

          <div className="mt-10">
            <div
              className="
            text-sm
            mb-4"
            >
              Skills
            </div>

            <div
              className="
            flex gap-2 flex-wrap"
            >
              {["React", "Next", "Node", "MongoDB"].map((skill) => (
                <span
                  key={skill}
                  className="
                px-3 py-1
                rounded-full
                bg-zinc-900
                text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section
        className="
      max-w-7xl
      mx-auto
      px-8
      py-28"
      >
        <h2
          className="
        text-4xl
        font-semibold"
        >
          Everything you need
        </h2>

        <div
          className="
        grid
        md:grid-cols-3
        gap-8
        mt-16"
        >
          {[
            {
              icon: <Sparkles size={18} />,
              title: "AI generation",
              desc: "Generate stronger bullet points.",
            },

            {
              icon: <Layout size={18} />,
              title: "Templates",
              desc: "Switch layouts instantly.",
            },

            {
              icon: <FileText size={18} />,
              title: "PDF export",
              desc: "Recruiter-ready exports.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
            border border-zinc-900
            rounded-xl
            p-6"
            >
              <div
                className="
              text-zinc-400"
              >
                {item.icon}
              </div>

              <h3
                className="
              mt-5
              font-medium"
              >
                {item.title}
              </h3>

              <p
                className="
              mt-3
              text-zinc-500
              leading-7"
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TEMPLATES ================= */}

      <section
        className="
      max-w-7xl
      mx-auto
      px-8
      py-28"
      >
        <h2
          className="
        text-4xl
        font-semibold"
        >
          Resume templates
        </h2>

        <div
          className="
        grid md:grid-cols-3
        gap-8
        mt-16"
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
            border border-zinc-900
            rounded-xl
            bg-[#0d0d0d]
            p-5"
            >
              <div
                className="
              h-[320px]
              rounded-lg
              bg-[#121212]
              p-5"
              >
                <div
                  className="
                h-5 w-32
                bg-zinc-700 rounded"
                />

                <div
                  className="
                mt-10 space-y-3"
                >
                  <div className="h-2 bg-zinc-800 rounded" />
                  <div className="h-2 bg-zinc-800 rounded" />
                  <div className="h-2 bg-zinc-800 rounded" />
                </div>
              </div>

              <div
                className="
              mt-4
              flex justify-between"
              >
                <span>Template {i}</span>

                <span
                  className="
                text-zinc-500 text-sm"
                >
                  ATS Friendly
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section
        className="
      max-w-5xl
      mx-auto
      px-8
      py-32
      text-center"
      >
        <h2
          className="
        text-5xl
        font-semibold
        leading-tight"
        >
          Start building better resumes today.
        </h2>

        <div
          className="
        mt-10
        flex justify-center gap-4"
        >
          <button
            onClick={() => router.push("/register")}
            className="
          px-6 py-4
          rounded-xl
          bg-white
          text-black"
          >
            Create account
          </button>

          <button
            onClick={() => router.push("/login")}
            className="
          px-6 py-4
          border border-zinc-800
          rounded-xl"
          >
            Sign in
          </button>
        </div>

        <div
          className="
        mt-12
        flex justify-center gap-8
        text-sm text-zinc-500"
        >
          {["Free ATS scoring", "50+ templates", "AI bullet generation"].map(
            (x) => (
              <div
                key={x}
                className="
            flex gap-2"
              >
                <CheckCircle2 size={16} />

                {x}
              </div>
            )
          )}
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer
        className="
border-t border-zinc-900
mt-24"
      >
        <div
          className="
  max-w-7xl
  mx-auto
  px-8
  py-14
  grid
  grid-cols-2
  md:grid-cols-4
  gap-12"
        >
          {/* brand */}

          <div className="col-span-2 md:col-span-1">
            <h2
              className="
      text-2xl
      font-bold"
            >
              CV
              <span className="text-blue-500">CRAFT</span>
            </h2>

            <p
              className="
      text-zinc-500
      mt-5
      leading-7
      max-w-xs"
            >
              Build ATS optimized resumes, generate AI bullet points and export
              recruiter-ready PDFs.
            </p>

            <div
              className="
      mt-6
      text-sm
      text-zinc-600"
            >
              Trusted by 10K+ developers
            </div>
          </div>

          {/* product */}

          <div>
            <h3 className="font-medium">Product</h3>

            <div
              className="
      mt-5
      flex flex-col gap-4
      text-zinc-500"
            >
              <button className="text-left">Templates</button>

              <button className="text-left">ATS Score</button>

              <button className="text-left">AI Generator</button>
            </div>
          </div>

          {/* company */}

          <div>
            <h3 className="font-medium">Company</h3>

            <div
              className="
      mt-5
      flex flex-col gap-4
      text-zinc-500"
            >
              <button className="text-left">About</button>

              <button className="text-left">Contact</button>

              <button className="text-left">Privacy</button>
            </div>
          </div>

          {/* account */}

          <div>
            <h3 className="font-medium">Account</h3>
            <div
              className="
mt-5
flex flex-col gap-4
text-zinc-500"
            >
              <span
                onClick={() => router.push("/login")}
                className="
  cursor-pointer
  hover:text-white
  transition"
              >
                Login
              </span>

              <span
                onClick={() => router.push("/register")}
                className="
  cursor-pointer
  hover:text-white
  transition"
              >
                Register
              </span>
            </div>
          </div>
        </div>

        {/* bottom */}

        <div
          className="
  border-t border-zinc-900"
        >
          <div
            className="
    max-w-7xl
    mx-auto
    px-8
    py-5
    flex flex-col
    md:flex-row
    justify-between
    items-center
    gap-4
    text-sm
    text-zinc-600"
          >
            <span>© {new Date().getFullYear()} CVCRAFT</span>

            <div
              className="
      flex gap-8"
            >
              <span>Made for developers</span>

              <span>India 🇮🇳</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
