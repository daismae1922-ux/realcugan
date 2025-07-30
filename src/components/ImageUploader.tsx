import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, FileImage } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
      <div
        className={`upload-zone ${isDragOver ? 'dragover' : ''} rounded-xl p-12 text-center cursor-pointer`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Upload className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Sube tu imagen
            </h3>
            <p className="text-gray-600 mb-4">
              Arrastra y suelta una imagen aquí, o haz clic para seleccionar
            </p>
            <p className="text-sm text-gray-500">
              Soporta JPG, PNG y WebP • Máximo 10MB
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FileImage className="w-4 h-4" />
              <span>Alta calidad</span>
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>Procesamiento local</span>
            </div>
          </div>
        </div>
        
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
      
      {/* Sample Images */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">O prueba con una imagen de ejemplo:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300', name: 'Paisaje' },
            { src: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300', name: 'Retrato' },
            { src: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=300', name: 'Arquitectura' },
            { src: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=300', name: 'Naturaleza' }
          ].map((sample, index) => (
            <div
              key={index}
              className="cursor-pointer group"
              onClick={() => onImageUpload(sample.src)}
            >
              <div className="relative overflow-hidden rounded-lg border-2 border-transparent group-hover:border-indigo-500 transition-all duration-200">
                <img
                  src={sample.src}
                  alt={sample.name}
                  className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {sample.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;