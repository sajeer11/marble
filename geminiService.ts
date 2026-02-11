
import { GoogleGenAI } from "@google/genai";

// Lazy initialization - only initialize when actually used
let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error('NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set');
    }
    ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
  }
  return ai;
};

export const getMarbleAdvice = async (prompt: string) => {
  try {
    const client = getAIClient();
    // Call generateContent with both model name and prompt within a single request object.
    // 'gemini-3-flash-preview' is the recommended model for basic text tasks.
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert luxury stone and interior design consultant for 'MarbleLux'. Provide elegant, professional advice on marble selection, care, and architectural application.",
      },
    });
    // Access the extracted string directly via the .text property (not a method).
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, our stone expert is currently unavailable. Please try again shortly.";
  }
};