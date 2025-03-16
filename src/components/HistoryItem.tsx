import React from 'react';
import { TranslationEntry } from '../types';
import { getLanguageName } from '../utils/translationService';
import { Clock, Star } from 'lucide-react';

interface HistoryItemProps {
  entry: TranslationEntry;
  onSelect: (entry: TranslationEntry) => void;
  onToggleFavorite: (id: string) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  entry,
  onSelect,
  onToggleFavorite
}) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div 
      className="p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
      onClick={() => onSelect(entry)}
    >
      <div className="flex justify-between items-start mb-1">
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {formatDate(entry.timestamp)}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(entry.id);
          }}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={entry.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star 
            className={`w-4 h-4 ${
              entry.isFavorite 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-400 dark:text-gray-500'
            }`} 
          />
        </button>
      </div>
      <div className="mb-1 text-gray-800 dark:text-white font-medium truncate">
        {entry.sourceText}
      </div>
      <div className="text-gray-600 dark:text-gray-300 text-sm truncate">
        {entry.translatedText}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {getLanguageName(entry.direction.from)} → {getLanguageName(entry.direction.to)}
      </div>
    </div>
  );
};

export default HistoryItem;
