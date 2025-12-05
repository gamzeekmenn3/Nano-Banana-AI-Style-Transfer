import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { StyleCard } from './components/StyleCard';
import { ResultViewer } from './components/ResultViewer';
import { STYLES } from './constants';
import { generateStyledImage } from './services/geminiService';
import { StyleOption, ViewMode } from './types';
import { Sparkles, Wand2, Terminal } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.UPLOAD);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (base64: string) => {
    setOriginalImage(base64);
    setViewMode(ViewMode.EDITOR);
    setGeneratedImage(null);
    setSelectedStyleId(null);
    setError(null);
  };

  const handleStyleSelect = async (style: StyleOption) => {
    if (isLoading || !originalImage) return;
    
    setSelectedStyleId(style.id);
    setCustomPrompt(''); // Clear custom prompt if style is selected
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateStyledImage(originalImage, style.prompt);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError('Görüntü oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomPromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !originalImage || !customPrompt.trim()) return;

    setSelectedStyleId(null); // Deselect preset styles
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateStyledImage(originalImage, customPrompt);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError('Özel komut işlenirken hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = () => {
    setViewMode(ViewMode.UPLOAD);
    setOriginalImage(null);
    setGeneratedImage(null);
    setSelectedStyleId(null);
    setCustomPrompt('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Nano Banana Stylizer
            </h1>
          </div>
          {viewMode === ViewMode.EDITOR && (
             <button 
               onClick={resetApp}
               className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
             >
               Çıkış
             </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {viewMode === ViewMode.UPLOAD ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12 animate-fade-in-up">
            <div className="text-center space-y-4 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Fotoğraflarınızı <span className="text-indigo-400">Sanata</span> Dönüştürün
              </h2>
              <p className="text-lg text-slate-400">
                Gemini 2.5 Flash Image (Nano Banana) teknolojisi ile 9 farklı tarzda anında dönüşüm yapın veya kendi komutlarınızı kullanın.
              </p>
            </div>
            <ImageUploader onImageSelect={handleImageSelect} />
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Main Editor Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Side: Controls */}
              <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                
                {/* Custom Prompt Section */}
                 <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    <h3>Özel Komut (Prompt)</h3>
                  </div>
                  <form onSubmit={handleCustomPromptSubmit} className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="Örn: Arkadaki insanları sil, siyah beyaz yap..."
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                      />
                      <button 
                        type="submit"
                        disabled={!customPrompt.trim() || isLoading}
                        className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Uygula
                      </button>
                    </div>
                    <p className="text-xs text-slate-500">
                      Resmi düzenlemek için istediğiniz değişikliği yazın.
                    </p>
                  </form>
                </div>

                {/* Presets Grid */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Wand2 className="w-5 h-5 text-purple-400" />
                    <h3>Hazır Tarzlar</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {STYLES.map((style) => (
                      <StyleCard
                        key={style.id}
                        style={style}
                        isSelected={selectedStyleId === style.id}
                        onClick={() => handleStyleSelect(style)}
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Side: Preview */}
              <div className="lg:col-span-7 order-1 lg:order-2 sticky top-24">
                <ResultViewer 
                  originalImage={originalImage!}
                  generatedImage={generatedImage}
                  isLoading={isLoading}
                  onReset={resetApp}
                />
                 {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center text-sm animate-shake">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-auto py-8 text-center text-slate-500 text-sm">
        <p>Nano Banana (Gemini 2.5 Flash) ile güçlendirilmiştir.</p>
      </footer>
    </div>
  );
};

export default App;