
import React from 'react';
import AdOverlay from './components/AdOverlay';
import Hero from './components/Hero';
import WordGenerator from './components/WordGenerator';

const App: React.FC = () => {
  return (
    <AdOverlay>
      <main className="animate-fade-in flex flex-col items-center min-h-screen">
        <Hero onNavigate={() => {
            const element = document.getElementById('word-game');
            element?.scrollIntoView({ behavior: 'smooth' });
        }} />
        
        <div id="word-game" className="w-full flex justify-center mb-8 px-4">
            <WordGenerator />
        </div>
        
        {/* Spacer for sticky footer */}
        <div className="h-32"></div>
      </main>
    </AdOverlay>
  );
};

export default App;
