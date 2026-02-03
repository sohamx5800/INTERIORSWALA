
import { GoogleGenAI, Type } from "@google/genai";
import { DesignSuggestion } from "../types";

export const getDesignSuggestions = async (prompt: string): Promise<DesignSuggestion> => {
  // Always use direct initialization with process.env.API_KEY as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `As an expert interior designer for the luxury brand 'Interiorswala', provide a design concept for: "${prompt}". 
    Important: For the 'palette', provide evocative descriptive names (e.g., 'Aged Walnut', 'Dusty Rose', 'Brushed Brass') along with hex codes.
    Return a detailed JSON object.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          style: { type: Type.STRING },
          palette: { 
            type: Type.ARRAY,
            items: { 
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Descriptive name of the color" },
                hex: { type: Type.STRING, description: "Hexadecimal color code" }
              },
              required: ["name", "hex"]
            }
          },
          description: { type: Type.STRING },
          keyElements: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          furnitureIdeas: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["style", "palette", "description", "keyElements", "furnitureIdeas"]
      }
    }
  });

  // Extract text property directly from response as per guidelines.
  const jsonStr = response.text?.trim();
  if (!jsonStr) {
    throw new Error("AI returned no text content");
  }

  return JSON.parse(jsonStr) as DesignSuggestion;
};
