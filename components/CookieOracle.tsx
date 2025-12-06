import React, { useState } from 'react';
import { getCookieFortune } from '../services/geminiService';
import { FortuneResult } from '../types';
import { Sparkles, RefreshCw } from 'lucide-react';

const CookieOracle: React.FC = () => {
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'shaking'>('idle');

  const handleReveal = async () => {
    if (loading) return;

    setLoading(true);
    setAnimationState('shaking');
    setResult(null);

    try {
      // Artificial delay for the shake animation (1.5s)
      const [data] = await Promise.all([
        getCookieFortune(),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setAnimationState('idle');
    }
  };

  return (
    <section className="py-8 px-4 w-full flex justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[10px_10px_0px_rgba(0,0,0,1)] border-4 border-black overflow-hidden relative">
        
        {/* Card Header */}
        <div className="bg-[#FFD500] p-4 border-b-4 border-black flex justify-between items-center">
            <span className="font-bold text-black uppercase tracking-wider text-sm flex items-center gap-2">
                <div className="w-3 h-3 bg-black rounded-full"></div> 
                YOUR DESTINY
            </span>
            <div className="flex gap-1">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
        </div>

        {/* Game Area */}
        <div className="p-8 min-h-[400px] flex flex-col items-center justify-center text-center relative bg-white">
            
            {loading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FFD500]/90 backdrop-blur-sm">
                    <div className="text-4xl animate-bounce">🍪</div>
                    <p className="font-black text-black mt-4 text-xl uppercase">Consulting the Spirits...</p>
                </div>
            )}

            {!result ? (
                <>
                    <div 
                        onClick={handleReveal}
                        className={`cursor-pointer transition-transform ${animationState === 'shaking' ? 'animate-shake' : 'hover:scale-105 active:scale-95'}`}
                    >
                        <div className="w-40 h-40 bg-[#7B4EBF] rounded-2xl border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_#000]">
                            <span className="text-6xl text-white font-korean">운</span>
                        </div>
                    </div>
                    <p className="mt-8 text-black font-bold text-lg max-w-[200px]">
                        Tap the Magic Cookie to receive your Hangeul message.
                    </p>
                </>
            ) : (
                <div className="animate-explode w-full">
                    <div className="mb-4">
                        <span className="bg-black text-[#FFD500] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                            LUCKY ITEM: {result.luckyColor.toUpperCase()}
                        </span>
                    </div>
                    
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-[#FFD500] rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative text-9xl font-korean text-[#7B4EBF] drop-shadow-[4px_4px_0px_#000]">
                            {result.character}
                        </div>
                    </div>

                    <h3 className="text-2xl font-black text-black mb-1 uppercase italic">"{result.name}"</h3>
                    <p className="text-gray-500 font-bold text-sm mb-6">Pronunciation: {result.sound}</p>

                    <div className="bg-[#F3E8FF] p-6 rounded-xl border-2 border-black mb-6 relative">
                        <Sparkles className="absolute -top-3 -right-3 text-[#FFD500] fill-[#FFD500]" size={30} />
                        <p className="text-lg text-black font-medium leading-relaxed">
                            "{result.fortune}"
                        </p>
                    </div>

                    <button 
                        onClick={handleReveal}
                        className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide border-2 border-transparent hover:border-[#FFD500]"
                    >
                        <RefreshCw size={18} /> Reveal Another
                    </button>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default CookieOracle;