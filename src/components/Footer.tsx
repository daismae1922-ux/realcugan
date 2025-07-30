import React from 'react';
import { Heart, Github, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-CUGAN Web</h3>
            <p className="text-gray-600 text-sm">
              Una interfaz web moderna para el proyecto Real-CUGAN, que permite mejorar 
              imágenes utilizando algoritmos de inteligencia artificial avanzados.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enlaces</h3>
            <div className="space-y-2">
              <a
                href="https://github.com/nihui/realcugan-ncnn-vulkan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                Repositorio Original
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/bilibili/ailab/tree/main/Real-CUGAN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Proyecto Real-CUGAN
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tecnologías</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">React</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">TypeScript</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Tailwind CSS</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Vite</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-red-500" /> para la comunidad de código abierto
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;