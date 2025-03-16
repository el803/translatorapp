import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import InputMethodSelector from './components/InputMethodSelector';
import TranslationInput from './components/TranslationInput';
import TranslationResult from './components/TranslationResult';
import HistoryList from './components/HistoryList';
import SettingsModal from './components/SettingsModal';
import OfflineIndicator from './components/OfflineIndicator';
import { useThemeMode } from './hooks/useThemeMode';
import { useTranslationHistory } from './hooks/useTranslationHistory';
import { translateText } from './utils/translationService';
import { Language, TranslationDirection, InputMethod, TranslationEntry } from './types';
import { History, X } from 'lucide-react';

const App: React.FC = () => {
  // State for translation
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [direction, setDirection] = useState<TranslationDirection>({
    from: 'id',
    to: 'zh-CN'
  });
  const [inputMethod, setInputMethod] = useState<InputMethod>('text');
  const [isTranslating, setIsTranslating] = useState(false);
  
  // State for UI
  const { themeMode, toggleTheme } = useThemeMode();
  const [fontSize, setFontSize] = useState<string>(() => {
    return localStorage.getItem('fontSize') || 'medium';
  });
  const [showHistory, setShowHistory] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [useOfflineMode, setUseOfflineMode] = useState<boolean>(() => {
    return localStorage.getItem('useOfflineMode') === 'true';
  });
  
  // History management
  const { 
    history, 
    addToHistory, 
    toggleFavorite, 
    clearHistory, 
    getFavorites 
  } = useTranslationHistory();

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('useOfflineMode', useOfflineMode.toString());
  }, [useOfflineMode]);

  // Handle translation
  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    
    try {
      const result = await translateText(sourceText, direction, useOfflineMode);
      setTranslatedText(result);
      
      // Add to history
      addToHistory({
        sourceText,
        translatedText: result,
        direction
      });
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error: Could not translate text');
    } finally {
      setIsTranslating(false);
    }
  };

  // Handle selecting an entry from history
  const handleSelectHistoryEntry = (entry: TranslationEntry) => {
    setSourceText(entry.sourceText);
    setTranslatedText(entry.translatedText);
    setDirection(entry.direction);
    setShowHistory(false);
  };

  // Handle clearing history
  const handleClearHistory = () => {
    if (showFavoritesOnly) {
      // Only clear favorites
      history.forEach(entry => {
        if (entry.isFavorite) {
          toggleFavorite(entry.id);
        }
      });
    } else {
      clearHistory();
    }
  };

  // Get font size class
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col ${getFontSizeClass()}`}>
      <Header 
        themeMode={themeMode} 
        toggleTheme={toggleTheme} 
        openSettings={() => setSettingsOpen(true)} 
      />
      
      <OfflineIndicator isOfflineMode={useOfflineMode} />
      
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Translation Panel */}
        <div className="flex-1 p-4 flex flex-col">
          <LanguageSelector 
            direction={direction} 
            onDirectionChange={setDirection} 
          />
          
          <InputMethodSelector 
            currentMethod={inputMethod} 
            onMethodChange={setInputMethod} 
          />
          
          <div className="mb-4">
            <TranslationInput 
              value={sourceText}
              onChange={setSourceText}
              onSubmit={handleTranslate}
              inputMethod={inputMethod}
              language={direction.from}
              placeholder={`Enter text in ${direction.from === 'id' ? 'Indonesian' : 'Chinese'}...`}
            />
          </div>
          
          {isTranslating ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-pulse text-gray-500 dark:text-gray-400">
                Translating...
              </div>
            </div>
          ) : translatedText ? (
            <TranslationResult 
              text={translatedText} 
              language={direction.to}
              isFavorite={history.length > 0 && history[0].isFavorite}
              onToggleFavorite={() => history.length > 0 && toggleFavorite(history[0].id)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p>Enter text and tap translate</p>
                <p className="text-sm mt-1">
                  {useOfflineMode 
                    ? 'Offline mode is enabled - limited translations available' 
                    : 'Online mode - full translation capabilities'}
                </p>
              </div>
            </div>
          )}
          
          {/* Mobile History Toggle Button */}
          <div className="md:hidden mt-4 flex justify-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center justify-center p-2 rounded-full bg-blue-500 text-white shadow-md"
              aria-label={showHistory ? 'Hide history' : 'Show history'}
            >
              {showHistory ? (
                <X className="w-6 h-6" />
              ) : (
                <History className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* History Panel - Hidden on mobile unless toggled */}
        <div className={`
          md:w-80 bg-white dark:bg-gray-800 shadow-md
          ${showHistory ? 'block' : 'hidden md:block'}
          md:flex-shrink-0 md:border-l md:border-gray-200 md:dark:border-gray-700
          absolute md:relative top-0 left-0 right-0 bottom-0 z-10 md:z-0
          h-[calc(100vh-64px)] md:h-auto mt-16 md:mt-0
        `}>
          <HistoryList 
            history={history}
            onSelectEntry={handleSelectHistoryEntry}
            onToggleFavorite={toggleFavorite}
            onClearHistory={handleClearHistory}
            showFavoritesOnly={showFavoritesOnly}
            onToggleShowFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
          />
        </div>
      </main>
      
      <SettingsModal 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        useOfflineMode={useOfflineMode}
        onOfflineModeChange={setUseOfflineMode}
      />
    </div>
  );
};

export default App;
