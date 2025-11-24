import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { setMode,setInputText,setOutputText } from "../../store/slices/encoderSlice.ts";



interface InputWindowProps {
  modeWindow: boolean;
}

const InputWindow = ({modeWindow}:InputWindowProps) => {


    const dispatch = useAppDispatch();
    const {
        mode,
        algorithm,
        inputText,
        outputText,
        isProcessing,
        error
    } = useAppSelector(state => state.encoder);


    const handleCopy = (text:string) => {
        navigator.clipboard.writeText(text);
    };

    return(
                        <div className="input-section">
                            <div className="section-header">
                                <h3 className="section-title">{modeWindow? 'Исходный текст' : 'Результат обработки'}</h3>
                                <div className="section-actions">
                                    <button 
                                        className="action-btn"
                                        onClick={() => handleCopy(modeWindow? inputText : outputText )}
                                        disabled={modeWindow? !inputText : !outputText}
                                    >
                                        <span className="action-icon">📋</span>
                                        Копировать
                                    </button>
                                    <button 
                                        className="action-btn"

                                        onClick={() => dispatch(setInputText(''))}
                                        disabled={!inputText}
                                        style={{display: modeWindow? 'block' : 'none' }}
                                    >
                                        <span className="action-icon">🗑️</span>
                                        Очистить
                                    </button>
                                </div>
                            </div>
                            <div className="text-area-container">
                                <textarea
                                    value={modeWindow? inputText : outputText}
                                    onChange={modeWindow? (e) => dispatch(setInputText(e.target.value)): (e)=>{}}
                                    placeholder= {modeWindow? "Введите текст для обработки или загрузите файл..." : "Здесь появится результат обработки..."}
                                    className="text-area input-area"
                                    readOnly={!modeWindow}
                                    rows={12}
                                />
                                <div className="text-counter">
                                    {modeWindow ? inputText.length: outputText.length} символов
                                </div>
                            </div>
                        </div>
    );
}

export default InputWindow