
import React, { useState } from 'react';
import { analyzeFlavorPersonality } from '../services/geminiService';
import { FlavorPersonality } from '../types';
import { RefreshCw, Check, Sparkles, Flame, Heart } from 'lucide-react';

const FlavorBattle: React.FC = () => {
  const [result, setResult] = useState<FlavorPersonality | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<'garlic' | 'choco' | null>(null);

  const handleSelect = async (flavor: 'garlic' | 'choco') => {
    if (loading) return;

    setSelectedFlavor(flavor);
    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeFlavorPersonality(flavor);
      setResult(data);
    } catch (err) {
      console.error(err);
      setSelectedFlavor(null); // Reset on error
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setSelectedFlavor(null);
  };

  // Product Colors based on photos
  // Garlic: Yellow Box (#FFD500)
  // Choco: Dark Brown/Black Box (#2C2416)

  return (
    <section className="py-8 px-4 w-full flex justify-center">
      <div className="w-full max-w-4xl">
        
        {!result ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Garlic Option */}
            <div 
              onClick={() => handleSelect('garlic')}
              className={`flex-1 relative group cursor-pointer transition-all duration-300 ${selectedFlavor === 'choco' ? 'opacity-50 scale-95' : 'hover:scale-105'} ${selectedFlavor === 'garlic' ? 'scale-110 z-10' : ''}`}
            >
              <div className="absolute -inset-2 bg-black rounded-[2.5rem] translate-y-2 translate-x-2"></div>
              <div className="relative h-80 bg-[#FFD500] rounded-[2rem] border-4 border-black p-6 flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_20%,transparent_20%)] bg-[length:16px_16px] opacity-20"></div>
                
                {loading && selectedFlavor === 'garlic' ? (
                  <RefreshCw className="animate-spin text-black" size={48} />
                ) : (
                  <>
                    <div className="bg-white p-4 rounded-full border-4 border-black mb-4 shadow-md rotate-[-10deg] group-hover:rotate-0 transition-transform">
                      <span className="text-4xl">🧄</span>
                    </div>
                    <h3 className="text-4xl font-korean text-black mb-2">마늘맛</h3>
                    <p className="font-black text-black uppercase tracking-wider text-sm bg-white px-2 py-1 border-2 border-black rounded-md transform -rotate-2">
                      Original Garlic
                    </p>
                    <div className="mt-6 flex gap-2">
                      <span className="font-korean text-2xl text-black/20 group-hover:text-black/50 transition-colors">ㄱ</span>
                      <span className="font-korean text-2xl text-black/20 group-hover:text-black/50 transition-colors">ㅋ</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* VS Badge */}
            <div className="hidden md:flex items-center justify-center z-20">
              <div className="bg-black text-white font-black text-2xl p-4 rounded-full border-4 border-white shadow-xl animate-pulse">
                VS
              </div>
            </div>

            {/* Choco Option */}
            <div 
              onClick={() => handleSelect('choco')}
              className={`flex-1 relative group cursor-pointer transition-all duration-300 ${selectedFlavor === 'garlic' ? 'opacity-50 scale-95' : 'hover:scale-105'} ${selectedFlavor === 'choco' ? 'scale-110 z-10' : ''}`}
            >
              <div className="absolute -inset-2 bg-black rounded-[2.5rem] translate-y-2 translate-x-2"></div>
              <div className="relative h-80 bg-[#2C2416] rounded-[2rem] border-4 border-black p-6 flex flex-col items-center justify-center text-center overflow-hidden">
                 {/* Abstract Choco Drips */}
                 <div className="absolute top-0 left-0 w-full h-8 bg-[#4a3b2a] rounded-b-xl opacity-50"></div>
                 <div className="absolute top-0 right-8 w-4 h-16 bg-[#4a3b2a] rounded-b-xl opacity-50"></div>

                {loading && selectedFlavor === 'choco' ? (
                  <RefreshCw className="animate-spin text-white" size={48} />
                ) : (
                  <>
                    <div className="bg-white p-4 rounded-full border-4 border-black mb-4 shadow-md rotate-[10deg] group-hover:rotate-0 transition-transform">
                      <span className="text-4xl">🍫</span>
                    </div>
                    <h3 className="text-4xl font-korean text-white mb-2">초코맛</h3>
                    <p className="font-black text-[#2C2416] uppercase tracking-wider text-sm bg-[#FFD500] px-2 py-1 border-2 border-black rounded-md transform rotate-2">
                      Sweet Kalphabets
                    </p>
                    <div className="mt-6 flex gap-2">
                      <span className="font-korean text-2xl text-white/20 group-hover:text-white/50 transition-colors">ㅁ</span>
                      <span className="font-korean text-2xl text-white/20 group-hover:text-white/50 transition-colors">ㅇ</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="animate-explode bg-white rounded-[2rem] border-4 border-black p-8 shadow-[8px_8px_0px_#000] text-center max-w-md mx-auto relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-4 ${selectedFlavor === 'garlic' ? 'bg-[#FFD500]' : 'bg-[#2C2416]'}`}></div>
            
            <div className="mb-4 inline-block">
               {selectedFlavor === 'garlic' ? (
                   <span className="bg-[#FFD500] text-black border-2 border-black px-4 py-1 rounded-full font-black uppercase text-xs flex items-center gap-2">
                     <Flame size={14} /> Team Garlic
                   </span>
               ) : (
                   <span className="bg-[#2C2416] text-white border-2 border-black px-4 py-1 rounded-full font-black uppercase text-xs flex items-center gap-2">
                     <Heart size={14} /> Team Choco
                   </span>
               )}
            </div>

            <h2 className="text-4xl font-black text-black mb-2 uppercase leading-none">{result.powerWord}</h2>
            <h3 className="text-xl font-bold text-[#7B4EBF] mb-6 italic">{result.title}</h3>

            <div className="bg-gray-100 p-6 rounded-xl border-2 border-black mb-6 relative text-left">
              <Sparkles className="absolute -top-3 -right-3 text-[#FFD500] fill-[#FFD500]" size={30} />
              <p className="text-gray-800 font-medium leading-relaxed">
                "{result.description}"
              </p>
              <div className="mt-4 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">Snack Match</span>
                <span className="text-xl font-black text-black">{result.matchPercent}%</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={reset}
                className="flex-1 py-3 bg-white text-black font-bold rounded-xl border-2 border-black hover:bg-gray-50 transition-colors uppercase text-sm"
              >
                Try Again
              </button>
              <a 
                href="https://hangeulkwaja.com/" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 py-3 bg-[#FFD500] text-black font-black rounded-xl border-2 border-black hover:bg-[#FFC000] transition-colors uppercase text-sm flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000] active:shadow-none active:translate-y-[2px]"
              >
                Buy Pack
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default FlavorBattle;
