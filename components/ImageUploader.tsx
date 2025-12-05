import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Lütfen geçerli bir resim dosyası yükleyin.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageSelect(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div 
      className={`w-full max-w-2xl mx-auto border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-slate-800/50 backdrop-blur-sm
        ${isDragging ? 'border-indigo-500 bg-slate-800/80 scale-105' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />
      
      <div className="bg-indigo-500/20 p-6 rounded-full mb-6">
        <Upload className="w-12 h-12 text-indigo-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-2">Fotoğraf Yükle</h3>
      <p className="text-slate-400 mb-6">Dosyayı buraya sürükleyin veya seçmek için tıklayın</p>
      
      <div className="flex gap-4 text-sm text-slate-500">
        <span className="flex items-center"><ImageIcon className="w-4 h-4 mr-1" /> JPG, PNG, WEBP</span>
      </div>
    </div>
  );
};