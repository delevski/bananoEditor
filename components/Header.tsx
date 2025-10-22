
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
        <span className="text-3xl mr-3">🎨</span>
        <h1 className="text-3xl font-bold text-white tracking-wider">
          Gemini Image <span className="text-teal-400">Editor</span>
        </h1>
      </div>
    </header>
  );
};
