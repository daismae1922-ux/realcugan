import React, { useState, useCallback, useRef } from 'react';
import { Upload, Download, Zap, Settings, Info, Image as ImageIcon, Sparkles, ArrowRight } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import ImageProcessor from './components/ImageProcessor';
import ModelSelector from './components/ModelSelector';
import ParameterControls from './components/ParameterControls';
import ImageComparison from './components/ImageComparison';
import ProcessingStatus from './components/ProcessingStatus';
import Header from './components/Header';
import Footer from './components/Footer';

export interface ProcessingParams {
  noise: number;
  scale: number;
  model: string;
  tileSize: number;
  tta: boolean;
}

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingParams, setProcessingParams] = useState<ProcessingParams>({
    noise: -1,
    scale: 2,
    model: 'models-se',
    tileSize: 0,
    tta: false
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((imageUrl: string) => {
    setOriginalImage(imageUrl);
    setProcessedImage(null);
  }, []);

  const handleProcessImage = useCallback(async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll create a simulated "enhanced" version
      // In a real implementation, this would call the Real-CUGAN backend
      setProcessedImage(originalImage); // Placeholder
      setProcessingProgress(100);
      
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingProgress(0);
      }, 500);
    } catch (error) {
      console.error('Error processing image:', error);
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  }, [originalImage]);

  const handleDownload = useCallback(() => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'enhanced-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">Potenciado por Real-CUGAN AI</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Mejora tus imágenes con
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> IA</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Utiliza algoritmos avanzados de inteligencia artificial para mejorar la calidad, 
            resolución y nitidez de tus imágenes de forma automática.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                Configuración
              </h2>
              
              <ModelSelector
                selectedModel={processingParams.model}
                onModelChange={(model) => setProcessingParams(prev => ({ ...prev, model }))}
              />
              
              <ParameterControls
                params={processingParams}
                onParamsChange={setProcessingParams}
              />
              
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleProcessImage}
                  disabled={!originalImage || isProcessing}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Mejorar Imagen
                    </>
                  )}
                </button>
                
                {processedImage && (
                  <button
                    onClick={handleDownload}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    Descargar Resultado
                  </button>
                )}
              </div>
            </div>

            {/* Info Panel */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Información
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Soporta imágenes JPG, PNG y WebP</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Escalado hasta 4x la resolución original</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Reducción de ruido inteligente</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Optimizado para imágenes anime y fotografías</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {!originalImage ? (
              <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
              <>
                {isProcessing && (
                  <ProcessingStatus progress={processingProgress} />
                )}
                
                <ImageComparison
                  originalImage={originalImage}
                  processedImage={processedImage}
                  isProcessing={isProcessing}
                />
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Características Principales
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Procesamiento Rápido</h3>
              <p className="text-gray-600">
                Algoritmos optimizados que procesan imágenes de forma eficiente utilizando GPU cuando está disponible.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Alta Calidad</h3>
              <p className="text-gray-600">
                Resultados de alta calidad que preservan los detalles importantes mientras mejoran la resolución.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalizable</h3>
              <p className="text-gray-600">
                Múltiples modelos y parámetros ajustables para obtener los mejores resultados según tu tipo de imagen.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;