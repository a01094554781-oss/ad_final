
import React from 'react';
import { Zap } from 'lucide-react';

interface HeroProps {
  onNavigate: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative w-full py-8 flex flex-col items-center justify-center text-center px-6">
      <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 bg-black text-[#FFD500] font-black rounded-full text-xs uppercase tracking-widest animate-bounce">
        <Zap size={12} fill="currentColor" />
        Daily Korean
        <Zap size={12} fill="currentColor" />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-korean text-white mb-2 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        오늘의 단어
      </h1>
      <h2 className="text-2xl md:text-4xl font-black text-[#FFD500] mb-6 uppercase tracking-tighter drop-shadow-md font-sans">
        Word of the Day
      </h2>

      <p className="text-white/80 font-bold max-w-sm mx-auto mb-8">
        Press the button to get your special Korean word for today!
      </p>

      <button 
        className="cursor-pointer group relative transition-transform hover:scale-105 active:scale-95 duration-200 bg-white text-black font-black px-8 py-3 rounded-full border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase tracking-wider text-lg"
        onClick={onNavigate}
      >
        PLAY NOW
      </button>
    </section>
  );
};

export default Hero;
