import React from 'react';

interface ImageDisplayProps {
  originalImageUrl: string | null;
  generatedImageUrl: string | null;
  hasUploadedImages: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImageUrl, generatedImageUrl, hasUploadedImages }) => {
  const originalImagePlaceholder = (
    <div className="text-center text-gray-400 px-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p>{hasUploadedImages ? 'Select an image from your gallery' : 'Upload an image to get started'}</p>
    </div>
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-3 text-gray-300">Original</h3>
        <div className="w-full aspect-square bg-gray-700 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
          {originalImageUrl ? (
            <img src={originalImageUrl} alt="Original" className="w-full h-full object-contain" />
          ) : (
            originalImagePlaceholder
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-3 text-gray-300">Edited</h3>
        <div className="w-full aspect-square bg-gray-700 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
          {generatedImageUrl ? (
            <img src={generatedImageUrl} alt="Generated" className="w-full h-full object-contain" />
          ) : (
             <div className="text-center text-gray-400 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p>Your edited image will appear here</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
