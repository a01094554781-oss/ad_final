
import { GoogleGenAI, Type, Schema, Content } from "@google/genai";
import { WordResult, TranslationResult, FortuneResult, FlavorPersonality } from "../types";

// Safely access process.env to avoid "process is not defined" errors in browser
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
  } catch (e) {
    // Ignore error if process is undefined
  }
  return '';
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// --- RICH LOCAL DATABASE (BEAUTIFUL KOREAN WORDS) ---
// Curated list of 100+ aesthetic, poetic, cultural and pure Korean words
const WORD_DATABASE: WordResult[] = [
  // --- 2 Characters (Nature & Stars) ---
  { hangeul: "윤슬", romanization: "Yunseul", meaning: "Sunlight on ripples", vibeCheck: "You sparkle beautifully, just like the shining waves.", luckyItem: "Small Mirror" },
  { hangeul: "별하", romanization: "Byeolha", meaning: "High as a star", vibeCheck: "Aim high. You were born to shine in the night sky.", luckyItem: "Silver Ring" },
  { hangeul: "노을", romanization: "Noeul", meaning: "Sunset glow", vibeCheck: "Endings can be just as beautiful as beginnings.", luckyItem: "Orange Scarf" },
  { hangeul: "구름", romanization: "Gureum", meaning: "Cloud", vibeCheck: "Drift freely. It's okay to be soft and slow today.", luckyItem: "Cotton Candy" },
  { hangeul: "바람", romanization: "Baram", meaning: "Wind / Wish", vibeCheck: "Your wish will reach where it needs to go.", luckyItem: "Wind Chime" },
  { hangeul: "새벽", romanization: "Saebyeok", meaning: "Dawn", vibeCheck: "The quietest moment holds the most potential.", luckyItem: "Warm Tea" },
  { hangeul: "단비", romanization: "Danbi", meaning: "Sweet Rain", vibeCheck: "You are the refreshing relief someone needed today.", luckyItem: "Umbrella" },
  { hangeul: "달보", romanization: "Dalbo", meaning: "Moonlight", vibeCheck: "Even in darkness, your gentle light guides others.", luckyItem: "Pearl" },
  { hangeul: "봄비", romanization: "Bombi", meaning: "Spring Rain", vibeCheck: "Grow at your own pace. You are blooming.", luckyItem: "Green Plant" },
  { hangeul: "바다", romanization: "Bada", meaning: "Sea", vibeCheck: "Let your worries wash away with the tide.", luckyItem: "Seashell" },
  { hangeul: "하늘", romanization: "Haneul", meaning: "Sky", vibeCheck: "Look up. The possibilities are limitless.", luckyItem: "Blue Hat" },
  { hangeul: "우주", romanization: "Uju", meaning: "Universe", vibeCheck: "You are made of stardust. You belong here.", luckyItem: "Galaxy Pattern" },
  { hangeul: "가을", romanization: "Gaeul", meaning: "Autumn", vibeCheck: "Time to let go of what you don't need.", luckyItem: "Brown Coat" },
  { hangeul: "겨울", romanization: "Gyeoul", meaning: "Winter", vibeCheck: "Rest now. Spring is coming soon.", luckyItem: "Hot Cocoa" },

  // --- 2 Characters (Emotion & State) ---
  { hangeul: "사랑", romanization: "Sarang", meaning: "Love", vibeCheck: "The most powerful magic of all. Share it freely.", luckyItem: "Heart Sticker" },
  { hangeul: "라온", romanization: "Raon", meaning: "Joy (Pure Korean)", vibeCheck: "May your day be filled with pure, unadulterated joy.", luckyItem: "Yellow Socks" },
  { hangeul: "다솜", romanization: "Dasom", meaning: "Love (Old Korean)", vibeCheck: "An ancient, deep love protects you.", luckyItem: "Handwritten Note" },
  { hangeul: "루리", romanization: "Ruri", meaning: "To accomplish", vibeCheck: "You will achieve exactly what you dream of.", luckyItem: "Key" },
  { hangeul: "소담", romanization: "Sodam", meaning: "Abundant", vibeCheck: "Your presence fills the room with warmth.", luckyItem: "Full Bowl" },
  { hangeul: "꽃잠", romanization: "Kkotjam", meaning: "Sweet Sleep", vibeCheck: "Rest deeply, like a flower closing at night.", luckyItem: "Soft Pillow" },
  { hangeul: "한결", romanization: "Hangyeol", meaning: "Unchanging", vibeCheck: "Your consistency is your greatest superpower.", luckyItem: "Pine Tree" },
  { hangeul: "믿음", romanization: "Mideum", meaning: "Trust", vibeCheck: "Believe in yourself. You know the way.", luckyItem: "Compass" },
  { hangeul: "설렘", romanization: "Seollem", meaning: "Fluttering Heart", vibeCheck: "Embrace the butterflies. Something good is coming.", luckyItem: "Perfume" },
  { hangeul: "행복", romanization: "Haengbok", meaning: "Happiness", vibeCheck: "Happiness is waiting for you in small moments.", luckyItem: "Smile" },
  { hangeul: "위로", romanization: "Wiro", meaning: "Comfort", vibeCheck: "It's okay not to be okay. Take a breath.", luckyItem: "Blanket" },
  { hangeul: "용기", romanization: "Yonggi", meaning: "Courage", vibeCheck: "Be brave. You are stronger than you think.", luckyItem: "Red Shoes" },
  { hangeul: "자유", romanization: "Jayu", meaning: "Freedom", vibeCheck: "Spread your wings. Nothing can hold you back.", luckyItem: "Bird Feather" },
  { hangeul: "휴식", romanization: "Hyusik", meaning: "Rest", vibeCheck: "Recharging is part of the journey.", luckyItem: "Scented Candle" },
  { hangeul: "성공", romanization: "Seonggong", meaning: "Success", vibeCheck: "You are on the right path. Keep going.", luckyItem: "Pen" },
  { hangeul: "행운", romanization: "Haengun", meaning: "Luck", vibeCheck: "Something lucky is right around the corner!", luckyItem: "Clover" },

  // --- 2 Characters (Fun & Slang) ---
  { hangeul: "꿀잠", romanization: "Kkuljam", meaning: "Honey Sleep", vibeCheck: "Tonight, you will sleep as sweet as honey.", luckyItem: "Pajamas" },
  { hangeul: "대박", romanization: "Daebak", meaning: "Jackpot/Awesome", vibeCheck: "Something amazing is about to happen!", luckyItem: "Lottery Ticket" },
  { hangeul: "심쿵", romanization: "Simkung", meaning: "Heartthrob", vibeCheck: "Prepare for a heart-fluttering moment.", luckyItem: "Pink Accessory" },
  { hangeul: "힐링", romanization: "Healing", meaning: "Healing", vibeCheck: "Take time to heal your soul today.", luckyItem: "Music Playlist" },
  { hangeul: "선물", romanization: "Seonmul", meaning: "Gift", vibeCheck: "You are a gift to those around you.", luckyItem: "Ribbon" },
  { hangeul: "추억", romanization: "Chueok", meaning: "Memory", vibeCheck: "Make a memory today that you'll smile at later.", luckyItem: "Photo" },
  { hangeul: "친구", romanization: "Chingu", meaning: "Friend", vibeCheck: "Call a friend. They miss you too.", luckyItem: "Phone" },

  // --- 3 Characters (K-Culture & Food) ---
  { hangeul: "떡볶이", romanization: "Tteokbokki", meaning: "Spicy Rice Cake", vibeCheck: "Spice up your life! Be bold today.", luckyItem: "Red Shirt" },
  { hangeul: "김밥", romanization: "Gimbap", meaning: "Seaweed Roll", vibeCheck: "Everything you need is rolled up inside you.", luckyItem: "Lunchbox" },
  { hangeul: "달고나", romanization: "Dalgona", meaning: "Honeycomb Toffee", vibeCheck: "Life is sweet but fragile. Handle with care.", luckyItem: "Sugar" },
  { hangeul: "붕어빵", romanization: "Bungeoppang", meaning: "Fish Pastry", vibeCheck: "Warmth is best shared with others.", luckyItem: "Coins" },
  { hangeul: "무지개", romanization: "Mujigae", meaning: "Rainbow", vibeCheck: "Your storm is over. Look for the colors.", luckyItem: "Prism" },
  { hangeul: "소나기", romanization: "Sonagi", meaning: "Sudden Shower", vibeCheck: "This trouble will pass quickly, just like rain.", luckyItem: "Towel" },
  { hangeul: "눈사람", romanization: "Nunsaram", meaning: "Snowman", vibeCheck: "Stay cool, but keep a warm heart.", luckyItem: "Carrot" },
  { hangeul: "소확행", romanization: "Sohwakhaeng", meaning: "Small happiness", vibeCheck: "Find joy in the little things today.", luckyItem: "Coffee" },
  { hangeul: "화이팅", romanization: "Hwaiting", meaning: "You can do it!", vibeCheck: "Cheer up! You have the power to win.", luckyItem: "Fist Bump" },
  { hangeul: "고마워", romanization: "Gomawo", meaning: "Thank you", vibeCheck: "Gratitude opens the door to abundance.", luckyItem: "Thank You Card" },
  { hangeul: "반가워", romanization: "Bangawo", meaning: "Nice to meet you", vibeCheck: "New connections are waiting for you.", luckyItem: "Handshake" },

  // --- 3 Characters (Poetic & Pure) ---
  { hangeul: "미리내", romanization: "Mirinae", meaning: "Milky Way", vibeCheck: "You contain a whole universe within you.", luckyItem: "Starry Night" },
  { hangeul: "아라", romanization: "Ara", meaning: "Sea (Pure Korean)", vibeCheck: "Your heart is as deep and vast as the ocean.", luckyItem: "Blue Shirt" },
  { hangeul: "마루", romanization: "Maru", meaning: "Sky / Mountain Top", vibeCheck: "You are destined for the summit.", luckyItem: "Hiking Boots" },
  { hangeul: "가람", romanization: "Garam", meaning: "River (Pure Korean)", vibeCheck: "Flow around obstacles. Keep moving forward.", luckyItem: "Water Bottle" },
  { hangeul: "나비잠", romanization: "Nabijam", meaning: "Baby's sleep", vibeCheck: "Peaceful and innocent rest awaits you.", luckyItem: "Blanket" },
  { hangeul: "도담", romanization: "Dodam", meaning: "Healthy/Strong", vibeCheck: "You are growing stronger every single day.", luckyItem: "Vitamin" },
  { hangeul: "해오름", romanization: "Haeoreum", meaning: "Sunrise", vibeCheck: "A new day, a new start. Rise and shine.", luckyItem: "Morning Coffee" },
  { hangeul: "여우비", romanization: "Yeoubi", meaning: "Sunshower", vibeCheck: "Even on rainy days, the sun is watching you.", luckyItem: "Raincoat" },
  { hangeul: "꽃가람", romanization: "Kkotgaram", meaning: "Flower River", vibeCheck: "Your life path is flowing with beauty.", luckyItem: "Flower Ring" },
  { hangeul: "별찌", romanization: "Byeoljji", meaning: "Shooting Star", vibeCheck: "Make a wish. The universe is listening.", luckyItem: "Coin" },
  { hangeul: "그루잠", romanization: "Geurujam", meaning: "Brief deep sleep", vibeCheck: "Even a short break can work miracles.", luckyItem: "Eye Mask" },
  
  // --- 4 Characters (Aesthetic, Sound & Deep) ---
  { hangeul: "시나브로", romanization: "Sinabro", meaning: "Little by little", vibeCheck: "Progress is happening, even if you don't see it.", luckyItem: "Watch" },
  { hangeul: "안다미로", romanization: "Andamiro", meaning: "Overflowing", vibeCheck: "Abundance is coming to fill your cup.", luckyItem: "Big Mug" },
  { hangeul: "함초롬히", romanization: "Hamchoromhi", meaning: "Wet with dew / Neat", vibeCheck: "Fresh, clean, and elegant. That's your vibe.", luckyItem: "White Shirt" },
  { hangeul: "산들바람", romanization: "Sandeulbaram", meaning: "Gentle Breeze", vibeCheck: "Softness is a strength. Be gentle today.", luckyItem: "Open Window" },
  { hangeul: "도담도담", romanization: "Dodamdodam", meaning: "Growing well", vibeCheck: "You are doing great. Keep growing.", luckyItem: "Plant Pot" },
  { hangeul: "반짝반짝", romanization: "Banjjak", meaning: "Twinkle Twinkle", vibeCheck: "It's your time to shine brightly.", luckyItem: "Glitter" },
  { hangeul: "두근두근", romanization: "Dugeun", meaning: "Heartbeat", vibeCheck: "Follow what makes your heart race.", luckyItem: "Running Shoes" },
  { hangeul: "사부작", romanization: "Sabujak", meaning: "Soft step/rustle", vibeCheck: "Move lightly and freely today.", luckyItem: "Sneakers" },
  { hangeul: "오손도손", romanization: "Osondoson", meaning: "Friendly/Harmonious", vibeCheck: "Share happiness with those around you.", luckyItem: "Shared Meal" },
  { hangeul: "싱글벙글", romanization: "Singgeul", meaning: "Beaming Smile", vibeCheck: "Your smile changes the world around you.", luckyItem: "Camera" },
  { hangeul: "알록달록", romanization: "Allokdallok", meaning: "Colorful", vibeCheck: "Embrace all the colors of your personality.", luckyItem: "Crayons" },
  { hangeul: "룰루랄라", romanization: "Lullulalla", meaning: "Tra-la-la (Happy)", vibeCheck: "Sing a song! Happiness is a choice.", luckyItem: "Headphones" },
  { hangeul: "옹기종기", romanization: "Onggijonggi", meaning: "Huddled together", vibeCheck: "Community is strength. Gather your people.", luckyItem: "Group Photo" },
  { hangeul: "차곡차곡", romanization: "Chagokchagok", meaning: "Step by step", vibeCheck: "Build your dreams one brick at a time.", luckyItem: "Brick/Block" },

  // --- Special Gems ---
  { hangeul: "늘품", romanization: "Neulpum", meaning: "Always improving", vibeCheck: "Your potential is looking forward.", luckyItem: "Notebook" },
  { hangeul: "나린", romanization: "Narin", meaning: "Heaven sent", vibeCheck: "You are a gift from the sky.", luckyItem: "Sky Photo" },
  { hangeul: "예그리나", romanization: "Yegurina", meaning: "Loving each other", vibeCheck: "Connection is the key today.", luckyItem: "Phone Call" },
];

const FORTUNE_DATABASE: FortuneResult[] = [
  // Keeping this for backward compatibility if needed
  { luckyColor: "Gold", character: "빛", name: "Light", sound: "Bit", fortune: "You will shine brightly in your endeavors today." }
];

// Define schemas only where AI is still strictly needed (Chat/Translate)
const translationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hangeul: { type: Type.STRING },
    romanization: { type: Type.STRING },
    meaning: { type: Type.STRING },
    characters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          char: { type: Type.STRING },
          visualShape: { type: Type.STRING }
        },
        required: ["char", "visualShape"]
      }
    }
  },
  required: ["hangeul", "romanization", "meaning", "characters"]
};

const flavorSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    powerWord: { type: Type.STRING },
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    matchPercent: { type: Type.INTEGER }
  },
  required: ["powerWord", "title", "description", "matchPercent"]
};

// --- FUNCTIONS ---

// State to track available indices for "No Repeat" logic
// Initialized with all indices [0, 1, 2, ... length-1]
let availableIndices: number[] = Array.from({ length: WORD_DATABASE.length }, (_, i) => i);

export const getWordOfTheDay = async (): Promise<WordResult> => {
  // If all words have been used, reset the deck
  if (availableIndices.length === 0) {
     availableIndices = Array.from({ length: WORD_DATABASE.length }, (_, i) => i);
  }

  // Pick a random index from the AVAILABLE pool
  const randomIndexInPool = Math.floor(Math.random() * availableIndices.length);
  const wordIndex = availableIndices[randomIndexInPool];

  // Remove the chosen index from the pool so it won't be picked again
  availableIndices.splice(randomIndexInPool, 1);

  // Return the word corresponding to that index
  return WORD_DATABASE[wordIndex];
};

export const getCookieFortune = async (): Promise<FortuneResult> => {
  const randomIndex = Math.floor(Math.random() * FORTUNE_DATABASE.length);
  return FORTUNE_DATABASE[randomIndex];
};

export const translateName = async (name: string): Promise<TranslationResult> => {
  if (!apiKey || !ai) throw new Error("API Key is missing for Translation");

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
  if (!apiKey || !ai) return "I'm in offline mode! Please add an API key to chat.";

  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: history,
      config: {
        systemInstruction: "You are 'Cookie', a friendly and knowledgeable guide for Hangeul Kwaja.",
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Sorry, I'm at a loss for words!";
  } catch (error) {
    console.error("Chat error:", error);
    throw error;
  }
};

export const analyzeFlavorPersonality = async (flavor: 'garlic' | 'choco'): Promise<FlavorPersonality> => {
  if (!apiKey || !ai) throw new Error("API Key is missing for Analysis");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze personality for flavor: ${flavor}.`,
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
