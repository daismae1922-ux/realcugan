import React from 'react';
import { Sliders, Volume2, Maximize, Grid, Sparkles } from 'lucide-react';
import { ProcessingParams } from '../App';

interface ParameterControlsProps {
  params: ProcessingParams;
  onParamsChange: (params: ProcessingParams) => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({ params, onParamsChange }) => {
  const updateParam = (key: keyof ProcessingParams, value: any) => {
    onParamsChange({ ...params, [key]: value });
  };

  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        <Sliders className="w-5 h-5 text-indigo-600" />
        Parámetros
      </h3>
      
      {/* Noise Level */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            Reducción de Ruido: {params.noise === -1 ? 'Conservativo' : params.noise === 0 ? 'Ninguno' : `Nivel ${params.noise}`}
          </label>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="-1"
            max="3"
            step="1"
            value={params.noise}
            onChange={(e) => updateParam('noise', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Conservativo</span>
            <span>Ninguno</span>
            <span>Bajo</span>
            <span>Medio</span>
            <span>Alto</span>
          </div>
        </div>
      </div>

      {/* Scale Factor */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Maximize className="w-4 h-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            Factor de Escalado: {params.scale}x
          </label>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((scale) => (
            <button
              key={scale}
              onClick={() => updateParam('scale', scale)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                params.scale === scale
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {scale}x
            </button>
          ))}
        </div>
      </div>

      {/* Tile Size */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            Tamaño de Tile: {params.tileSize === 0 ? 'Automático' : `${params.tileSize}px`}
          </label>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="512"
            step="32"
            value={params.tileSize}
            onChange={(e) => updateParam('tileSize', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Auto</span>
            <span>128px</span>
            <span>256px</span>
            <span>512px</span>
          </div>
        </div>
      </div>

      {/* TTA Mode */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Modo TTA (Test Time Augmentation)
            </label>
          </div>
          <button
            onClick={() => updateParam('tta', !params.tta)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              params.tta ? 'bg-indigo-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                params.tta ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Mejora la calidad pero aumenta significativamente el tiempo de procesamiento
        </p>
      </div>
    </div>
  );
};

export default ParameterControls;