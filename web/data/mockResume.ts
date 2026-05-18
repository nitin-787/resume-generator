import { ResumeData } from "@/types/resume";

export const mockResume: ResumeData = {
  contact: {
    name: "Nitin Sharma",

    phone: "+91",

    email: "nitin@gmail.com",

    github: "github.com/nitin",

    linkedin: "linkedin.com",
  },

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
