import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const res = await ai.models.generateContent({ model: "lyria-3-clip-preview", contents: "A happy song about shopping" });
    console.log("Success");
  } catch (e) {
    console.error(e.message);
  }
}
run();
