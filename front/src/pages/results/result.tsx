import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './result.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { ALGORITHMS } from '../../config/algorithms.ts';

import {
  addToHistory,
  clearHistory,
  setAlgorithm,
  setInputText,
  setMode,
} from '../../store/slices/encoderSlice.ts';
import { CATEGORIES, TIME_RANGES } from '../../store/types.ts';
import { setFilterAlgorithm, setFilterCategory, setFilterTimeRange } from '../../store/slices/filtersSlice.ts';

const Results = () => {


    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const {
        historyRequest,
    } = useAppSelector(state => state.encoder);

    const {
        selectedCategory,
        selectedTimeRange,
        selectedAlgorithm,
    } = useAppSelector(state =>state.filters);

    const [searchTerm, setSearchTerm] = useState('');

    


    const toggleFavorite = (id: number) => {
        // В реальном приложении здесь был бы API вызов
        console.log('Toggle favorite:', id);
    };

    const deleteResult = (id: number) => {
        // В реальном приложении здесь был бы API вызов
        console.log('Delete result:', id);
    };

    const exportResults = () => {
        // Экспорт результатов
        console.log('Export results');
    };

    const clearAll = () => {
        // Очистка всех результатов
        dispatch(clearHistory());
        console.log('Clear all results');
    };

    const filteredResults = historyRequest.filter(result => {

        const startOfToday = new Date(new Date());
        startOfToday.setUTCHours(0, 0, 0, 0);
        const resultDate = new Date(result.timestamp)
        const startOf7DaysAgo = new Date(startOfToday.getTime() - 6 * 24*60*60*1000);
        const startOf30DaysAgo = new Date(startOfToday.getTime() - 29 * 24*60*60*1000);

        const matchesCategory = selectedCategory === CATEGORIES[0]||selectedCategory.value==result.mode;
        const matchesTime = selectedTimeRange === TIME_RANGES[0] || 
        (selectedTimeRange === TIME_RANGES[1] && resultDate>=startOfToday)||
        (selectedTimeRange === TIME_RANGES[2] && resultDate>=startOf7DaysAgo)||
        (selectedTimeRange === TIME_RANGES[3] && resultDate>=startOf30DaysAgo);
        const matchesAlgoritms = selectedAlgorithm === result.algorithm;
        const matchesSearch = !searchTerm || 
                            result.input.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            result.output.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesTime && matchesAlgoritms && matchesSearch;
    });

    const stats = {
        total: historyRequest.length,
        encodings: historyRequest.filter(r => r.mode === 'encode').length,
        decodings: historyRequest.filter(r => r.mode === 'decode').length,
        //favorites: historyRequest.filter(r => r.favorite).length,
        //success: historyRequest.filter(r => r.status === 'success').length
    };

    return (
        <div className="results-page">
            <div className="results-container">
                {/* Хедер страницы */}
                <div className="results-header">
                    <div className="header-content">
                        <h1 className="results-title">
                            <span className="results-icon">📊</span>
                            История операций
                        </h1>
                        <p className="results-subtitle">
                            Просмотр и управление всеми операциями кодирования и декодирования
                        </p>
                    </div>
                    
                    <div className="header-actions">
                        <button className="export-btn" onClick={exportResults}>
                            <span className="btn-icon">📤</span>
                            Экспорт
                        </button>
                        <button className="clear-btn" onClick={clearAll}>
                            <span className="btn-icon">🗑️</span>
                            Очистить все
                        </button>
                    </div>
                </div>

                {/* Статистика */}
                <div className="stats-section">
                    <div className="stats-grid">
                        <div className="stat-card total">
                            <div className="stat-icon">📊</div>
                            <div className="stat-info">
                                <div className="stat-number">{stats.total}</div>
                                <div className="stat-label">Всего операций</div>
                            </div>
                        </div>
                        <div className="stat-card encoding">
                            <div className="stat-icon">🔐</div>
                            <div className="stat-info">
                                <div className="stat-number">{stats.encodings}</div>
                                <div className="stat-label">Кодирований</div>
                            </div>
                        </div>
                        <div className="stat-card decoding">
                            <div className="stat-icon">🔓</div>
                            <div className="stat-info">
                                <div className="stat-number">{stats.decodings}</div>
                                <div className="stat-label">Декодирований</div>
                            </div>
                        </div>
                        {/* <div className="stat-card favorites">
                            <div className="stat-icon">⭐</div>
                            <div className="stat-info">
                                <div className="stat-number">{/*stats.favorites*//*}</div>
                                <div className="stat-label">В избранном</div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="results-content">
                    {/* Левая колонка - Фильтры */}
                    <div className="filters-sidebar">
                        <div className="search-section">
                            <div className="search-box">
                                <span className="search-icon">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Поиск по тексту..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                                {searchTerm && (
                                    <button 
                                        className="clear-search"
                                        onClick={() => setSearchTerm('')}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3 className="filter-title">
                                <span className="filter-icon">📁</span>
                                Категории
                            </h3>
                            <div className="category-list">
                                {CATEGORIES.filter(c=>(c.value!="favorite")).map(category => ( 
                                    <button
                                        key={category.value}
                                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                        onClick={() => dispatch(setFilterCategory(category))}
                                    >
                                        <span className="category-icon">{category.icon}</span>
                                        <span className="category-label">{category.label}</span>
                                        {/* <span className="category-count">{category}</span> */}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3 className="filter-title">
                                <span className="filter-icon">⏰</span>
                                Период
                            </h3>
                            <div className="time-list">
                                {TIME_RANGES.map(range => (
                                    <button
                                        key={range.value}
                                        className={`time-btn ${selectedTimeRange === range ? 'active' : ''}`}
                                        onClick={() => dispatch(setFilterTimeRange(range))}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3 className="filter-title">
                                <span className="filter-icon">⚙️</span>
                                Алгоритмы
                            </h3>
                            <div className="time-list">
                                {ALGORITHMS.map(algorithm => (
                                    <button
                                            key={algorithm.value}
                                            className={`time-btn ${selectedAlgorithm === algorithm ? 'active' : ''}`}
                                            onClick={() => dispatch(setFilterAlgorithm(algorithm))}
                                        >
                                            <span className="algo-icon">{algorithm.icon}</span>
                                            <span className="algo-label">{algorithm.label}</span>
                                        </button>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Правая колонка - Список результатов */}
                    <div className="results-main">
                        <div className="results-header-bar">
                            <div className="results-info">
                                <span className="results-count">
                                    Найдено: {filteredResults.length} операций
                                </span>
                                {searchTerm && (
                                    <span className="search-term">
                                        по запросу: "{searchTerm}"
                                    </span>
                                )}
                            </div>
                            {/* <div className="sort-options">
                                <select className="sort-select">
                                    <option value="newest">Сначала новые</option>
                                    <option value="oldest">Сначала старые</option>
                                    <option value="alphabet">По алфавиту</option>
                                </select>
                            </div> */}
                        </div>

                        {filteredResults.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📊</div>
                                <h3 className="empty-title">Операции не найдены</h3>
                                <p className="empty-description">
                                    {searchTerm ? 
                                        'Попробуйте изменить поисковый запрос' : 
                                        'У вас пока нет операций в истории'
                                    }
                                </p>
                                <Link to="/encoder" className="empty-action">
                                    Начать кодирование
                                </Link>
                            </div>
                        ) : (
                            <div className="results-list">
                                {filteredResults.map(result => (
                                    <div key={result.id} className="result-card">
                                        <div className="card-header">
                                            <div className="result-type">
                                                <span className={`type-badge ${result.mode}`}>
                                                    {result.mode === 'encode' ? '🔐 Кодирование' : '🔓 Декодирование'}
                                                </span>
                                                <span className="algorithm-badge">
                                                    {result.algorithm.icon}
                                                    {result.algorithm.label}
                                                </span>
                                            </div>
                                            <div className="card-actions">
                                                {/* <button 
                                                    className={`favorite-btn ${/*result.favorite ? 'active' : ''*//*""}`}
                                                    onClick={() => toggleFavorite(result.id)}
                                                >
                                                    {result.favorite ? '⭐' : '☆'
                                                    }
                                                </button> */}
                                                <button 
                                                    className="delete-btn"
                                                    onClick={() => deleteResult(result.id)}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>

                                        <div className="card-content">
                                            <div className="text-pair">
                                                <div className="text-section">
                                                    <label className="text-label">Исходный текст:</label>
                                                    <div className="text-value">{result.input}</div>
                                                </div>
                                                <div className="text-section">
                                                    <label className="text-label">Результат:</label>
                                                    <div className="text-value">{result.output}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-footer">
                                            <div className="result-meta">
                                                <span className="meta-item">
                                                    <span className="meta-icon">📅</span>
                                                    {result.timestamp}
                                                </span>
                                                <span className="meta-item">
                                                    <span className="meta-icon">📏</span>
                                                    {//result.size
                                                    }
                                                </span>
                                                <span className="meta-item">
                                                    <span className="meta-icon">✅</span>
                                                    Успешно
                                                </span>
                                            </div>
                                            <div className="result-actions">
                                                <button className="action-btn copy-btn"
                                                onClick={()=>{navigator.clipboard.writeText(result.output);}}>
                                                    📋 Копировать
                                                </button>
                                                <button className="action-btn reuse-btn"
                                                onClick={()=>{
                                                    navigate(result.mode==="encode"?"/encoder":"/decoder");
                                                    dispatch(setInputText(result.input));
                                                    dispatch(setAlgorithm(result.algorithm));
                                                    dispatch(setMode(result.mode));
                                                    }}>
                                                    🔄 Использовать
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Пагинация
                        {filteredResults.length > 0 && (
                            <div className="pagination">
                                <button className="page-btn disabled">← Назад</button>
                                <div className="page-numbers">
                                    <span className="page-number active">1</span>
                                    <span className="page-number">2</span>
                                    <span className="page-number">3</span>
                                </div>
                                <button className="page-btn">Вперед →</button>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;