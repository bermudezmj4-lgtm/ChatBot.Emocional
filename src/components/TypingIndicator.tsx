import React from 'react';

interface TypingIndicatorProps {
  isVisible: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-white border border-purple-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-xs">🧠</span>
          </div>
          <span className="text-sm font-semibold text-purple-700">Erick</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
          <span className="text-xs text-gray-400 ml-1">escribiendo...</span>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
