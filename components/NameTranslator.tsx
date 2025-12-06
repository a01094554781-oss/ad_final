
import React, { useState } from 'react';
import { translateName } from '../services/geminiService';
import { TranslationResult } from '../types';
import { Sparkles, RefreshCw, ChefHat, Volume2 } from 'lucide-react';

const NameTranslator: React.FC = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await translateName(name);
      setResult(data);
    } catch (err) {
      setError("Oven is overheating! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-[#F9F5F0] ring-4 ring-[#E7DBCB]">
        
        {/* Game Header */}
        <div className="bg-[#433422] p-6 text-center relative">
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-red-500 border-2 border-red-300"></div>
            <div className="absolute top-4 right-4 text-[#FFD500] font-mono text-xs">LEVEL 1</div>
            <ChefHat className="mx-auto text-[#FFD500] mb-2" size={32} />
            <h2 className="text-2xl font-korean text-white">이름 굽기</h2>
            <p className="text-white/60 text-sm font-serif-en">The Bakery Mini-Game</p>
        </div>

        {/* Game Area */}
        <div className="p-6 bg-[#FFF8E7] min-h-[400px] flex flex-col justify-center">
            
            {!result ? (
                <>
                    <div className="text-center mb-8">
                        <p className="text-[#433422] font-bold text-lg mb-2">Enter your name to start!</p>
                        <p className="text-[#8C7B6B] text-sm">We will turn it into a delicious cookie.</p>
                    </div>

                    <form onSubmit={handleTranslate} className="space-y-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Sarah"
                            className="w-full px-6 py-4 rounded-xl text-[#433422] text-center text-2xl font-bold bg-white border-2 border-[#E7DBCB] focus:border-[#D97706] focus:outline-none placeholder:text-gray-300 shadow-inner"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={loading || !name}
                            className="w-full py-4 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xl rounded-xl shadow-[0_4px_0_#92400e] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                        >
                            {loading ? <RefreshCw className="animate-spin" /> : 'BAKE IT!'}
                        </button>
                    </form>
                </>
            ) : (
                <div className="animate-pop-in text-center">
                    <div className="mb-2">
                        <span className="bg-[#A8D5BA] text-[#1a5336] text-xs font-bold px-3 py-1 rounded-full uppercase">Success!</span>
                    </div>
                    
                    <h3 className="text-4xl font-korean text-[#433422] mb-1">{result.hangeul}</h3>
                    <p className="text-[#D97706] font-serif-en font-bold italic mb-6">{result.romanization}</p>

                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                        {result.characters.map((char, idx) => (
                            <div key={idx} className="flex flex-col items-center animate-bounce-short" style={{animationDelay: `${idx * 0.1}s`}}>
                                <div className="w-20 h-20 rounded-lg bg-[#D4A373] flex items-center justify-center text-[#5D4037] text-4xl font-korean shadow-lg border-b-4 border-[#C28E5D]">
                                    {char.char}
                                </div>
                                <span className="text-[10px] font-bold text-[#8C7B6B] mt-1">{char.visualShape.split(' ')[0]}...</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="bg-white/50 p-3 rounded-lg border border-[#E7DBCB] mb-6">
                        <p className="text-sm text-[#433422] font-medium">"{result.meaning}"</p>
                    </div>

                    <button 
                        onClick={() => setResult(null)}
                        className="w-full py-3 bg-[#433422] text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={16} /> Try Another Name
                    </button>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default NameTranslator;
