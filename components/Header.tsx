import React, { useState, useEffect } from 'react';
import { Section } from '../types';

interface HeaderProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-2xl font-black font-korean cursor-pointer text-gray-900"
          onClick={() => onNavigate(Section.HOME)}
        >
          한글과자 <span className="text-orange-600 text-lg font-sans font-bold ml-1">Global</span>
        </div>

        <nav className="hidden md:flex gap-8">
          {[
            { id: Section.HOME, label: 'Home' },
            { id: Section.ABOUT, label: 'About' },
            { id: Section.TRANSLATE, label: 'Name Translator' },
            { id: Section.CHAT, label: 'Culture Guide' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                currentSection === item.id ? 'text-orange-600' : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        <a 
          href="https://hangeulkwaja.com/" 
          target="_blank" 
          rel="noreferrer"
          className="px-5 py-2 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-colors"
        >
          Shop Now
        </a>
      </div>
    </header>
  );
};

export default Header;