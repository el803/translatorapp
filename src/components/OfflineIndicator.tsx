import React from 'react';
import { WifiOff } from 'lucide-react';

interface OfflineIndicatorProps {
  isOfflineMode: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOfflineMode }) => {
  if (!isOfflineMode) return null;
  
  return (
    <div className="flex items-center justify-center py-1 px-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm">
      <WifiOff className="w-4 h-4 mr-1" />
      <span>Offline Mode - Limited translations available</span>
    </div>
  );
};

export default OfflineIndicator;
