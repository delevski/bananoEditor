
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onFilesChange: (files: FileList | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFilesChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilesChange(event.target.files);
    event.target.value = ''; // Reset to allow re-uploading the same file
  };

  return (
    <div
      onClick={handleAreaClick}
      className="border-4 border-dashed border-gray-600 hover:border-teal-500 bg-gray-800 rounded-lg p-8 text-center cursor-pointer transition-colors duration-300"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        multiple
      />
      <div className="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-lg font-semibold text-gray-300">Click to upload or drag and drop</p>
        <p className="text-sm text-gray-400">PNG, JPG, or WEBP</p>
      </div>
    </div>
  );
};
