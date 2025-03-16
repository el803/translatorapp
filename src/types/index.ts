export type Language = 'id' | 'zh-CN' | 'zh-TW';

export type TranslationDirection = {
  from: Language;
  to: Language;
};

export type TranslationEntry = {
  id: string;
  sourceText: string;
  translatedText: string;
  direction: TranslationDirection;
  timestamp: number;
  isFavorite: boolean;
};

export type InputMethod = 'text' | 'voice' | 'handwriting';

export type ThemeMode = 'light' | 'dark';
