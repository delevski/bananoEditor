import { GoogleGenAI, Modality } from "@google/genai";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to read file as base64 string.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export const editImage = async (imageFile: File, prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is not configured. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const base64Data = await fileToBase64(imageFile);

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: imageFile.type,
    },
  };

  const textPart = {
    text: prompt,
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [imagePart, textPart],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  const candidate = response.candidates?.[0];

  if (candidate && candidate.content && candidate.content.parts) {
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }
  
  const blockReason = candidate?.finishReason;
  if (blockReason && blockReason !== 'STOP') {
      throw new Error(`Image generation was blocked due to: ${blockReason}.`);
  }

  throw new Error("No image was generated. The response from the API was empty or did not contain image data.");
};