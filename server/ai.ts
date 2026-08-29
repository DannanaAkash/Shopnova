import { GoogleGenAI } from "@google/genai";
import { products } from "./db";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const getProductsContext = () => {
  return JSON.stringify(products.slice(0, 50).map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    features: p.features,
    category: p.category,
    smartScore: p.smartScore
  })));
};

export async function askNova(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: query,
      config: {
        systemInstruction: `You are Nova AI, the smart shopping assistant for "Shopping Zone". 
        Be helpful, concise, and friendly. 
        Use simple explanations. 
        Here is the product catalog available in the store: ${getProductsContext()}
        If a user asks for a recommendation, recommend products from this list based on their needs.
        Provide your response in Markdown.`
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am having trouble connecting to my AI brain right now.";
  }
}

export async function explainSimply(technicalSpecs: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Explain this technical specification simply, like I'm new to this: "${technicalSpecs}"`,
      config: {
        systemInstruction: "You are a helpful shopping assistant. Explain technical terms in 1-2 short, simple sentences so anyone can understand."
      }
    });
    return response.text;
  } catch (error) {
    return "This specification means it performs better and faster.";
  }
}

export async function compareProductsWithAI(productNames: string[]) {
  try {
    const selectedProducts = products.filter(p => productNames.includes(p.name));
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Compare these products and give a simple verdict on which is better for whom: ${JSON.stringify(selectedProducts)}`,
      config: {
        systemInstruction: "You are Nova AI. Compare the given products. Keep it brief. Provide an 'AI Verdict' at the end."
      }
    });
    return response.text;
  } catch (error) {
    return "Unable to compare right now.";
  }
}

export async function summarizeReviews(productName: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Generate a realistic review summary for a product named "${productName}". Give a bulleted list of 2-3 positives, 1-2 negatives, and a 1 sentence overall customer opinion.`,
      config: {
        systemInstruction: "You are a shopping assistant. Summarize customer sentiment realistically based on the product name."
      }
    });
    return response.text;
  } catch (error) {
    return "Reviews are generally positive, with most users satisfied with the purchase.";
  }
}

export async function visualSearch(base64Data: string, mimeType: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        },
        "What product is in this image? Provide a 1-3 word search query to find similar items in our store (e.g. 'Laptop', 'Running Shoes', 'Smart Watch'). Just return the keywords, nothing else."
      ]
    });
    return response.text;
  } catch (error) {
    console.error("Visual Search Error:", error);
    return "Product";
  }
}
