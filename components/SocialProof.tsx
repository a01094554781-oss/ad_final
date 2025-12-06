import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
    { name: "Jessica K.", text: "It predicted my day! 😲" },
    { name: "Tom", text: "The cookies are so cute." },
    { name: "Ani", text: "Ordered 5 boxes instantly." }
];

const SocialProof: React.FC = () => {
    return (
        <section className="py-10 px-6">
            <div className="max-w-md mx-auto text-center bg-black/20 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <div className="flex justify-center gap-1 mb-3 text-[#FFD500]">
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                </div>
                <p className="text-white font-black text-sm uppercase tracking-wider mb-6">Loved by 10,000+ Fans</p>
                
                <div className="space-y-3">
                    {reviews.map((r, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl shadow-md border-b-4 border-gray-300 flex items-center justify-between">
                            <span className="text-sm text-black font-bold">"{r.text}"</span>
                            <span className="text-xs text-[#7B4EBF] font-black uppercase tracking-wide">- {r.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;