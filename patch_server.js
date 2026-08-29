const fs = require('fs');
const content = fs.readFileSync('server.ts', 'utf8');
const route = `
  app.post("/api/ai/visual-search", async (req, res) => {
    const { image, mimeType } = req.body;
    if (!image || !mimeType) return res.status(400).json({ error: "Image data required" });
    const query = await visualSearch(image, mimeType);
    res.json({ query: query.trim() });
  });
`;
const newContent = content.replace('// Vite middleware for development', route + '\n  // Vite middleware for development');
fs.writeFileSync('server.ts', newContent);
