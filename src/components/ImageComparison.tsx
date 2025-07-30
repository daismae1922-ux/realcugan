import React, { useState } from 'react';
import { ArrowRight, ZoomIn, RotateCcw } from 'lucide-react';

interface ImageComparisonProps {
  originalImage: string;
  processedImage: string | null;
  isProcessing: boolean;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  originalImage,
  processedImage,
  isProcessing
}) => {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {processedImage ? 'Comparación de Resultados' : 'Imagen Original'}
        </h2>
        
        {processedImage && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
            >
              {showComparison ? <RotateCcw className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              {showComparison ? 'Vista Individual' : 'Comparar'}
            </button>
          </div>
        )}
      </div>

      {showComparison && processedImage ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700">Original</h3>
            <div className="relative group">
              <img
                src={originalImage}
                alt="Imagen original"
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-xl" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
              Mejorada
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                IA Enhanced
              </span>
            </h3>
            <div className="relative group">
              <img
                src={processedImage}
                alt="Imagen mejorada"
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-xl" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={originalImage}
            alt="Imagen para procesar"
            className={`w-full h-auto rounded-xl shadow-lg transition-all duration-300 ${
              isProcessing ? 'opacity-75 processing-animation' : ''
            }`}
          />
          
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Procesando con IA...</p>
                <p className="text-gray-500 text-sm mt-1">Esto puede tomar unos momentos</p>
              </div>
            </div>
          )}
          
          {processedImage && !isProcessing && (
            <div className="absolute top-4 right-4">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                Completado
              </div>
            </div>
          )}
        </div>
      )}

      {processedImage && !showComparison && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-green-800 font-medium">¡Imagen mejorada exitosamente!</p>
              <p className="text-green-600 text-sm">La calidad y resolución han sido optimizadas usando IA</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComparison;