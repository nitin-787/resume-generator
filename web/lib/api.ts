const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

function getAuthHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
}

export async function generateAI(role: string, skills: string[]) {
  const res = await fetch(`${BASE_URL}/ai/generate`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ role, skills }),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "API failed");
  }

  return JSON.parse(text) as { bullets: string[] };
}

export const resumeService = {
  // Create Resume (POST /api/resumes)
  createResume: async (title: string, templateId: string, content: string) => {
    const res = await fetch(`${BASE_URL}/resumes`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title,
        template_id: templateId,
        content,
      }),
    });

    const text = await res.text();
    if (!res.ok) throw new Error(text || "Failed to create resume");
    return JSON.parse(text);
  },

  // Get All Resumes (GET /api/resumes)
  getAllResumes: async () => {
    const res = await fetch(`${BASE_URL}/resumes`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const text = await res.text();
    if (!res.ok) throw new Error(text || "Failed to fetch resumes");
    return JSON.parse(text);
  },
};
