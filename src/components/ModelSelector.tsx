import React from 'react';
import { Brain, Zap, Image as ImageIcon } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  const models = [
    {
      id: 'models-se',
      name: 'SE (Squeeze-and-Excitation)',
      description: 'Modelo equilibrado para uso general',
      icon: Brain,
      recommended: true
    },
    {
      id: 'models-pro',
      name: 'Pro',
      description: 'Máxima calidad, mayor tiempo de procesamiento',
      icon: Zap,
      recommended: false
    },
    {
      id: 'models-nose',
      name: 'No-SE',
      description: 'Procesamiento rápido, menor calidad',
      icon: ImageIcon,
      recommended: false
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Modelo de IA</h3>
      
      <div className="space-y-3">
        {models.map((model) => {
          const Icon = model.icon;
          return (
            <div
              key={model.id}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedModel === model.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => onModelChange(model.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedModel === model.id
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{model.name}</h4>
                    {model.recommended && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{model.description}</p>
                </div>
                
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedModel === model.id
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-gray-300'
                }`}>
                  {selectedModel === model.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModelSelector;