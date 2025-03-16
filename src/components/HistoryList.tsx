import React from 'react';
import { TranslationEntry } from '../types';
import HistoryItem from './HistoryItem';
import { History, Star, Trash2 } from 'lucide-react';

interface HistoryListProps {
  history: TranslationEntry[];
  onSelectEntry: (entry: TranslationEntry) => void;
  onToggleFavorite: (id: string) => void;
  onClearHistory: () => void;
  showFavoritesOnly: boolean;
  onToggleShowFavorites: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelectEntry,
  onToggleFavorite,
  onClearHistory,
  showFavoritesOnly,
  onToggleShowFavorites
}) => {
  const displayedHistory = showFavoritesOnly 
    ? history.filter(entry => entry.isFavorite)
    : history;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
          {showFavoritesOnly ? (
            <>
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              Favorites
            </>
          ) : (
            <>
              <History className="w-5 h-5 mr-2" />
              History
            </>
          )}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={onToggleShowFavorites}
            className={`p-2 rounded-md ${
              showFavoritesOnly
                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            aria-label={showFavoritesOnly ? 'Show all history' : 'Show favorites only'}
          >
            <Star className="w-4 h-4" />
          </button>
          {displayedHistory.length > 0 && (
            <button
              onClick={onClearHistory}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-300"
              aria-label="Clear history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {displayedHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-2">
              {showFavoritesOnly ? (
                <Star className="w-12 h-12 mx-auto mb-2" />
              ) : (
                <History className="w-12 h-12 mx-auto mb-2" />
              )}
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              {showFavoritesOnly
                ? 'No favorite translations yet'
                : 'No translation history yet'}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              {showFavoritesOnly
                ? 'Star translations to add them to favorites'
                : 'Translations will appear here'}
            </p>
          </div>
        ) : (
          displayedHistory.map(entry => (
            <HistoryItem
              key={entry.id}
              entry={entry}
              onSelect={onSelectEntry}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryList;
