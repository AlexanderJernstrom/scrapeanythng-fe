export const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const fetchText = async (url: string, prompt: string) => {
  try {
    const response = await fetch(`${apiURL}/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, prompt }),
    });
    const { ai_response } = await response.json();
    return ai_response;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};
