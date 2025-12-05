export interface StyleOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string;
  color: string;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  resultImage: string | null;
}

export enum ViewMode {
  UPLOAD = 'UPLOAD',
  EDITOR = 'EDITOR',
}