import React from 'react';
import { Gift, Heart, Shapes } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-korean text-[#433422] mb-4">
            한글과자의 특별함
          </h2>
          <p className="text-lg text-gray-500 font-light">Why Hangeul Kwaja is the perfect souvenir</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-3xl bg-[#FFF8E1] text-[#FFD500] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Shapes size={40} />
            </div>
            <h3 className="text-2xl font-bold text-[#433422] mb-3 font-serif-en">Authentic Shapes</h3>
            <p className="text-gray-600 leading-relaxed">
              Baked in the exact shapes of Korean consonants from ㄱ to ㅎ. Build words, learn names, and eat them!
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-3xl bg-[#FFF1F0] text-[#FF6B6B] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Heart size={40} />
            </div>
            <h3 className="text-2xl font-bold text-[#433422] mb-3 font-serif-en">Healthy & Tasty</h3>
            <p className="text-gray-600 leading-relaxed">
              Made with premium Korean rice and healthy ingredients. Subtle sweetness that everyone loves.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-3xl bg-[#F0F7FF] text-[#4DA6FF] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Gift size={40} />
            </div>
            <h3 className="text-2xl font-bold text-[#433422] mb-3 font-serif-en">Perfect Gift</h3>
            <p className="text-gray-600 leading-relaxed">
              The most unique and meaningful gift for friends back home. Share the story of King Sejong.
            </p>
          </div>
        </div>

        {/* Image / Break */}
        <div className="mt-20 rounded-[3rem] overflow-hidden relative h-[400px] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1532499012374-fdfae50e73e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Hangeul Kwaja Lifestyle" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-6">
                    <p className="text-3xl font-korean mb-4">"우리 말이 맛있다!"</p>
                    <p className="text-xl font-serif-en opacity-90">Taste the beauty of Korea.</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;