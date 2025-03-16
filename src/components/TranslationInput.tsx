import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, MicOff, Edit3 } from 'lucide-react';
import { InputMethod, Language } from '../types';

interface TranslationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  inputMethod: InputMethod;
  language: Language;
  placeholder?: string;
}

const TranslationInput: React.FC<TranslationInputProps> = ({
  value,
  onChange,
  onSubmit,
  inputMethod,
  language,
  placeholder = 'Enter text to translate...'
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize canvas for handwriting
  useEffect(() => {
    if (inputMethod === 'handwriting' && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        contextRef.current = context;
      }
    }
  }, [inputMethod]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleClear = () => {
    onChange('');
    if (inputMethod === 'handwriting' && contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (contextRef.current) {
      const { offsetX, offsetY } = e.nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
      setIsDrawing(false);
      
      // In a real app, here we would send the canvas data to a handwriting recognition API
      // For demo purposes, we'll just set a placeholder text
      onChange(`[Handwritten text in ${language === 'id' ? 'Indonesian' : 'Chinese'}]`);
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    
    // In a real app, this would use the Web Speech API or a speech recognition service
    // For demo purposes, we'll just simulate recording
    setTimeout(() => {
      stopVoiceRecording();
    }, 3000);
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    
    // Simulate receiving transcribed text
    onChange(`[Voice input in ${language === 'id' ? 'Indonesian' : 'Chinese'}]`);
  };

  return (
    <div className="w-full">
      {inputMethod === 'text' && (
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px] bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            dir={language.startsWith('zh') ? 'ltr' : 'ltr'}
          />
          
          {value && (
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
              aria-label="Clear text"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
          
          <button
            onClick={onSubmit}
            disabled={!value.trim()}
            className={`absolute bottom-2 right-2 p-2 rounded-full ${
              value.trim() 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Translate"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {inputMethod === 'voice' && (
        <div className="flex flex-col items-center justify-center p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
          <button
            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
            className={`p-6 rounded-full ${
              isRecording 
                ? 'bg-red-500 animate-pulse' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white mb-4`}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
          >
            {isRecording ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
          
          <p className="text-gray-600 dark:text-gray-300 text-center">
            {isRecording 
              ? 'Listening...' 
              : `Tap to speak in ${language === 'id' ? 'Indonesian' : 'Chinese'}`}
          </p>
          
          {value && (
            <div className="mt-4 w-full">
              <p className="text-gray-800 dark:text-white p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {value}
              </p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleClear}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                  aria-label="Clear recording"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                <button
                  onClick={onSubmit}
                  className="ml-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                  aria-label="Translate recording"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {inputMethod === 'handwriting' && (
        <div className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
          <div className="relative w-full h-48 mb-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="absolute top-0 left-0 w-full h-full cursor-crosshair"
            />
            <div className="absolute top-2 right-2">
              <button
                onClick={handleClear}
                className="p-1 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm"
                aria-label="Clear drawing"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
            {`Write in ${language === 'id' ? 'Indonesian' : 'Chinese'}`}
          </p>
          
          {value && (
            <div className="w-full">
              <p className="text-gray-800 dark:text-white p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {value}
              </p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={onSubmit}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                  aria-label="Translate handwriting"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}<pivotalAction type="file" filePath="src/components/TranslationResult.tsx">import React from 'react';
import { Volume2, Copy, Star } from 'lucide-react';
import { Language } from '../types';
import { textToSpeech } from '../utils/translationService';

interface TranslationResultProps {
  text: string;
  language: Language;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const TranslationResult: React.FC<TranslationResultProps> = ({
  text,
  language,
  isFavorite = false,
  onToggleFavorite
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Show a temporary success message (in a real app)
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleSpeak = () => {
    textToSpeech(text, language);
  };

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {language === 'id' ? 'Indonesian' : language === 'zh-CN' ? 'Chinese (Simplified)' : 'Chinese (Traditional)'}
        </h3>
        <div className="flex space-x-2">
          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star 
                className={`w-5 h-5 ${
                  isFavorite 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-400 dark:text-gray-500'
                }`} 
              />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Copy to clipboard"
          >
            <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={handleSpeak}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Listen to pronunciation"
          >
            <Volume2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <p className="text-lg text-gray-800 dark:text-white break-words">
        {text}
      </p>
    </div>
  );
};

export default TranslationResult;
