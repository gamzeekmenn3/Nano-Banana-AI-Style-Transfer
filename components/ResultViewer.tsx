import React from 'react';
import { Download, ArrowRight, RefreshCw } from 'lucide-react';

interface ResultViewerProps {
  originalImage: string;
  generatedImage: string | null;
  isLoading: boolean;
  onReset: () => void;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ 
  originalImage, 
  generatedImage, 
  isLoading, 
  onReset 
}) => {
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `nano-banana-style-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center h-full min-h-[400px]">
        
        {/* Original Image */}
        <div className="flex-1 bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 relative group">
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-xs px-3 py-1 rounded-full z-10">
            Orijinal
          </div>
          <img 
            src={originalImage} 
            alt="Original" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </div>

        {/* Arrow / Loader */}
        <div className="flex items-center justify-center md:rotate-0 rotate-90">
          {isLoading ? (
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin"></div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
              <ArrowRight className="w-6 h-6" />
            </div>
          )}
        </div>

        {/* Generated Image */}
        <div className="flex-1 bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 relative group min-h-[300px] flex items-center justify-center">
          {generatedImage ? (
            <>
              <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur text-white text-xs px-3 py-1 rounded-full z-10">
                Nano Banana Sonuç
              </div>
              <img 
                src={generatedImage} 
                alt="Generated" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <button 
                  onClick={handleDownload}
                  className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-50 transform hover:scale-105 transition-all shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  İndir
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-8">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <p className="text-indigo-400 font-semibold animate-pulse">Oluşturuluyor...</p>
                  <p className="text-slate-500 text-sm mt-2">Gemini 2.5 Flash Image iş başında</p>
                </div>
              ) : (
                <p className="text-slate-500">Bir tarz seçin veya komut yazın.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {generatedImage && (
        <div className="flex justify-center pt-4">
          <button 
            onClick={onReset}
            className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Yeni Fotoğraf Yükle
          </button>
        </div>
      )}
    </div>
  );
};