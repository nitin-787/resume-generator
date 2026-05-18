"use client";

import { useState } from "react";

export default function TemplateSwitcher() {
  const [active, setActive] = useState("ATS Minimal");

  const templates = [
    {
      name: "ATS Minimal",
      desc: "Placements",
    },

    {
      name: "Modern",
      desc: "Startups",
    },

    {
      name: "Corporate",
      desc: "Professional",
    },

    {
      name: "Developer",
      desc: "SWE",
    },
  ];

  return (
    <div>
      {/* heading */}

      <div
        className="
flex justify-between
items-center
mb-5"
      >
        <div>
          <h2
            className="
font-medium"
          >
            Templates
          </h2>

          <p
            className="
text-sm
text-zinc-500
mt-1"
          >
            Switch layouts instantly
          </p>
        </div>

        <span
          className="
text-xs
text-zinc-500"
        >
          4 available
        </span>
      </div>

      {/* buttons */}

      <div
        className="
flex flex-wrap
gap-3"
      >
        {templates.map((template) => (
          <button
            key={template.name}
            onClick={() => setActive(template.name)}
            className={`

px-4 py-3

rounded-xl

border

transition-all
duration-150

active:scale-[0.97]

text-left

${
  active === template.name
    ? `
bg-white
text-black
border-white
shadow-sm
`
    : `
bg-transparent
border-zinc-800

hover:bg-zinc-900
hover:border-zinc-700
`
}

`}
          >
            <div
              className="
text-sm
font-medium"
            >
              {template.name}
            </div>

            <div
              className={`
text-xs mt-1

${active === template.name ? "text-black/60" : "text-zinc-500"}
`}
            >
              {template.desc}
            </div>
          </button>
        ))}
      </div>

      {/* selected */}

      <div
        className="
mt-5
text-sm
text-zinc-500"
      >
        Selected:
        <span
          className="
ml-2
text-white"
        >
          {active}
        </span>
      </div>
    </div>
  );
}
