import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { Link, useLocation } from 'react-router-dom';
import './encoder.css';
import InputWindow from '../../components/InputWindow/inputWindow.tsx';
import KeyManager from '../../components/KayManager/KayManager.tsx';
import { ALGORITHMS } from '../../config/algorithms.ts';

import {
  setMode,
  setAlgorithm,
  setInputText,
  setOutputText,
  setProcessing,
  setError,
  addToHistory,
  clearAll,
  swapTexts,
  setKuznechikKey,
  setRSAKeys
} from '../../store/slices/encoderSlice.ts';

import { encodeText, decodeText, generateRSAKeys, generateKuznechikKey } from '../../utils/encoderUtils.ts';

const Encoder = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const {
        mode,
        algorithm,
        inputText,
        outputText,
        historyRequest,
        isProcessing,
        error,
        rsaKeys,
        kuznechikKey
    } = useAppSelector(state => state.encoder);

    useEffect(() => {
        if (location.pathname === "/encoder")
            dispatch(setMode('encode'));
        else if (location.pathname === "/decoder")
            dispatch(setMode("decode"));
    }, [dispatch, location.pathname]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            dispatch(setInputText(text));
        } catch (error) {
            dispatch(setError('Ошибка чтения файла'));
        }
    };

    const coding = async () => {
        if (!inputText.trim()) {
            dispatch(setError('Введите текст для кодирования'));
            return;
        }

        dispatch(setProcessing(true));
        dispatch(setError(null));

        try {
            let result;
            let metadata = {};

            switch (algorithm.value) {
                case 'RSA':
                    // Если нет ключей - генерируем
                    if (!rsaKeys) {
                        const keys = generateRSAKeys();
                        dispatch(setRSAKeys(keys));
                        metadata = { keys };
                    }
                    
                    result = await encodeText(inputText, 'RSA', {
                        rsaPublicKey: rsaKeys?.publicKey
                    });
                    break;

                case 'Kuznechik':
                    // Если нет ключа - генерируем
                    if (!kuznechikKey) {
                        const key = generateKuznechikKey();
                        dispatch(setKuznechikKey(key));
                        metadata = { key };
                    }
                    
                    result = await encodeText(inputText, 'Kuznechik', {
                        kuznechikKey: kuznechikKey || ''
                    });
                    break;

                case 'Stribog':
                    result = await encodeText(inputText, 'Stribog');
                    break;

                default:
                    throw new Error('Выбранный алгоритм не поддерживается');
            }

            dispatch(setOutputText(result.result));
            dispatch(addToHistory({
                algorithm: algorithm,
                mode: 'encode',
                input: inputText,
                output: result.result,
                //metadata
            }));

        } catch (error: any) {
            dispatch(setError(error.message || 'Ошибка кодирования'));
        } finally {
            dispatch(setProcessing(false));
        }
    };

    const decoding = async () => {
        if (!inputText.trim()) {
            dispatch(setError('Введите текст для декодирования'));
            return;
        }

        dispatch(setProcessing(true));
        dispatch(setError(null));

        try {
            let result;

            switch (algorithm.value) {
                case 'RSA':
                    if (!rsaKeys?.privateKey) {
                        throw new Error('Необходим закрытый ключ RSA');
                    }
                    
                    result = await decodeText(inputText, 'RSA', {
                        rsaPrivateKey: rsaKeys.privateKey
                    });
                    break;

                case 'Kuznechik':
                    if (!kuznechikKey) {
                        throw new Error('Необходим ключ Кузнечик');
                    }
                    
                    result = await decodeText(inputText, 'Kuznechik', {
                        kuznechikKey
                    });
                    break;

                case 'Stribog':
                    throw new Error('Стрибог - хеш-функция, декодирование невозможно');

                default:
                    throw new Error('Выбранный алгоритм не поддерживается');
            }

            dispatch(setOutputText(result.result));
            dispatch(addToHistory({
                algorithm: algorithm,
                mode: 'decode',
                input: inputText,
                output: result.result,
                //metadata: { algorithm: algorithm }
            }));

        } catch (error: any) {
            dispatch(setError(error.message || 'Ошибка декодирования'));
        } finally {
            dispatch(setProcessing(false));
        }
    };

    const handleAlgorithmSelect = (algo: any) => {
        dispatch(setAlgorithm(algo));
        dispatch(setError(null));
        
        // Для Stribog в режиме декодирования показываем ошибку
        if (algo.value === 'Stribog' && mode === 'decode') {
            dispatch(setError('Стрибог - хеш-функция, декодирование невозможно'));
        }
    };

    return (
        <div className="encoder-page">
            <div className="encoder-container">
                {/* Хедер страницы */}
                <div className="encoder-header">
                    <div className="header-content">
                        <h1 className="encoder-title">
                            <span className="encoder-icon">
                                {mode === 'encode' ? '🔐' : '🔓'}
                            </span>
                            {mode === 'encode' ? 'Кодирование текста' : 'Декодирование текста'}
                        </h1>
                        <p className="encoder-subtitle">
                            {mode === 'encode' 
                                ? 'Преобразуйте текст в различные форматы кодирования'
                                : 'Преобразуйте различные форматы кодирования в текст'}
                        </p>
                    </div>
                    
                    <div className="header-stats">
                        <div className="stat">
                            <span className="stat-number">{historyRequest.length}</span>
                            <span className="stat-label">Операций сегодня</span>
                        </div>
                        <Link to="/results" className="history-link">
                            <span className="link-icon">📊</span>
                            История операций
                        </Link>
                    </div>
                </div>

                {/* Отображение ошибок */}
                {error && (
                    <div className="error-alert">
                        <span className="error-icon">⚠️</span>
                        {error}
                    </div>
                )}

                <div className="encoder-content">
                    {/* Левая колонка - Выбор алгоритма и настройки */}
                    <div className="encoder-sidebar">
                        <div className="algorithm-section">
                            <h3 className="section-title">
                                <span className="section-icon">⚙️</span>
                                Алгоритм {mode === 'encode' ? 'кодирования' : 'декодирования'}
                            </h3>
                            
                            <div className="algorithm-grid">
                                {ALGORITHMS.map((algo) => {
                                    // Для Stribog в режиме decode показываем как неактивный
                                    const isDisabled = algo.value === 'Stribog' && mode === 'decode';
                                    
                                    return (
                                        <div
                                            key={algo.value}
                                            className={`algorithm-card ${algorithm === algo ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                                            onClick={() => !isDisabled && handleAlgorithmSelect(algo)}
                                            title={isDisabled ? 'Декодирование невозможно для хеш-функции' : ''}
                                        >
                                            <div className="algorithm-icon">{algo.icon}</div>
                                            <div className="algorithm-info">
                                                <div className="algorithm-name">{algo.label}</div>
                                                <div className="algorithm-desc">{algo.description}</div>
                                                {isDisabled && (
                                                    <div className="algorithm-warning">Только кодирование</div>
                                                )}
                                            </div>
                                            <div className="selection-indicator"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Компонент управления ключами */}
                        <KeyManager />

                        <div className="tools-section">
                            <h3 className="section-title">
                                <span className="section-icon">🛠️</span>
                                Инструменты
                            </h3>
                            
                            <div className="tool-buttons">
                                <button 
                                    className="tool-btn"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <span className="tool-icon">📁</span>
                                    Загрузить файл
                                </button>
                                
                                <button 
                                    className="tool-btn"
                                    onClick={() => dispatch(clearAll())}
                                    disabled={!inputText && !outputText}
                                >
                                    <span className="tool-icon">🧹</span>
                                    Очистить все
                                </button>
                                
                                <button 
                                    className="tool-btn"
                                    onClick={() => dispatch(swapTexts())}
                                    disabled={!outputText}
                                >
                                    <span className="tool-icon">🔄</span>
                                    Поменять местами
                                </button>
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                accept=".txt,.json,.xml,.csv,.pem,.key"
                            />
                        </div>
                    </div>

                    {/* Правая колонка - Рабочая область */}
                    <div className="encoder-workspace">
                        <InputWindow modeWindow={true} />

                        {/* Кнопка кодирования/декодирования */}
                        <div className="encode-action">
                            {mode === 'encode' && algorithm.value !== 'Stribog' && (
                                <button 
                                    className={`encode-btn ${isProcessing ? 'loading' : ''}`}
                                    onClick={coding}
                                    disabled={!inputText.trim() || isProcessing}
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="spinner"></span>
                                            Кодирование...
                                        </>
                                    ) : (
                                        <>
                                            <span className="encode-icon">⚡</span>
                                            Закодировать
                                        </>
                                    )}
                                </button>
                            )}

                            {mode === 'encode' && algorithm.value === 'Stribog' && (
                                <button 
                                    className="encode-btn"
                                    onClick={coding}
                                    disabled={!inputText.trim() || isProcessing}
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="spinner"></span>
                                            Хеширование...
                                        </>
                                    ) : (
                                        <>
                                            <span className="encode-icon">🔢</span>
                                            Вычислить хеш
                                        </>
                                    )}
                                </button>
                            )}

                            {mode === 'decode' && algorithm.value !== 'Stribog' && (
                                <button 
                                    className={`encode-btn ${isProcessing ? 'loading' : ''}`}
                                    onClick={decoding}
                                    disabled={!inputText.trim() || isProcessing}
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="spinner"></span>
                                            Декодирование...
                                        </>
                                    ) : (
                                        <>
                                            <span className="encode-icon">⚡</span>
                                            Декодировать
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        <InputWindow modeWindow={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Encoder;