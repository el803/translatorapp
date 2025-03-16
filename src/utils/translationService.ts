import { Language, TranslationDirection } from '../types';
import { offlineTranslations } from '../data/offlineTranslations';

// Mock translation service - in a real app, this would connect to a translation API
export const translateText = async (
  text: string,
  direction: TranslationDirection,
  useOfflineMode: boolean = false
): Promise<string> {
  // Simulate network delay
  if (!useOfflineMode) {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Check if we have an offline translation available
  const directionKey = `${direction.from}-to-${direction.to}` as keyof typeof offlineTranslations;
  
  if (useOfflineMode && offlineTranslations[directionKey]) {
    const translations = offlineTranslations[directionKey] as Record<string, string>;
    if (translations[text]) {
      return translations[text];
    }
    
    // If exact match not found but in offline mode, return a message
    return "[Offline translation not available]";
  }
  
  // In a real app, this would call an actual translation API
  // For demo purposes, we'll use a simple mock that returns a modified string
  const mockTranslations: Record<string, string> = {
    'Hello': direction.to === 'id' ? 'Halo' : direction.to === 'zh-CN' ? '你好' : '你好',
    'Good morning': direction.to === 'id' ? 'Selamat pagi' : direction.to === 'zh-CN' ? '早上好' : '早上好',
    'Thank you': direction.to === 'id' ? 'Terima kasih' : direction.to === 'zh-CN' ? '谢谢' : '謝謝',
    'How are you?': direction.to === 'id' ? 'Apa kabar?' : direction.to === 'zh-CN' ? '你好吗？' : '你好嗎？',
    'Goodbye': direction.to === 'id' ? 'Selamat tinggal' : direction.to === 'zh-CN' ? '再见' : '再見',
    'Welcome': direction.to === 'id' ? 'Selamat datang' : direction.to === 'zh-CN' ? '欢迎' : '歡迎',
    'Please': direction.to === 'id' ? 'Tolong' : direction.to === 'zh-CN' ? '请' : '請',
    'Sorry': direction.to === 'id' ? 'Maaf' : direction.to === 'zh-CN' ? '对不起' : '對不起',
    'Yes': direction.to === 'id' ? 'Ya' : direction.to === 'zh-CN' ? '是的' : '是的',
    'No': direction.to === 'id' ? 'Tidak' : direction.to === 'zh-CN' ? '不是' : '不是',
  };

  if (mockTranslations[text]) {
    return mockTranslations[text];
  }

  // For any other text, return a simulated translation
  if (direction.to === 'id') {
    return `[ID] ${text}`;
  } else if (direction.to === 'zh-CN') {
    return `[简体中文] ${text}`;
  } else {
    return `[繁體中文] ${text}`;
  }
};

export const getLanguageName = (code: Language): string => {
  switch (code) {
    case 'id':
      return 'Indonesian';
    case 'zh-CN':
      return 'Chinese (Simplified)';
    case 'zh-TW':
      return 'Chinese (Traditional)';
    default:
      return code;
  }
};

export const textToSpeech = (text: string, language: Language): void => {
  // In a real app, this would use the Web Speech API or a TTS service
  console.log(`Speaking in ${language}: ${text}`);
  
  // Use browser's speech synthesis if available
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language code
    switch (language) {
      case 'id':
        utterance.lang = 'id-ID';
        break;
      case 'zh-CN':
        utterance.lang = 'zh-CN';
        break;
      case 'zh-TW':
        utterance.lang = 'zh-TW';
        break;
    }
    
    window.speechSynthesis.speak(utterance);
  }
};
