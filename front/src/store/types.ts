import { ALGORITHMS } from "../config/algorithms";

export interface EncoderState {
  mode: 'encode' | 'decode';
  algorithm: Algorithm;
  //algorithm: string;
  inputText: string;
  outputText: string;
  isProcessing: boolean;
  error: string | null;
  historyRequest: HistoryItem[];
}

export interface FilterState {
  selectedCategory: typeof CATEGORIES[number];//string;
  selectedTimeRange: typeof TIME_RANGES[number];
  selectedAlgorithm: typeof ALGORITHMS[number];//Algorithm;
}

export interface Category {
  value: string;
  label: string;
  icon: string;
}

export interface TimeRange {
  value: string;
  label: string;
}

export const CATEGORIES: Category[] = [
  { value: 'all', label: 'Все операции', icon: '📊' },
  { value: 'encode', label: 'Кодирования', icon: '🔐' },
  { value: 'decode', label: 'Декодирования', icon: '🔓' },
  { value: 'favorite', label: 'Избранное', icon: '⭐' }
];

export const TIME_RANGES: TimeRange[] = [
  { value: 'all', label: 'Все время' },
  { value: 'today', label: 'Сегодня' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' }
];


export interface Algorithm {
  value: string;
  label: string;
  icon: string;
  description: string;
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  mode: 'encode' | 'decode';
  algorithm: Algorithm;
  input: string;
  output: string;
  success: boolean;
}

export interface RootState {
  encoder: EncoderState;
  filters: FilterState;
}