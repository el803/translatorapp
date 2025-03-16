import React from 'react';
import { Keyboard, Mic, Edit3 } from 'lucide-react';
import { InputMethod } from '../types';

interface InputMethodSelectorProps {
  currentMethod: InputMethod;
  onMethodChange: (method: InputMethod) => void;
}

const InputMethodSelector: React.FC<InputMethodSelectorProps> = ({
  currentMethod,
  onMethodChange
}) => {
  return (
    <div className="flex justify-center space-x-2 my-3">
      <button
        onClick={() => onMethodChange('text')}
        className={`p-2 rounded-md flex items-center ${
          currentMethod === 'text'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
        aria-label="Text input"
      >
        <Keyboard className="w-5 h-5 mr-1" />
        <span>Text</span>
      </button>
      
      <button
        onClick={() => onMethodChange('voice')}
        className={`p-2 rounded-md flex items-center ${
          currentMethod === 'voice'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
        aria-label="Voice input"
      >
        <Mic className="w-5 h-5 mr-1" />
        <span>Voice</span>
      </button>
      
      <button
        onClick={() => onMethodChange('handwriting')}
        className={`p-2 rounded-md flex items-center ${
          currentMethod === 'handwriting'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
        aria-label="Handwriting input"
      >
        <Edit3 className="w-5 h-5 mr-1" />
        <span>Handwriting</span>
      </button>
    </div>
  );
};

export default InputMethodSelector;
