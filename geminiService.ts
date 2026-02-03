
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client using a named parameter for the API key as required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarbleAdvice = async (prompt: string) => {
  try {
    // Call generateContent with both model name and prompt within a single request object.
    // 'gemini-3-flash-preview' is the recommended model for basic text tasks.
    const response = await ai.models.generateContent({
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