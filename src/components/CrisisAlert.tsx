import React from 'react';
import { AlertTriangle, Phone, X, Heart } from 'lucide-react';

interface CrisisAlertProps {
  isVisible: boolean;
  onClose: () => void;
}

export const CrisisAlert: React.FC<CrisisAlertProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const helplines = [
    { country: "España", number: "024", name: "Línea de Atención a la Conducta Suicida" },
    { country: "México", number: "800-290-0024", name: "SAPTEL" },
    { country: "Argentina", number: "(011) 5275-1135", name: "Centro de Asistencia al Suicida" },
    { country: "Chile", number: "600-360-7777", name: "Fono Salud" },
    { country: "Colombia", number: "106", name: "Línea 106" },
    { country: "Perú", number: "(01) 498-2711", name: "Teléfono de la Esperanza" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-purple-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">¿Necesitas ayuda?</h2>
                <p className="text-red-100 text-sm">Estamos aquí para ti</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-2xl border border-purple-100">
            <Heart className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700 text-sm leading-relaxed">
              Noto que puedes estar pasando por un momento muy difícil. 
              <strong className="text-purple-700"> No estás solo/a</strong>. 
              Por favor, considera hablar con un profesional que pueda ayudarte.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-purple-500" />
              Líneas de ayuda 24/7:
            </p>
            <div className="grid gap-2 max-h-48 overflow-y-auto">
              {helplines.map((line, index) => (
                <a
                  key={index}
                  href={`tel:${line.number.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-purple-50 rounded-xl transition-colors group border border-gray-100 hover:border-purple-200"
                >
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-purple-700 text-sm">
                      {line.country}
                    </p>
                    <p className="text-xs text-gray-500">{line.name}</p>
                  </div>
                  <span className="font-bold text-purple-600 text-sm">
                    {line.number}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg shadow-purple-200"
            >
              Entendido, gracias
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
