import { WordResult, TranslationResult, FortuneResult, FlavorPersonality } from "../types.ts";

// --- 100% OFFLINE DATABASE (NO AI) ---
const WORD_DATABASE: WordResult[] = [
  // --- 2 Characters (Nature/Pure) ---
  { hangeul: "윤슬", romanization: "Yunseul", meaning: "Sunlight on ripples", vibeCheck: "You sparkle beautifully today.", luckyItem: "Small Mirror" },
  { hangeul: "별하", romanization: "Byeolha", meaning: "High as a star", vibeCheck: "Aim high. You were born to shine.", luckyItem: "Silver Ring" },
  { hangeul: "노을", romanization: "Noeul", meaning: "Sunset glow", vibeCheck: "Endings can be beautiful too.", luckyItem: "Orange Scarf" },
  { hangeul: "구름", romanization: "Gureum", meaning: "Cloud", vibeCheck: "Drift freely. Be soft today.", luckyItem: "Cotton Candy" },
  { hangeul: "바람", romanization: "Baram", meaning: "Wind / Wish", vibeCheck: "Your wish will reach the sky.", luckyItem: "Wind Chime" },
  { hangeul: "새벽", romanization: "Saebyeok", meaning: "Dawn", vibeCheck: "The quietest moment holds power.", luckyItem: "Warm Tea" },
  { hangeul: "단비", romanization: "Danbi", meaning: "Sweet Rain", vibeCheck: "You are the relief someone needs.", luckyItem: "Umbrella" },
  { hangeul: "달보", romanization: "Dalbo", meaning: "Moonlight", vibeCheck: "Gentle light guides you.", luckyItem: "Pearl" },
  { hangeul: "봄비", romanization: "Bombi", meaning: "Spring Rain", vibeCheck: "You are blooming.", luckyItem: "Green Plant" },
  { hangeul: "바다", romanization: "Bada", meaning: "Sea", vibeCheck: "Wash away your worries.", luckyItem: "Seashell" },
  { hangeul: "하늘", romanization: "Haneul", meaning: "Sky", vibeCheck: "Look up. Possibilities are endless.", luckyItem: "Blue Hat" },
  { hangeul: "우주", romanization: "Uju", meaning: "Universe", vibeCheck: "You are made of stardust.", luckyItem: "Galaxy Pattern" },
  { hangeul: "가을", romanization: "Gaeul", meaning: "Autumn", vibeCheck: "Let go of what you don't need.", luckyItem: "Brown Coat" },
  { hangeul: "겨울", romanization: "Gyeoul", meaning: "Winter", vibeCheck: "Rest now. Spring is coming.", luckyItem: "Hot Cocoa" },

  // --- 2 Characters (Emotion) ---
  { hangeul: "사랑", romanization: "Sarang", meaning: "Love", vibeCheck: "Share your magic freely.", luckyItem: "Heart Sticker" },
  { hangeul: "라온", romanization: "Raon", meaning: "Joy", vibeCheck: "Pure joy is coming your way.", luckyItem: "Yellow Socks" },
  { hangeul: "다솜", romanization: "Dasom", meaning: "Love (Old Korean)", vibeCheck: "A deep love protects you.", luckyItem: "Handwritten Note" },
  { hangeul: "루리", romanization: "Ruri", meaning: "To accomplish", vibeCheck: "You will achieve your dreams.", luckyItem: "Key" },
  { hangeul: "소담", romanization: "Sodam", meaning: "Abundant", vibeCheck: "Your presence is warm and full.", luckyItem: "Full Bowl" },
  { hangeul: "꽃잠", romanization: "Kkotjam", meaning: "Sweet Sleep", vibeCheck: "Rest deeply tonight.", luckyItem: "Soft Pillow" },
  { hangeul: "한결", romanization: "Hangyeol", meaning: "Unchanging", vibeCheck: "Consistency is your superpower.", luckyItem: "Pine Tree" },
  { hangeul: "믿음", romanization: "Mideum", meaning: "Trust", vibeCheck: "Believe in yourself.", luckyItem: "Compass" },
  { hangeul: "설렘", romanization: "Seollem", meaning: "Fluttering Heart", vibeCheck: "Something good is coming.", luckyItem: "Perfume" },
  { hangeul: "행복", romanization: "Haengbok", meaning: "Happiness", vibeCheck: "Find joy in small moments.", luckyItem: "Smile" },
  { hangeul: "위로", romanization: "Wiro", meaning: "Comfort", vibeCheck: "It's okay to take a break.", luckyItem: "Blanket" },
  { hangeul: "용기", romanization: "Yonggi", meaning: "Courage", vibeCheck: "You are stronger than you think.", luckyItem: "Red Shoes" },
  { hangeul: "자유", romanization: "Jayu", meaning: "Freedom", vibeCheck: "Spread your wings.", luckyItem: "Bird Feather" },
  { hangeul: "휴식", romanization: "Hyusik", meaning: "Rest", vibeCheck: "Recharging is productive.", luckyItem: "Scented Candle" },

  // --- 2 Characters (Fun/Slang) ---
  { hangeul: "꿀잠", romanization: "Kkuljam", meaning: "Honey Sleep", vibeCheck: "Sleep as sweet as honey.", luckyItem: "Pajamas" },
  { hangeul: "대박", romanization: "Daebak", meaning: "Jackpot", vibeCheck: "Something amazing happens!", luckyItem: "Lottery Ticket" },
  { hangeul: "심쿵", romanization: "Simkung", meaning: "Heartthrob", vibeCheck: "Prepare for butterflies.", luckyItem: "Pink Accessory" },
  { hangeul: "힐링", romanization: "Healing", meaning: "Healing", vibeCheck: "Heal your soul today.", luckyItem: "Music Playlist" },
  { hangeul: "선물", romanization: "Seonmul", meaning: "Gift", vibeCheck: "You are a gift to others.", luckyItem: "Ribbon" },
  { hangeul: "추억", romanization: "Chueok", meaning: "Memory", vibeCheck: "Make a good memory today.", luckyItem: "Photo" },
  { hangeul: "친구", romanization: "Chingu", meaning: "Friend", vibeCheck: "Call a friend.", luckyItem: "Phone" },

  // --- 3 Characters (Food/Culture) ---
  { hangeul: "떡볶이", romanization: "Tteokbokki", meaning: "Spicy Rice Cake", vibeCheck: "Be bold and spicy today!", luckyItem: "Red Shirt" },
  { hangeul: "김밥", romanization: "Gimbap", meaning: "Seaweed Roll", vibeCheck: "Everything you need is inside.", luckyItem: "Lunchbox" },
  { hangeul: "달고나", romanization: "Dalgona", meaning: "Honeycomb Toffee", vibeCheck: "Life is sweet but fragile.", luckyItem: "Sugar" },
  { hangeul: "붕어빵", romanization: "Bungeoppang", meaning: "Fish Pastry", vibeCheck: "Warmth is best shared.", luckyItem: "Coins" },
  { hangeul: "무지개", romanization: "Mujigae", meaning: "Rainbow", vibeCheck: "Your storm is over.", luckyItem: "Prism" },
  { hangeul: "소나기", romanization: "Sonagi", meaning: "Sudden Shower", vibeCheck: "Trouble passes quickly.", luckyItem: "Towel" },
  { hangeul: "눈사람", romanization: "Nunsaram", meaning: "Snowman", vibeCheck: "Stay cool.", luckyItem: "Carrot" },
  { hangeul: "소확행", romanization: "Sohwakhaeng", meaning: "Small happiness", vibeCheck: "Joy is in the little things.", luckyItem: "Coffee" },
  { hangeul: "화이팅", romanization: "Hwaiting", meaning: "You can do it!", vibeCheck: "Cheer up!", luckyItem: "Fist Bump" },
  { hangeul: "고마워", romanization: "Gomawo", meaning: "Thank you", vibeCheck: "Gratitude brings abundance.", luckyItem: "Thank You Card" },
  { hangeul: "반가워", romanization: "Bangawo", meaning: "Nice to meet you", vibeCheck: "New connections await.", luckyItem: "Handshake" },

  // --- 3 Characters (Pure/Poetic) ---
  { hangeul: "미리내", romanization: "Mirinae", meaning: "Milky Way", vibeCheck: "You contain a universe.", luckyItem: "Starry Night" },
  { hangeul: "아라", romanization: "Ara", meaning: "Sea", vibeCheck: "Your heart is deep.", luckyItem: "Blue Shirt" },
  { hangeul: "마루", romanization: "Maru", meaning: "Mountain Top", vibeCheck: "You are destined for the top.", luckyItem: "Hiking Boots" },
  { hangeul: "가람", romanization: "Garam", meaning: "River", vibeCheck: "Keep moving forward.", luckyItem: "Water Bottle" },
  { hangeul: "나비잠", romanization: "Nabijam", meaning: "Baby's sleep", vibeCheck: "Peaceful rest awaits.", luckyItem: "Blanket" },
  { hangeul: "도담", romanization: "Dodam", meaning: "Strong", vibeCheck: "You are growing stronger.", luckyItem: "Vitamin" },
  { hangeul: "해오름", romanization: "Haeoreum", meaning: "Sunrise", vibeCheck: "Rise and shine.", luckyItem: "Morning Coffee" },
  { hangeul: "여우비", romanization: "Yeoubi", meaning: "Sunshower", vibeCheck: "The sun watches over you.", luckyItem: "Raincoat" },
  { hangeul: "꽃가람", romanization: "Kkotgaram", meaning: "Flower River", vibeCheck: "Your path is beautiful.", luckyItem: "Flower Ring" },
  { hangeul: "별찌", romanization: "Byeoljji", meaning: "Shooting Star", vibeCheck: "Make a wish.", luckyItem: "Coin" },
  
  // --- 4 Characters (Long Words) ---
  { hangeul: "시나브로", romanization: "Sinabro", meaning: "Little by little", vibeCheck: "Progress is happening.", luckyItem: "Watch" },
  { hangeul: "안다미로", romanization: "Andamiro", meaning: "Overflowing", vibeCheck: "Abundance is coming.", luckyItem: "Big Mug" },
  { hangeul: "함초롬히", romanization: "Hamchoromhi", meaning: "Wet with dew", vibeCheck: "Fresh and elegant.", luckyItem: "White Shirt" },
  { hangeul: "산들바람", romanization: "Sandeulbaram", meaning: "Gentle Breeze", vibeCheck: "Softness is strength.", luckyItem: "Open Window" },
  { hangeul: "도담도담", romanization: "Dodamdodam", meaning: "Growing well", vibeCheck: "You are doing great.", luckyItem: "Plant Pot" },
  { hangeul: "반짝반짝", romanization: "Banjjak", meaning: "Twinkle Twinkle", vibeCheck: "Time to shine.", luckyItem: "Glitter" },
  { hangeul: "두근두근", romanization: "Dugeun", meaning: "Heartbeat", vibeCheck: "Follow your heart.", luckyItem: "Running Shoes" },
  { hangeul: "사부작", romanization: "Sabujak", meaning: "Soft step", vibeCheck: "Move lightly.", luckyItem: "Sneakers" },
  { hangeul: "오손도손", romanization: "Osondoson", meaning: "Harmonious", vibeCheck: "Share happiness.", luckyItem: "Shared Meal" },
  { hangeul: "싱글벙글", romanization: "Singgeul", meaning: "Beaming Smile", vibeCheck: "Your smile changes the world.", luckyItem: "Camera" },
  { hangeul: "알록달록", romanization: "Allokdallok", meaning: "Colorful", vibeCheck: "Embrace your colors.", luckyItem: "Crayons" },
  { hangeul: "룰루랄라", romanization: "Lullulalla", meaning: "Tra-la-la", vibeCheck: "Happiness is a choice.", luckyItem: "Headphones" },
  { hangeul: "옹기종기", romanization: "Onggijonggi", meaning: "Huddled together", vibeCheck: "Community is strength.", luckyItem: "Group Photo" },
  { hangeul: "차곡차곡", romanization: "Chagokchagok", meaning: "Step by step", vibeCheck: "Build your dreams.", luckyItem: "Brick" },
];

// Shuffle Logic to ensure No Repeats until all words are shown
let availableIndices: number[] = Array.from({ length: WORD_DATABASE.length }, (_, i) => i);

export const getWordOfTheDay = async (): Promise<WordResult> => {
  // Reset if empty
  if (availableIndices.length === 0) {
     availableIndices = Array.from({ length: WORD_DATABASE.length }, (_, i) => i);
  }

  // Pick random
  const randomIndexInPool = Math.floor(Math.random() * availableIndices.length);
  const wordIndex = availableIndices[randomIndexInPool];

  // Remove from pool
  availableIndices.splice(randomIndexInPool, 1);

  return WORD_DATABASE[wordIndex];
};

// --- DUMMY EXPORTS TO PREVENT BUILD ERRORS ---
export const translateName = async (name: string): Promise<TranslationResult> => { throw new Error("Offline"); };
export const chatWithGuide = async (history: any[], message: string): Promise<string> => { return "Offline"; };
export const getCookieFortune = async (): Promise<FortuneResult> => { throw new Error("Offline"); };
export const analyzeFlavorPersonality = async (flavor: any): Promise<FlavorPersonality> => { throw new Error("Offline"); };
