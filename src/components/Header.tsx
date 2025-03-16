import React from 'react';
import { Moon, Sun, Settings } from 'lucide-react';
import { ThemeMode } from '../types';

interface HeaderProps {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  openSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ themeMode, toggleTheme, openSettings }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          ID-CN Translator
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {themeMode === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Sun className="w-5 h-5 text-gray-300" />
          )}
        </button>
        <button
          onClick={openSettings}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Open settings"
        >
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
};

export default Header;
