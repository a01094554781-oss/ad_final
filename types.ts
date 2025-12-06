
export interface WordResult {
  hangeul: string;        // e.g. "사랑"
  romanization: string;   // e.g. "Sarang"
  meaning: string;        // e.g. "Love"
  vibeCheck: string;      // e.g. "You need some warmth today!"
  luckyItem: string;      // e.g. "Coffee"
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface TranslationResult {
  hangeul: string;
  romanization: string;
  meaning: string;
  characters: {
    char: string;
    visualShape: string;
  }[];
}

export interface FortuneResult {
  luckyColor: string;
  character: string;
  name: string;
  sound: string;
  fortune: string;
}

export interface FlavorPersonality {
  powerWord: string;
  title: string;
  description: string;
  matchPercent: number;
}

export enum Section {
  HOME = 'home',
  GAME = 'game',
  ABOUT = 'about',
  TRANSLATE = 'translate',
  CHAT = 'chat',
}