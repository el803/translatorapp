import React, { useState } from 'react';
import { X, Check, ChevronRight } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: string;
  onFontSizeChange: (size: string) => void;
  useOfflineMode: boolean;
  onOfflineModeChange: (enabled: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  fontSize,
  onFontSizeChange,
  useOfflineMode,
  onOfflineModeChange
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'about'>('general');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close settings"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'general'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'about'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            About
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'general' && (
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Font Size</h3>
                <div className="flex flex-col space-y-2">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => onFontSizeChange(size)}
                      className="flex justify-between items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <span className={`text-gray-800 dark:text-white ${
                        size === 'small' ? 'text-sm' : 
                        size === 'medium' ? 'text-base' : 
                        'text-lg'
                      }`}>
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </span>
                      {fontSize === size && (
                        <Check className="w-5 h-5 text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Translation</h3>
                <div className="flex justify-between items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-gray-800 dark:text-white">Offline Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={useOfflineMode}
                      onChange={(e) => onOfflineModeChange(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 px-1">
                  When enabled, translation will work without internet connection but with limited phrases.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'about' && (
            <div className="p-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  ID-CN Translator
                </h3>
                <p className="text-gray-600 dark:text-gray-300">Version 1.0.0</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Features</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Bidirectional translation between Indonesian and Chinese</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Support for both Simplified and Traditional Chinese</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Multiple input methods: text, voice, and handwriting</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Offline translation for essential phrases</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Translation history and favorites</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>© 2023 ID-CN Translator</p>
                <p className="mt-1">All rights reserved</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
