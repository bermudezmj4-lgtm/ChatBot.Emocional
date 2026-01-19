import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './components/MessageBubble';
import { TypingIndicator } from './components/TypingIndicator';
import { CrisisAlert } from './components/CrisisAlert';
import { useChat } from './hooks/useChat';
import { Heart, RefreshCw, BarChart3, Send } from 'lucide-react';
import { cn } from './utils/cn';

function App() {
  const { 
    messages, 
    isTyping, 
    sendMessage, 
    showCrisisModal,
    closeCrisisModal,
    resetChat
  } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [showStats, setShowStats] = React.useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    setInputValue('');
    await sendMessage(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Calcular estadísticas de emociones
  const emotionStats = messages.reduce((acc, msg) => {
    if (msg.sender === 'user' && msg.emotion) {
      acc[msg.emotion] = (acc[msg.emotion] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const getEmotionEmoji = (emotion: string) => {
    const emojis: Record<string, string> = {
      alegria: '😊', tristeza: '😢', ansiedad: '😰', 
      estres: '😫', frustracion: '😤', cansancio: '😴', neutral: '😐'
    };
    return emojis[emotion] || '😐';
  };

  const getEmotionLabel = (emotion: string) => {
    const labels: Record<string, string> = {
      alegria: 'Alegría', tristeza: 'Tristeza', ansiedad: 'Ansiedad',
      estres: 'Estrés', frustracion: 'Frustración', cansancio: 'Cansancio', neutral: 'Neutral'
    };
    return labels[emotion] || emotion;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-purple-100">
      
      {/* Crisis Modal */}
      <CrisisAlert isVisible={showCrisisModal} onClose={closeCrisisModal} />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                Erick
                <span className="text-xs bg-gradient-to-r from-purple-500 to-purple-700 text-transparent bg-clip-text font-medium">
                  AI
                </span>
              </h1>
              <p className="text-xs text-purple-600">
                Tu amigo virtual de confianza
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowStats(!showStats)}
              className={cn(
                "p-2.5 rounded-xl transition-all duration-200",
                showStats 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-200" 
                  : "bg-purple-100 text-purple-600 hover:bg-purple-200"
              )}
              title="Estadísticas"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button
              onClick={resetChat}
              className="p-2.5 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all duration-200"
              title="Nueva conversación"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Stats Panel */}
      {showStats && Object.keys(emotionStats).length > 0 && (
        <div className="bg-white/90 backdrop-blur-lg border-b border-purple-100 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-purple-600 uppercase tracking-wider mb-2 font-medium">
              Tu estado emocional hoy
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(emotionStats).map(([emotion, count]) => (
                <div 
                  key={emotion}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 text-sm text-purple-700"
                >
                  <span>{getEmotionEmoji(emotion)}</span>
                  <span>{getEmotionLabel(emotion)}</span>
                  <span className="bg-purple-200 px-1.5 rounded-full text-xs">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {messages.length <= 1 ? (
            <div className="flex flex-col items-center justify-center text-center py-12 space-y-8 animate-fade-in">
              <div className="w-28 h-28 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-300 animate-float">
                <span className="text-6xl">👋</span>
              </div>
              
              <div className="space-y-3 max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800">
                  ¡Hey! Soy <span className="bg-gradient-to-r from-purple-500 to-purple-700 text-transparent bg-clip-text">Erick</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Tu amigo virtual de confianza. Estoy aquí para escucharte sin juzgar. 
                  Cuéntame, ¿cómo te sientes hoy? 💜
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mt-4">
                {[
                  { text: "Me siento un poco triste 😔", color: "from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300" },
                  { text: "Tuve un día muy pesado 😫", color: "from-orange-50 to-orange-100 border-orange-200 hover:border-orange-300" },
                  { text: "Estoy ansioso por algo 😰", color: "from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300" },
                  { text: "¡Me pasó algo genial! 🎉", color: "from-green-50 to-green-100 border-green-200 hover:border-green-300" }
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(item.text)}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all duration-200",
                      "bg-gradient-to-br", item.color,
                      "text-gray-700 text-left text-sm font-medium",
                      "hover:scale-[1.02] hover:shadow-md",
                      "group"
                    )}
                  >
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              <TypingIndicator isVisible={isTyping} />
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      {/* Input Area */}
      <div className="bg-white/90 backdrop-blur-lg border-t border-purple-100 p-4 sticky bottom-0">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isTyping ? "Erick está escribiendo..." : "Cuéntame cómo te sientes..."}
                disabled={isTyping}
                rows={1}
                className={cn(
                  "w-full resize-none rounded-2xl",
                  "bg-purple-50 border-2 border-purple-200",
                  "px-5 py-3.5 text-gray-800 placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400",
                  "transition-all duration-200 text-sm",
                  isTyping && "opacity-50 cursor-not-allowed"
                )}
              />
            </div>
            
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={cn(
                "flex items-center justify-center",
                "w-12 h-12 rounded-2xl",
                "bg-gradient-to-br from-purple-500 to-purple-700",
                "text-white font-medium",
                "hover:from-purple-600 hover:to-purple-800",
                "focus:outline-none focus:ring-2 focus:ring-purple-300",
                "transition-all duration-200",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                "shadow-lg shadow-purple-200"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-3 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              🔒 Espacio seguro y confidencial
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>No sustituye ayuda profesional</span>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 py-3 text-center border-t border-purple-100">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Desarrollado con</span>
          <Heart className="w-4 h-4 text-purple-500 fill-current animate-pulse" />
          <span>y</span>
          <span className="font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-transparent bg-clip-text">AI</span>
          <span>por</span>
          <span className="font-bold text-gray-700">AI MJBJ</span>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
