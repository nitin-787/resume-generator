"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("token", "mock_token");
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* subtle grid */}

      <div
        className="
      fixed inset-0 opacity-[0.03]
      bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
      bg-[size:42px_42px]"
      />

      <div
        className="
      relative
      min-h-screen
      grid
      lg:grid-cols-2"
      >
        {/* ================= LEFT ================= */}

        <section
          className="
        hidden
        lg:flex
        justify-center
        items-center
        border-r border-zinc-900
        px-8"
        >
          {/* same width as right */}

          <div
            className="
          w-full
          max-w-md"
          >
            {/* logo */}

            <div>
              <button
                onClick={() => router.push("/")}
                className="
              text-3xl
              font-bold"
              >
                CV
                <span className="text-blue-500">CRAFT</span>
              </button>

              <div
                className="
              text-sm
              text-zinc-500
              mt-2"
              >
                AI Resume Builder
              </div>
            </div>

            {/* heading */}

            <h1
              className="
            mt-20
            text-5xl
            font-semibold
            leading-tight
            tracking-tight"
            >
              Build resumes recruiters actually read.
            </h1>

            <p
              className="
            mt-8
            text-zinc-400
            leading-8"
            >
              Create ATS optimized resumes, tailor them for roles and export
              recruiter-ready PDFs.
            </p>

            {/* stats */}

            <div
              className="
            flex gap-10
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
                  text-3xl
                  font-semibold"
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

            {/* ATS card */}

            <div
              className="
            mt-16
            border border-zinc-900
            rounded-xl
            bg-[#0d0d0d]
            p-6"
            >
              <div
                className="
              flex justify-between"
              >
                <div>
                  <div
                    className="
                  text-xs
                  text-zinc-500"
                  >
                    Resume Score
                  </div>

                  <div
                    className="
                  text-4xl
                  font-semibold
                  mt-2"
                  >
                    94
                    <span
                      className="
                    text-zinc-500"
                    >
                      /100
                    </span>
                  </div>
                </div>

                <div
                  className="
                text-green-500
                text-sm"
                >
                  +18%
                </div>
              </div>

              <div
                className="
              h-1.5
              rounded-full
              overflow-hidden
              bg-zinc-900
              mt-6"
              >
                <div
                  className="
                h-full
                w-[94%]
                bg-blue-500"
                />
              </div>

              <div
                className="
              flex justify-between
              mt-5
              text-xs
              text-zinc-500"
              >
                <span>ATS Optimized</span>

                <span>Recruiter Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RIGHT ================= */}

        <section
          className="
        flex
        justify-center
        items-center
        px-8"
        >
          <div
            className="
          w-full
          max-w-md"
          >
            <h1
              className="
            text-5xl
            font-semibold"
            >
              Welcome back
            </h1>

            <p
              className="
            mt-4
            text-zinc-400"
            >
              Sign in to access resumes, templates and ATS reports.
            </p>

            <form
              onSubmit={handleLogin}
              className="
            mt-12
            space-y-5"
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
              w-full
              px-5 py-4
              rounded-xl
              bg-transparent
              border border-zinc-800"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
              w-full
              px-5 py-4
              rounded-xl
              bg-transparent
              border border-zinc-800"
                required
              />

              <div
                className="
              flex justify-between
              text-sm"
              >
                <label
                  className="
                text-zinc-500"
                >
                  <input type="checkbox" />

                  <span className="ml-2">Remember me</span>
                </label>

                <button
                  className="
                text-zinc-500"
                >
                  Forgot password
                </button>
              </div>

              <button
                disabled={loading}
                className="
              w-full
              py-4
              rounded-xl
              bg-white
              text-black
              flex justify-center
              items-center gap-2"
              >
                {loading ? "Signing in..." : "Continue"}

                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div
              className="
            mt-12
            space-y-4"
            >
              {[
                "ATS optimization included",
                "Secure cloud storage",
                "50+ templates available",
              ].map((item) => (
                <div
                  key={item}
                  className="
                flex gap-3
                text-sm
                text-zinc-500"
                >
                  <CheckCircle2 size={16} />

                  {item}
                </div>
              ))}
            </div>

            <div
              className="
            mt-14
            pt-8
            border-t border-zinc-900
            text-sm
            text-zinc-500"
            >
              New here?
              <button
                onClick={() => router.push("/register")}
                className="
              ml-2
              text-white"
              >
                Create account
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
