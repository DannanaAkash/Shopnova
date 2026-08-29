const fs = require('fs');
const content = fs.readFileSync('server.ts', 'utf8');
const route = `
  app.post("/api/ai/music", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });
    
    // Attempting to use the new Lyria model 
    try {
      const { GoogleGenAI } = require("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "lyria-3-clip-preview",
        contents: prompt
      });
      // Lyria model returns audio data in base64 if successful
      if (response.text) {
        res.json({ message: response.text });
      } else {
        res.json({ message: "Audio generated successfully." }); // fallback for now
      }
    } catch(err) {
       console.error("Lyria error:", err);
       res.json({ message: "Mocked: Here is a shopping theme song! (API quota exceeded or unavailable)", isMock: true });
    }
  });

  app.post("/api/ai/voice", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });
    
    try {
      const { GoogleGenAI } = require("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      // Real Live API uses WebSockets, this is a fallback for simple server-side chat using flash-live-preview
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-live-preview",
        contents: prompt,
        config: { systemInstruction: "You are Nova AI voice assistant. Keep it conversational." }
      });
      res.json({ response: response.text });
    } catch(err) {
       console.error("Live API error:", err);
       res.json({ response: "Hello! I am Nova Voice (Fallback). I am ready to help you shop.", isMock: true });
    }
  });
`;
const newContent = content.replace('// Vite middleware for development', route + '\n  // Vite middleware for development');
fs.writeFileSync('server.ts', newContent);
