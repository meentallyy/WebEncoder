import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { Link, useLocation } from 'react-router-dom';
import './encoder.css';
import InputWindow from '../../components/InputWindow/inputWindow.tsx';
import { ALGORITHMS} from '../../config/algorithms.ts';


import {
  setMode,
  setAlgorithm,
  setInputText,
  setOutputText,
  setProcessing,
  setError,
  addToHistory,
  clearAll,
  swapTexts
} from '../../store/slices/encoderSlice.ts';

//import { encodeText, decodeText } from '../../utils/encoderUtils';




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
        error
    } = useAppSelector(state => state.encoder);

    useEffect(() => {
        if (location.pathname == "/encoder")
            dispatch(setMode('encode'));
        else if (location.pathname == "/decoder")
            dispatch(setMode("decode"));
    }, [dispatch, location.pathname]);


    const fileInputRef = useRef(null);

    const coding = () => {
        dispatch(setProcessing(true));

        const resultRequest = "result en";
        //вызов API

        dispatch(setOutputText(resultRequest));
        dispatch(addToHistory({}));
        dispatch(setProcessing(false));

    }

    const decoding = () => {
        dispatch(setProcessing(true));

        const resultRequest = "result de";
        //вызов API

        dispatch(setOutputText(resultRequest));
        dispatch(addToHistory({}));
        dispatch(setProcessing(false));

    }




    return (
        <div className="encoder-page">
            <div className="encoder-container">
                {/* Хедер страницы */}
                <div className="encoder-header">
                    <div className="header-content">
                        <h1 className="encoder-title">
                            <span className="encoder-icon">{location.pathname === "/encoder" ? "🔐": location.pathname === "/decoder"? "🔐":""}</span>
                            {location.pathname === "/encoder" ? "Кодирование текста": location.pathname === "/decoder"? "Декодирование текста":""}
                        </h1>
                        <p className="encoder-subtitle">
                            {location.pathname === "/encoder" ? "Преобразуйте текст в различные форматы кодирования": location.pathname === "/decoder"? "Преобразуйте различные форматы кодирования в текст":""}
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

                <div className="encoder-content">
                    {/* Левая колонка - Выбор алгоритма и настройки */}
                    <div className="encoder-sidebar">
                        <div className="algorithm-section">
                            <h3 className="section-title">
                                <span className="section-icon">⚙️</span>
                                Алгоритм кодирования
                            </h3>
                            
                            <div className="algorithm-grid">
                                {ALGORITHMS.map((algo) => (
                                    <div
                                        key={algo.value}
                                        className={`algorithm-card ${
                                            algorithm === algo ? 'selected' : ''
                                        }`}
                                        onClick={() => dispatch(setAlgorithm(algo))}
                                    >
                                        <div className="algorithm-icon">{algo.icon}</div>
                                        <div className="algorithm-info">
                                            <div className="algorithm-name">{algo.label}</div>
                                            <div className="algorithm-desc">{algo.description}</div>
                                        </div>
                                        <div className="selection-indicator"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="tools-section">
                            <h3 className="section-title">
                                <span className="section-icon">🛠️</span>
                                Инструменты
                            </h3>
                            
                            <div className="tool-buttons">
                                <button 
                                    className="tool-btn"
                                    onClick={() => fileInputRef.current}
                                >
                                    <span className="tool-icon">📁</span>
                                    Загрузить файл
                                </button>
                                
                                <button 
                                    className="tool-btn"
                                    onClick={()=>dispatch(clearAll())}
                                    disabled={!inputText && !outputText}
                                >
                                    <span className="tool-icon">🧹</span>
                                    Очистить все
                                </button>
                                
                                <button 
                                    className="tool-btn"
                                    onClick={()=>dispatch(swapTexts())}
                                    disabled={!outputText}
                                >
                                    <span className="tool-icon">🔄</span>
                                    Поменять местами
                                </button>
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                //onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                accept=".txt,.json,.xml,.csv"
                            />
                        </div>

                        
                    </div>

                    {/* Правая колонка - Рабочая область */}
                    <div className="encoder-workspace">


                        <InputWindow modeWindow = {true}/>

                        {/* Кнопка кодирования */}
                        <div className="encode-action">
                            <button 

                                style={{display : mode==="encode"? "block":"none"}}
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

                            <button 
                                className={`encode-btn ${isProcessing ? 'loading' : ''}`}
                                style={{display : mode==="decode"? "block":"none"}}
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
                        </div>

                        <InputWindow modeWindow = {false}/>
                    </div>
                </div>

             
            </div>
        </div>
    );
};

export default Encoder;

function dispatch(arg0: { payload: any; type: "encoder/setMode"; }) {
    throw new Error('Function not implemented.');
}
