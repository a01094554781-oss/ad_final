
import { GoogleGenAI, Type, Schema, Content } from "@google/genai";
import { WordResult, TranslationResult, FortuneResult, FlavorPersonality } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const wordSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hangeul: { type: Type.STRING, description: "A unique Korean word (noun/adjective/adverb/onomatopoeia) in Hangeul" },
    romanization: { type: Type.STRING, description: "Romanized pronunciation" },
    meaning: { type: Type.STRING, description: "English meaning of the word" },
    vibeCheck: { type: Type.STRING, description: "A short, witty sentence explaining why they got this word today (Pop culture tone)." },
    luckyItem: { type: Type.STRING, description: "A specific, fun object or food (e.g., 'Mint Choco', 'Yellow Socks', 'Subway Line 2')" }
  },
  required: ["hangeul", "romanization", "meaning", "vibeCheck", "luckyItem"]
};

const translationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hangeul: { type: Type.STRING, description: "The name written in Hangeul" },
    romanization: { type: Type.STRING, description: "Romanized pronunciation" },
    meaning: { type: Type.STRING, description: "A poetic or fun interpretation of the name in Korean context" },
    characters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          char: { type: Type.STRING, description: "A single Hangeul character" },
          visualShape: { type: Type.STRING, description: "Description of what the shape looks like (e.g. 'Like a square')" }
        },
        required: ["char", "visualShape"]
      }
    }
  },
  required: ["hangeul", "romanization", "meaning", "characters"]
};

const fortuneSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    luckyColor: { type: Type.STRING, description: "A lucky color for the user" },
    character: { type: Type.STRING, description: "A single random Hangeul character (consonant or vowel)" },
    name: { type: Type.STRING, description: "The name or meaning associated with the character" },
    sound: { type: Type.STRING, description: "Romanized pronunciation of the character" },
    fortune: { type: Type.STRING, description: "A short, cryptic, yet positive fortune cookie message." }
  },
  required: ["luckyColor", "character", "name", "sound", "fortune"]
};

const flavorSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    powerWord: { type: Type.STRING, description: "A strong, single word describing the personality (e.g. BOLD, SWEET)" },
    title: { type: Type.STRING, description: "A fun title for the user based on the flavor" },
    description: { type: Type.STRING, description: "A personality analysis based on their choice of flavor" },
    matchPercent: { type: Type.INTEGER, description: "A random percentage of how well they match this snack" }
  },
  required: ["powerWord", "title", "description", "matchPercent"]
};

export const getWordOfTheDay = async (): Promise<WordResult> => {
  if (!apiKey) throw new Error("API Key is missing");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Give me one random, interesting Korean word. 
      Mix it up: nouns (Sky, Sea), beautiful words (Yunseul), onomatopoeia (Dugeun-Dugeun), or slang.
      Do not just stick to basic words like 'Love' or 'Friend'. Surprise the user.
      For 'luckyItem', be specific and quirky (e.g., instead of 'Coffee', say 'Iced Americano').
      The "vibeCheck" should be fun, encouraging, and sound like a fortune teller.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: wordSchema,
        temperature: 1.2, // Increased temperature for more variety
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text) as WordResult;
  } catch (error) {
    console.error("Word generation error:", error);
    throw error;
  }
};

export const translateName = async (name: string): Promise<TranslationResult> => {
  if (!apiKey) throw new Error("API Key is missing");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Translate the name "${name}" into Korean (Hangeul).
      Break it down by character/syllable and describe the shape of the letters playfully.
      Give a fun or poetic meaning to the name as if it were a Korean word or name.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: translationSchema,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text) as TranslationResult;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};

export const chatWithGuide = async (history: Content[], message: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: history,
      config: {
        systemInstruction: "You are 'Cookie', a friendly and knowledgeable guide for Hangeul Kwaja (Korean Alphabet Cookies). You love Korean culture, history (King Sejong), and snacks. Keep answers concise, fun, and helpful.",
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Sorry, I'm at a loss for words!";
  } catch (error) {
    console.error("Chat error:", error);
    throw error;
  }
};

export const getCookieFortune = async (): Promise<FortuneResult> => {
  if (!apiKey) throw new Error("API Key is missing");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Give me a random Hangeul character (consonant or vowel) and a fortune cookie style message associated with it. Make it fun and mystical.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: fortuneSchema,
        temperature: 1.1,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text) as FortuneResult;
  } catch (error) {
    console.error("Fortune error:", error);
    throw error;
  }
};

export const analyzeFlavorPersonality = async (flavor: 'garlic' | 'choco'): Promise<FlavorPersonality> => {
  if (!apiKey) throw new Error("API Key is missing");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `The user chose the "${flavor}" flavor of Hangeul Kwaja (Korean alphabet cookies). 
      Analyze their personality based on this choice.
      Garlic flavor: Bold, spicy, Korean soul, adventurous, savory lover.
      Choco flavor: Sweet, classic, comfort-seeker, smooth, safe but delightful.
      Provide a fun, short personality reading.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: flavorSchema,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text) as FlavorPersonality;
  } catch (error) {
    console.error("Flavor analysis error:", error);
    throw error;
  }
};
