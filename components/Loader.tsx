
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl text-white">Generating your masterpiece...</p>
    </div>
  );
};
