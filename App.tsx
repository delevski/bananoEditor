import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ReadyPrompts } from './components/ReadyPrompts';
import { ImageDisplay } from './components/ImageDisplay';
import { Loader } from './components/Loader';
import { editImage } from './services/geminiService';
import type { UploadedImage } from './types';

const API_KEY_STORAGE_KEY = 'gemini-api-key';

const ApiKeyInput: React.FC<{ onApiKeySubmit: (key: string) => void }> = ({ onApiKeySubmit }) => {
  const [localApiKey, setLocalApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localApiKey.trim()) {
      onApiKeySubmit(localApiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center z-50">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-teal-400 mb-2">Enter Your Gemini API Key</h2>
        <p className="text-center text-gray-400 mb-6">You can get a free key from Google AI Studio.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            placeholder="Paste your API key here"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={!localApiKey.trim()}
          >
            Save and Continue
          </button>
        </form>
         <p className="text-xs text-center text-gray-500 mt-4">
            Your key is stored only in your browser's local storage.
        </p>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      setShowApiKeyModal(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      uploadedImages.forEach(image => URL.revokeObjectURL(image.previewUrl));
    };
  }, [uploadedImages]);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    setShowApiKeyModal(false);
    setError(null);
  };
  
  const handleFilesChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setUploadedImages(prev => [...prev, ...newImages]);
      setSelectedImage(newImages[0]); // Auto-select the first new image
      setGeneratedImage(null); // Clear any previous generated image
      setError(null);
    }
  };

  const handleImageSelect = (image: UploadedImage) => {
    setSelectedImage(image);
    setGeneratedImage(null);
    setError(null);
  };
  
  const handlePromptSelect = (selectedPrompt: string) => {
    if (!selectedImage) return;
    setPrompt(selectedPrompt);
  };

  const handleSubmit = useCallback(async () => {
    if (!apiKey) {
      setError('API Key is not set. Please provide your API key.');
      setShowApiKeyModal(true);
      return;
    }
    if (!selectedImage) {
      setError('Please select an image to edit.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a prompt to describe your edit.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await editImage(selectedImage.file, prompt, apiKey);
      setGeneratedImage(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      if (errorMessage.includes("API key not valid") || errorMessage.includes("API key is invalid")) {
          setError("Your API key is invalid. Please enter a valid key.");
          localStorage.removeItem(API_KEY_STORAGE_KEY);
          setApiKey(null);
          setShowApiKeyModal(true);
      } else {
          setError(`An error occurred: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage, prompt, apiKey]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {showApiKeyModal && <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />}
      {isLoading && <Loader />}
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-teal-400">1. Upload Your Images</h2>
            <ImageUploader onFilesChange={handleFilesChange} />
          </section>

          {uploadedImages.length > 0 && (
            <section className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-300">Your Gallery</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {uploadedImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelect(image)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 ring-offset-2 ring-offset-gray-800 ${selectedImage?.previewUrl === image.previewUrl ? 'ring-4 ring-teal-500' : 'ring-2 ring-gray-600 hover:ring-teal-400'}`}
                  >
                    <img src={image.previewUrl} alt={`upload-preview-${index}`} className="w-full h-full object-cover" />
                     {selectedImage?.previewUrl === image.previewUrl && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-teal-400">2. Describe Your Edit</h2>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <ImageDisplay
                originalImageUrl={selectedImage?.previewUrl || null}
                generatedImageUrl={generatedImage}
                hasUploadedImages={uploadedImages.length > 0}
              />
              <div className="mt-6">
                <ReadyPrompts
                  onPromptSelect={handlePromptSelect}
                  disabled={!selectedImage || isLoading}
                />
                <div className="mt-4 flex flex-col md:flex-row gap-4">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={selectedImage ? "e.g., Make the sky a vibrant sunset orange" : "Select an image to enable editing"}
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition disabled:cursor-not-allowed disabled:bg-gray-700/50"
                    rows={2}
                    disabled={!selectedImage || isLoading}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedImage || isLoading}
                    className="bg-teal-600 hover:bg-teal-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : '✨ Generate Image'}
                  </button>
                </div>
                 {error && (
                  <div className="mt-4 bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;