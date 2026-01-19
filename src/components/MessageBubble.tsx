import React from 'react';
import { ChatMessage } from '../types';
import { cn } from '../utils/cn';
import { getEmotionEmoji } from '../utils/emotionDetector';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={cn(
        "flex w-full animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
          isUser 
            ? "bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-br-md" 
            : "bg-white border border-purple-100 text-gray-800 rounded-bl-md shadow-md"
        )}
      >
        {/* Bot avatar */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-purple-100">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-xs">🧠</span>
            </div>
            <span className="text-sm font-semibold text-purple-700">Erick</span>
          </div>
        )}
        
        {/* Message content */}
        <p className={cn(
          "text-sm leading-relaxed whitespace-pre-wrap",
          isUser ? "text-white" : "text-gray-700"
        )}>
          {message.content}
        </p>
        
        {/* Emotion tag for user messages */}
        {isUser && message.emotion && message.emotion !== 'neutral' && (
          <div className="flex items-center justify-end gap-1 mt-2 pt-2 border-t border-white/20">
            <span 
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                "bg-white/20 text-white/90"
              )}
            >
              {getEmotionEmoji(message.emotion)} {message.emotion}
            </span>
          </div>
        )}
        
        {/* Timestamp */}
        <div className={cn(
          "text-xs mt-2 opacity-60",
          isUser ? "text-right text-white/70" : "text-left text-gray-400"
        )}>
          {new Date(message.timestamp).toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
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
