export interface ResumeData {
  contact: {
    name: string;
    phone: string;
    email: string;
    github: string;
    linkedin: string;
  };

  experience: {
    company: string;
    role: string;
    date: string;
  }[];

  projects: {
    title: string;
    stack: string;
    date: string;
  }[];

  skills: {
    languages: string;
    frameworks: string;
    cloud: string;
    tools: string;
  };

  education: {
    college: string;
    degree: string;
    date: string;
  }[];
}
