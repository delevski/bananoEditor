import React from 'react';
import { READY_PROMPTS } from '../constants';

interface ReadyPromptsProps {
  onPromptSelect: (prompt: string) => void;
  disabled?: boolean;
}

export const ReadyPrompts: React.FC<ReadyPromptsProps> = ({ onPromptSelect, disabled }) => {
  return (
    <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-300">Quick Ideas</h3>
        <div className="flex flex-wrap gap-2">
        {READY_PROMPTS.map((prompt, index) => (
            <button
            key={index}
            onClick={() => onPromptSelect(prompt)}
            className="bg-gray-700 hover:bg-gray-600 text-teal-300 text-sm font-medium py-1.5 px-3 rounded-full transition-colors duration-200 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
            disabled={disabled}
            >
            {prompt}
            </button>
        ))}
        </div>
    </div>
  );
};
