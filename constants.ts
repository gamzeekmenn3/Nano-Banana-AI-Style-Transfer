import { StyleOption } from './types';

export const STYLES: StyleOption[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon ışıklar ve fütüristik teknoloji.',
    prompt: 'Transform this image into a cyberpunk style with neon lights, high tech aesthetics, rain-slicked streets, and a futuristic atmosphere.',
    icon: 'Zap',
    color: 'from-pink-500 to-violet-600'
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japon animasyonu tarzı çizim.',
    prompt: 'Convert this photo into a high quality anime style illustration with vibrant colors and expressive features.',
    icon: 'Smile',
    color: 'from-orange-400 to-pink-500'
  },
  {
    id: 'dramatic',
    name: 'Dramatik Portre',
    description: 'Yüksek kontrast ve karamsar ışıklandırma.',
    prompt: 'Apply a dramatic portrait style with high contrast chiaroscuro lighting, deep shadows, and a moody, cinematic atmosphere.',
    icon: 'User',
    color: 'from-gray-700 to-black'
  },
  {
    id: 'coloring-book',
    name: 'Boyama Kitabı',
    description: 'Siyah beyaz çizgi sanatı.',
    prompt: 'Turn this image into a clean, black and white coloring book page line art. No shading, just outlines.',
    icon: 'BookOpen',
    color: 'from-white to-gray-300' // Special handling for light text
  },
  {
    id: 'photoshoot',
    name: 'Fotoğraf Çekimi',
    description: 'Profesyonel stüdyo kalitesi.',
    prompt: 'Enhance this image to look like a professional studio photoshoot with perfect lighting, sharp focus, and high-end camera quality.',
    icon: 'Camera',
    color: 'from-blue-400 to-indigo-600'
  },
  {
    id: 'retro-cartoon',
    name: 'Retro Çizgi Film',
    description: '1930\'ların lastik hortum animasyonu.',
    prompt: 'Recreate this image in a 1930s retro cartoon rubber hose style, vintage animation look, sepia or black and white tones.',
    icon: 'Tv',
    color: 'from-yellow-600 to-orange-800'
  },
  {
    id: '80s-glam',
    name: '80\'lerin Işıltısı',
    description: 'Yumuşak odak ve parıltılar.',
    prompt: 'Apply an 80s glamour shot filter with soft focus, sparkles, pastel neons, and a vintage VHS aesthetic.',
    icon: 'Star',
    color: 'from-fuchsia-400 to-purple-500'
  },
  {
    id: 'art-nouveau',
    name: 'Art Nouveau',
    description: 'Organik çizgiler ve dekoratif desenler.',
    prompt: 'Redraw this in Art Nouveau style (Mucha style) with organic lines, floral motifs, decorative patterns, and elegant composition.',
    icon: 'Feather',
    color: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    description: 'Retro-fütüristik ızgaralar ve gün batımı.',
    prompt: 'Apply a synthwave aesthetic with purple/pink grids, a retro-futuristic sun, and digital landscapes.',
    icon: 'Music',
    color: 'from-cyan-500 to-blue-600'
  }
];