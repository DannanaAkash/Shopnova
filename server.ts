import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { getProducts, getProductById, searchProducts } from "./server/db";
import { askNova, explainSimply, compareProductsWithAI, summarizeReviews, visualSearch } from "./server/ai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Routes
  app.get("/api/products", (req, res) => {
    const q = req.query.q as string;
    const limit = parseInt(req.query.limit as string) || 50;
    let results = [];
    if (q) {
      results = searchProducts(q);
    } else {
      results = getProducts();
    }
    res.json(results.slice(0, limit));
  });

  app.get("/api/products/:id", (req, res) => {
    const product = getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  app.post("/api/ai/chat", async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });
    const text = await askNova(query);
    res.json({ response: text });
  });

  app.post("/api/ai/explain", async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    const explanation = await explainSimply(text);
    res.json({ explanation });
  });

  app.post("/api/ai/compare", async (req, res) => {
    const { productNames } = req.body;
    if (!productNames || !Array.isArray(productNames)) {
      return res.status(400).json({ error: "Product names array is required" });
    }
    const comparison = await compareProductsWithAI(productNames);
    res.json({ comparison });
  });

  app.post("/api/ai/reviews", async (req, res) => {
    const { productName } = req.body;
    if (!productName) return res.status(400).json({ error: "Product name is required" });
    const summary = await summarizeReviews(productName);
    res.json({ summary });
  });

  
  app.post("/api/ai/visual-search", async (req, res) => {
    const { image, mimeType } = req.body;
    if (!image || !mimeType) return res.status(400).json({ error: "Image data required" });
    const query = await visualSearch(image, mimeType);
    res.json({ query: query.trim() });
  });

  
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();