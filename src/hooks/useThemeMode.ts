import { useState, useEffect } from 'react';
import { ThemeMode } from '../types';

export const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Check if theme preference is stored in localStorage
    const savedTheme = localStorage.getItem('themeMode') as ThemeMode | null;
    
    // If not, check for system preference
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Apply theme class to document
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return { themeMode, toggleTheme };
};
