
import React, { useState, useEffect } from 'react';
import { X, Clock, ExternalLink } from 'lucide-react';

interface AdOverlayProps {
  children: React.ReactNode;
}

const AdOverlay: React.FC<AdOverlayProps> = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const skipTimer = setTimeout(() => setCanSkip(true), 3000); // 3 sec for better UX

    return () => {
      clearInterval(timer);
      clearTimeout(skipTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#7B4EBF] relative pb-24">
      {/* Top Bar (Ad UI) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-black text-white shadow-md border-b-2 border-[#FFD500]">
        <div className="flex items-center gap-2">
          <span className="bg-[#FFD500] text-black text-xs font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">
            AD
          </span>
          <div className="flex items-center gap-1 text-[#FFD500] text-sm font-mono font-bold">
            <Clock size={14} />
            <span>00:{timeLeft.toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
            {!canSkip ? (
                 <span className="text-xs text-gray-400">Reward loading...</span>
            ) : (
                <a 
                    href="https://hangeulkwaja.com/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm font-bold text-white hover:text-[#FFD500] transition-colors cursor-pointer"
                >
                    SKIP <span className="text-lg">»</span>
                </a>
            )}
            <button className="bg-white/10 hover:bg-white/20 p-1 rounded-full transition-colors text-white">
                <X size={20} />
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-16">
        {children}
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFD500] border-t-4 border-black p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] animate-slide-up">
        <div className="container mx-auto max-w-2xl flex items-center justify-between gap-4">
            <div className="hidden sm:block">
                <p className="font-korean font-black text-black text-xl">한글과자</p>
                <p className="text-xs text-black font-bold">KOREAN ALPHABET COOKIES</p>
            </div>
            <a 
                href="https://hangeulkwaja.com/?NaPm=ct%3Dmitw4ew1%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3Dnull%7Chk%3D7304ed45e84a232479073b6f5c5ccf40f557baaf" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 sm:flex-none bg-black hover:bg-gray-900 text-[#FFD500] font-black text-center py-4 px-8 rounded-full shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-lg"
            >
                GET HANGEUL KWAJA <ExternalLink size={20} />
            </a>
        </div>
      </div>
    </div>
  );
};

export default AdOverlay;
