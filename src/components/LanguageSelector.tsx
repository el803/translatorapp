import React from 'react';
import { ChevronDown, ArrowLeftRight } from 'lucide-react';
import { Language, TranslationDirection } from '../types';
import { getLanguageName } from '../utils/translationService';

interface LanguageSelectorProps {
  direction: TranslationDirection;
  onDirectionChange: (direction: TranslationDirection) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  direction, 
  onDirectionChange 
}) => {
  const handleSwap = () => {
    onDirectionChange({
      from: direction.to,
      to: direction.from
    });
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDirectionChange({
      ...direction,
      from: e.target.value as Language
    });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDirectionChange({
      ...direction,
      to: e.target.value as Language
    });
  };

  return (
    <div className="flex items-center justify-between w-full bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
      <div className="relative w-2/5">
        <select
          value={direction.from}
          onChange={handleFromChange}
          className="appearance-none w-full bg-transparent py-2 pl-3 pr-8 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        >
          <option value="id">Indonesian</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="zh-TW">Chinese (Traditional)</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
      </div>
      
      <button 
        onClick={handleSwap}
        className="p-2 mx-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-label="Swap languages"
      >
        <ArrowLeftRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      
      <div className="relative w-2/5">
        <select
          value={direction.to}
          onChange={handleToChange}
          className="appearance-none w-full bg-transparent py-2 pl-3 pr-8 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        >
          <option value="id">Indonesian</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="zh-TW">Chinese (Traditional)</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default LanguageSelector;
