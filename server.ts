import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { getProducts, getProductById, searchProducts } from "./server/db";
import { askNova, explainSimply, compareProductsWithAI, summarizeReviews } from "./server/ai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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