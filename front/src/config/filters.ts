import { HistoryItem } from '../store/types';


// Вспомогательные функции для работы с фильтрами
export const getCategoryCounts = (history: HistoryItem[]) => {
  return {
    all: history.length,
    encoding: history.filter(item => item.mode === 'encode').length,
    decoding: history.filter(item => item.mode === 'decode').length,
    favorites: history.filter(item => true).length // Заглушка для избранного
  };
};

export const filterHistory = (
  history: HistoryItem[], 
  filters: { selectedCategory: string; timeRange: string; searchTerm: string }
) => {
  let filtered = [...history];

  // Фильтрация по категории
  if (filters.selectedCategory !== 'all') {
    if (filters.selectedCategory === 'encoding') {
      filtered = filtered.filter(item => item.mode === 'encode');
    } else if (filters.selectedCategory === 'decoding') {
      filtered = filtered.filter(item => item.mode === 'decode');
    } else if (filters.selectedCategory === 'favorites') {
      // Логика для избранного (пока заглушка)
      filtered = filtered.filter(item => true);
    }
  }

  // Фильтрация по временному диапазону
  if (filters.timeRange !== 'all') {
    const now = new Date();
    const itemDate = new Date();
    
    filtered = filtered.filter(item => {
      itemDate.setTime(new Date(item.timestamp).getTime());
      
      switch (filters.timeRange) {
        case 'today':
          return itemDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return itemDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return itemDate >= monthAgo;
        default:
          return true;
      }
    });
  }

  // Фильтрация по поисковому запросу
  if (filters.searchTerm.trim()) {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(item =>
      item.input.toLowerCase().includes(searchLower) ||
      item.output.toLowerCase().includes(searchLower) ||
      item.algorithm.label.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};