import { WordResult, TranslationResult, FortuneResult, FlavorPersonality } from "../types.ts";

// This file is now empty because data is embedded in index.html for static deployment robustness.
// Keeping exports to prevent build errors if referenced elsewhere (though not used).

export const getWordOfTheDay = async (): Promise<WordResult> => {
    // @ts-ignore
    return window.getWordOfTheDay();
};

export const translateName = async (name: string): Promise<TranslationResult | null> => null;
export const chatWithGuide = async (history: any[], message: string): Promise<string> => "";
export const getCookieFortune = async (): Promise<FortuneResult | null> => null;
export const analyzeFlavorPersonality = async (flavor: 'garlic' | 'choco'): Promise<FlavorPersonality | null> => null;