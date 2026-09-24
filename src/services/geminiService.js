
const { GoogleGenAI } = require("@google/genai");

exports.generateFaq = async (topic) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const model =
    process.env.GEMINI_MODEL || "gemini-3.6-flash";

  const prompt = `Generate one FAQ for this topic: ${topic}.
Return ONLY valid JSON:
{
  "generatedQuestion": "string",
  "generatedAnswer": "string",
  "generatedCategory": "string"
}`;

  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const text = (response.text || "")
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const result = JSON.parse(text);

      if (
        !result.generatedQuestion ||
        !result.generatedAnswer ||
        !result.generatedCategory
      ) {
        throw new Error("Incomplete Gemini response");
      }

      return result;
    } catch (error) {
      const errorMessage = error?.message || "";

      const isTemporaryError =
        errorMessage.includes("503") ||
        errorMessage.includes("UNAVAILABLE") ||
        errorMessage.includes("high demand");

      if (!isTemporaryError || attempt === maxRetries) {
        throw error;
      }

      const delay = 2000 * Math.pow(2, attempt - 1);

      console.log(
        `Gemini temporarily unavailable. Retry ${attempt}/${maxRetries} in ${
          delay / 1000
        } seconds...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};