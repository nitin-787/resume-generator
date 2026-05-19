"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
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
          <div
            className="
          w-full
          max-w-md"
          >
            {/* logo */}

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

            {/* heading */}

            <h1
              className="
            mt-20
            text-5xl
            font-semibold
            leading-tight"
            >
              Start building resumes recruiters notice.
            </h1>

            <p
              className="
            mt-8
            text-zinc-400
            leading-8"
            >
              Join thousands of students and developers creating ATS-friendly
              resumes tailored for jobs.
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

            {/* activity card */}

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
                    Average ATS Improvement
                  </div>

                  <div
                    className="
                  text-4xl
                  font-semibold
                  mt-2"
                  >
                    +31
                    <span
                      className="
                    text-zinc-500"
                    >
                      %
                    </span>
                  </div>
                </div>

                <div
                  className="
                text-green-500
                text-sm"
                >
                  Growth
                </div>
              </div>

              <div
                className="
              h-1.5
              rounded-full
              bg-zinc-900
              overflow-hidden
              mt-6"
              >
                <div
                  className="
                h-full
                w-[80%]
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
                <span>Better Keywords</span>

                <span>Higher Shortlists</span>
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
              Create account
            </h1>

            <p
              className="
            mt-4
            text-zinc-400"
            >
              Start building AI optimized resumes in minutes.
            </p>

            <form
              onSubmit={handleRegister}
              className="
            mt-12
            space-y-5"
            >
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
              w-full
              px-5 py-4
              rounded-xl
              bg-transparent
              border border-zinc-800"
                required
              />

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

              {/* benefits */}

              <div
                className="
              space-y-4
              pt-2"
              >
                {[
                  "Free ATS scoring",
                  "AI bullet generation",
                  "50+ resume templates",
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

              <button
                disabled={loading}
                className="
              w-full
              py-4
              rounded-xl
              bg-white
              text-black
              flex justify-center
              items-center gap-2
              mt-6"
              >
                {loading ? "Creating account..." : "Create account"}

                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            {/* footer */}

            <div
              className="
            mt-14
            pt-8
            border-t border-zinc-900
            text-sm
            text-zinc-500"
            >
              Already registered?
              <button
                onClick={() => router.push("/login")}
                className="
              ml-2
              text-white"
              >
                Sign in
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
