import { ResumeData } from "@/types/resume";

export const mockResume: ResumeData = {
  contact: {
    name: "User Name",

    phone: "+91 1234567890",

    email: "nitin@gmail.com",

    github: "github.com/nitin-787",

    linkedin: "linkedin.com/username",
  },

  summary:
    "Full Stack Developer skilled in Go, React, Next.js and cloud technologies with\
    experience building scalable web applications.",

  experience: [
    {
      company: "CCExtractor",

      role: "GSoC Contributor",

      date: "2022",
    },
  ],

  projects: [
    {
      title: "Uni Share",

      stack: "Flutter Firebase",

      date: "2023",
    },
  ],

  skills: {
    languages: "C++ Go",

    frameworks: "React",

    cloud: "AWS",

    tools: "Docker",
  },

  education: [
    {
      college: "IKGPTU",

      degree: "BTech",

      date: "2022-26",
    },
  ],
};
