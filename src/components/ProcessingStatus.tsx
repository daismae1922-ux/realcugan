import React from 'react';
import { Cpu, Zap, CheckCircle } from 'lucide-react';

interface ProcessingStatusProps {
  progress: number;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ progress }) => {
  const getStatusInfo = () => {
    if (progress < 30) {
      return {
        icon: Cpu,
        title: 'Inicializando procesamiento...',
        description: 'Preparando la imagen y cargando el modelo de IA'
      };
    } else if (progress < 70) {
      return {
        icon: Zap,
        title: 'Procesando con IA...',
        description: 'Aplicando algoritmos de mejora de imagen'
      };
    } else if (progress < 100) {
      return {
        icon: CheckCircle,
        title: 'Finalizando...',
        description: 'Optimizando el resultado final'
      };
    } else {
      return {
        icon: CheckCircle,
        title: '¡Completado!',
        description: 'La imagen ha sido mejorada exitosamente'
      };
    }
  };

  const statusInfo = getStatusInfo();
  const Icon = statusInfo.icon;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{statusInfo.title}</h3>
          <p className="text-gray-600 text-sm">{statusInfo.description}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progreso</span>
          <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">AI</div>
            <div className="text-xs text-gray-600">Procesamiento</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">GPU</div>
            <div className="text-xs text-gray-600">Aceleración</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">4K</div>
            <div className="text-xs text-gray-600">Resolución</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;