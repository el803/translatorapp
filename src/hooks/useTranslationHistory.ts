import { useState, useEffect } from 'react';
import { TranslationEntry } from '../types';

export const useTranslationHistory = () => {
  const [history, setHistory] = useState<TranslationEntry[]>([]);

  // Load history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('translationHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse translation history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('translationHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (entry: Omit<TranslationEntry, 'id' | 'timestamp' | 'isFavorite'>) => {
    const newEntry: TranslationEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: Date.now(),
      isFavorite: false,
    };
    
    setHistory(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const toggleFavorite = (id: string) => {
    setHistory(prev => 
      prev.map(entry => 
        entry.id === id 
          ? { ...entry, isFavorite: !entry.isFavorite } 
          : entry
      )
    );
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getFavorites = () => {
    return history.filter(entry => entry.isFavorite);
  };

  return {
    history,
    addToHistory,
    toggleFavorite,
    clearHistory,
    getFavorites,
  };
};
