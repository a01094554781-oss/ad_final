import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2A2015] text-[#A09080] pt-20 pb-10 border-t border-[#3E3020]">
      <div className="container mx-auto px-6">
        
        {/* Newsletter / CTA Area */}
        <div className="bg-[#D97706] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="relative z-10">
                <h3 className="text-white text-3xl font-serif-en font-bold mb-2">Want to buy the real cookies?</h3>
                <p className="text-orange-100">Visit our official store to order or find a retailer in Seoul.</p>
            </div>
            <a 
                href="https://hangeulkwaja.com/" 
                target="_blank" 
                rel="noreferrer"
                className="relative z-10 px-8 py-4 bg-white text-[#D97706] font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
                Visit Official Store
            </a>
        </div>

        <div className="grid md:grid-cols-4 gap-12 border-b border-[#3E3020] pb-12">
          <div className="col-span-2">
            <h3 className="text-white text-2xl font-black font-serif-kr mb-6">한글과자 <span className="text-orange-600 text-lg font-sans">Global</span></h3>
            <p className="mb-6 max-w-sm leading-relaxed">
              We bake culture into every bite. <br/>
              Hangeul Kwaja is the premier edible educational souvenir from South Korea, designed to share the beauty of our alphabet with the world.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest text-[#D97706]">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="https://hangeulkwaja.com/?NaPm=ct%3Dmitw4ew1%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3Dnull%7Chk%3D7304ed45e84a232479073b6f5c5ccf40f557baaf" target="_blank" className="hover:text-white transition-colors">Shop Online</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Sets</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest text-[#D97706]">Connect</h4>
            <ul className="space-y-4">
              <li>Seoul, South Korea</li>
              <li>hello@hangeulkwaja.com</li>
              <li className="flex gap-4 mt-4">
                  {/* Social Icons Placeholder */}
                  <div className="w-8 h-8 bg-[#3E3020] rounded-full hover:bg-[#D97706] cursor-pointer transition-colors"></div>
                  <div className="w-8 h-8 bg-[#3E3020] rounded-full hover:bg-[#D97706] cursor-pointer transition-colors"></div>
                  <div className="w-8 h-8 bg-[#3E3020] rounded-full hover:bg-[#D97706] cursor-pointer transition-colors"></div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-sm text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Hangeul Kwaja. All rights reserved.</p>
          <div className="flex gap-6">
              <span className="cursor-pointer hover:text-white">Privacy Policy</span>
              <span className="cursor-pointer hover:text-white">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;