
import React, { useState } from 'react';
import { getWordOfTheDay } from '../services/geminiService';
import { WordResult } from '../types';
import { RefreshCw, Sparkles, ArrowDownCircle, Cookie } from 'lucide-react';

const WordGenerator: React.FC = () => {
  const [result, setResult] = useState<WordResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleGenerate = async () => {
    if (loading) return;

    setLoading(true);
    setIsShaking(true);
    setResult(null);

    try {
      // Reduced artificial delay to 0.5s for snappy feedback
      const [data] = await Promise.all([
        getWordOfTheDay(),
        new Promise(resolve => setTimeout(resolve, 500))
      ]);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsShaking(false);
    }
  };

  const renderCookieChar = (char: string, index: number, isCompact: boolean = false) => (
    <div 
        key={index} 
        className="animate-float relative" 
        style={{
            animationDelay: `${index * 0.1}s`, // Faster animation stagger
            fontFamily: '"Jua", sans-serif'
        }}
    >
        {/* The Authentic Golden Biscuit Effect */}
        <span 
            className={`${isCompact ? 'text-6xl md:text-8xl' : 'text-8xl md:text-9xl'} block relative z-10 leading-none`}
            style={{
                color: '#EBC88F', // Golden biscuit dough color
                // Stacked shadows for 3D extrusion (thickness)
                textShadow: `
                    0px 1px 0px #B98E58,
                    0px 2px 0px #B98E58,
                    0px 3px 0px #B98E58,
                    0px 4px 0px #B98E58,
                    0px 5px 0px #B98E58,
                    0px 6px 0px #B98E58,
                    2px 8px 12px rgba(0,0,0,0.2)
                `,
                filter: 'url(#cookie-texture) contrast(1.05) brightness(1.02)',
                margin: '0 2px',
                WebkitTextStroke: '1px #B98E58'
            }}
        >
            {char}
        </span>
    </div>
  );

  // Helper to split text into two balanced lines
  const renderSplitText = (text: string) => {
    // For 4 chars: splitIndex = 2 (First line 2 chars, Second line 2 chars)
    // For 5 chars: splitIndex = 3 (First line 3 chars, Second line 2 chars)
    const splitIndex = Math.ceil(text.length / 2);
    const firstLine = text.slice(0, splitIndex);
    const secondLine = text.slice(splitIndex);

    return (
        <div className="flex flex-col gap-2 items-center">
            {/* First Line */}
            <div className="flex gap-1 justify-center">
                {firstLine.split('').map((char, i) => renderCookieChar(char, i, true))}
            </div>
            {/* Second Line */}
            <div className="flex gap-1 justify-center">
                {secondLine.split('').map((char, i) => renderCookieChar(char, i + splitIndex, true))}
            </div>
        </div>
    );
  };

  return (
    <section className="w-full flex justify-center max-w-lg">
      <div className={`w-full relative transition-transform duration-100 ${isShaking ? 'animate-shake' : ''}`}>
        
        {/* SVG Filter Definition for Cookie Texture */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="cookie-texture" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#FFF8E1" surfaceScale="1.5" result="light">
                <feDistantLight azimuth="45" elevation="60" />
              </feDiffuseLighting>
              <feComposite operator="in" in="light" in2="SourceGraphic" result="textured" />
              <feBlend in="SourceGraphic" in2="textured" mode="multiply" />
            </filter>
          </defs>
        </svg>

        {/* Vending Machine Body */}
        <div className="bg-[#7B4EBF] rounded-[3rem] border-8 border-black p-6 shadow-[12px_12px_0px_rgba(0,0,0,0.5)] relative overflow-hidden z-10">
          
          <div className="text-center mb-4">
            <span className="bg-black text-[#FFD500] px-4 py-1 rounded-full font-black uppercase text-xs tracking-widest border-2 border-white/20">
              Word Machine
            </span>
          </div>

          {/* Glass Display */}
          <div className="bg-[#FFF9C4] rounded-3xl p-6 mb-6 border-4 border-black/30 min-h-[300px] flex items-center justify-center relative shadow-inner overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(#FBC02D 3px, transparent 3px)',
                backgroundSize: '24px 24px'
            }}></div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/40 via-transparent to-transparent pointer-events-none z-20 rounded-3xl"></div>

            {loading ? (
               <div className="text-center relative z-10">
                 <div className="text-7xl animate-bounce mb-4 filter drop-shadow-md">🍪</div>
                 <p className="text-[#8D6E63] font-black uppercase tracking-widest animate-pulse text-lg">Baking...</p>
               </div>
            ) : !result ? (
                <div className="text-center opacity-40 relative z-10">
                    <Cookie size={64} className="mx-auto mb-3 text-[#8D6E63]" />
                    <p className="text-[#5D4037] font-bold tracking-wide">Press PUSH to bake</p>
                </div>
            ) : (
                <div className="animate-pop-in w-full flex flex-col items-center justify-center relative z-10">
                    
                    {/* Cookie Display Area */}
                    <div className="relative py-6 w-full flex justify-center">
                        {/* Split layout only if word is 4 chars or longer */}
                        {result.hangeul.length >= 4 ? (
                            renderSplitText(result.hangeul)
                        ) : (
                            <div className="flex gap-2 items-center justify-center flex-wrap">
                                {result.hangeul.split('').map((char, i) => renderCookieChar(char, i, false))}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-[#5D4037] font-black uppercase tracking-widest bg-white/60 px-4 py-1 rounded-lg text-sm mb-2 inline-block shadow-sm">
                            {result.romanization}
                        </p>
                        <p className="text-[#3E2723] font-serif-en italic text-xl font-bold">"{result.meaning}"</p>
                    </div>
                </div>
            )}
          </div>

          {/* Controls Area */}
          <div className="flex items-center gap-4 bg-black/30 p-5 rounded-3xl border-t border-white/10">
            <div className="flex-1">
                <div className="flex justify-between text-[10px] font-bold text-[#FFD500] uppercase mb-1">
                    <span>Power</span>
                    <span>Ready</span>
                </div>
                <div className="h-4 bg-black/50 rounded-full w-full mb-2 overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 w-[80%] animate-pulse"></div>
                </div>
            </div>
            
            <button 
                onClick={handleGenerate}
                disabled={loading}
                className="group relative"
            >
                <div className="absolute inset-0 bg-[#C29500] rounded-full transform translate-y-2"></div>
                <div className="relative bg-[#FFD500] active:translate-y-2 text-black font-black text-xl w-24 h-24 rounded-full border-4 border-black flex flex-col items-center justify-center transition-transform leading-none gap-1 group-active:border-t-0 shadow-lg">
                    <span className="drop-shadow-sm">PUSH</span>
                </div>
            </button>
          </div>

          {/* Output Slot */}
          <div className="mt-6 bg-[#1a1a1a] rounded-xl h-20 border-b-4 border-white/10 relative flex items-center justify-center shadow-inner">
             <div className="w-4/5 h-3 bg-black rounded-full opacity-50"></div>
             {result && !loading && (
                 <ArrowDownCircle className="absolute text-[#FFD500] animate-bounce" size={40} />
             )}
          </div>
        </div>

        {/* Result Card */}
        {result && (
            <div className="mt-4 bg-white border-4 border-black rounded-3xl p-6 shadow-[0px_10px_20px_rgba(0,0,0,0.2)] animate-slide-up relative z-0 mx-4">
                <div className="flex justify-between items-center mb-4 border-b-2 border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#FFD500] border border-black"></span>
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            DAILY MESSAGE
                        </span>
                    </div>
                    <Sparkles className="text-[#7B4EBF]" size={20} />
                </div>
                
                <p className="text-xl font-bold text-black leading-relaxed mb-6">
                    "{result.vibeCheck}"
                </p>

                <div className="bg-[#FFF8E1] p-4 rounded-2xl border-2 border-[#FFD500]/30 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D97706] uppercase tracking-wide">Lucky Item</span>
                    <span className="text-lg font-black text-[#433422]">{result.luckyItem}</span>
                </div>

                <button 
                    onClick={handleGenerate}
                    className="w-full mt-6 py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                    <RefreshCw size={18} /> Bake Another
                </button>
            </div>
        )}

      </div>
    </section>
  );
};

export default WordGenerator;
