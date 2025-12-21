import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { 
    setRSAKeys, 
    setKuznechikKey, 
    generateRSAKeys as generateRSAKeysAction,
    generateKuznechikKey as generateKuznechikKeyAction 
} from '../../store/slices/encoderSlice.ts';
import { 
    generateRSAKeys as generateRSAKeysUtil,
    generateKuznechikKey as generateKuznechikKeyUtil 
} from '../../utils/encoderUtils.ts';
import './KayManager.css';

const KeyManager: React.FC = () => {
    const dispatch = useAppDispatch();
    const { algorithm, rsaKeys, kuznechikKey } = useAppSelector(state => state.encoder);
    const [showKeys, setShowKeys] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateRSAKeys = async () => {
        setIsGenerating(true);
        try {
            // Генерируем ключи
            const keys = generateRSAKeysUtil();
            // Диспатчим действие
            dispatch(setRSAKeys(keys));
        } catch (error) {
            console.error('Ошибка генерации RSA ключей:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateKuznechikKey = () => {
        // Генерируем ключ
        const key = generateKuznechikKeyUtil();
        // Диспатчим действие
        dispatch(setKuznechikKey(key));
    };

    const handleCopyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
            .then(() => alert(`${label} скопирован в буфер обмена`))
            .catch(err => console.error('Ошибка копирования:', err));
    };

    // Скрываем KeyManager для Stribog и других алгоритмов, которые не требуют ключей
    if (!['RSA', 'Kuznechik'].includes(algorithm.value)) {
        return null;
    }

    return (
        <div className="key-manager">
            <button 
                className="toggle-keys-btn"
                onClick={() => setShowKeys(!showKeys)}
            >
                <span className="toggle-icon">{showKeys ? '▲' : '▼'}</span>
                Управление ключами
            </button>

            {showKeys && (
                <div className="keys-container">
                    {algorithm.value === 'RSA' && (
                        <div className="algorithm-keys rsa-keys">
                            <div className="keys-header">
                                <h4>RSA ключи</h4>
                                <button 
                                    className="generate-btn"
                                    onClick={handleGenerateRSAKeys}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? 'Генерация...' : 'Сгенерировать ключи'}
                                </button>
                            </div>
                            
                            {rsaKeys && (
                                <div className="keys-display">
                                    <div className="key-section">
                                        <div className="key-header">
                                            <h5>Открытый ключ (публичный)</h5>
                                            <button 
                                                className="copy-btn"
                                                onClick={() => handleCopyToClipboard(rsaKeys.publicKey, 'Открытый ключ')}
                                            >
                                                📋 Копировать
                                            </button>
                                        </div>
                                        <div className="key-value">
                                            <textarea 
                                                readOnly
                                                value={rsaKeys.publicKey}
                                                rows={4}
                                            />
                                        </div>
                                        <div className="key-info">
                                            <span className="info-icon">ℹ️</span>
                                            <span>Используется для шифрования</span>
                                        </div>
                                    </div>
                                    
                                    <div className="key-section">
                                        <div className="key-header">
                                            <h5>Закрытый ключ (приватный)</h5>
                                            <button 
                                                className="copy-btn"
                                                onClick={() => handleCopyToClipboard(rsaKeys.privateKey, 'Закрытый ключ')}
                                            >
                                                📋 Копировать
                                            </button>
                                        </div>
                                        <div className="key-value">
                                            <textarea 
                                                readOnly
                                                value={rsaKeys.privateKey}
                                                rows={6}
                                            />
                                        </div>
                                        <div className="key-info">
                                            <span className="info-icon">ℹ️</span>
                                            <span>Используется для расшифрования. Храните в секрете!</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {!rsaKeys && (
                                <div className="no-keys">
                                    <p>Ключи не сгенерированы. Нажмите "Сгенерировать ключи"</p>
                                </div>
                            )}
                        </div>
                    )}

                    {algorithm.value === 'Kuznechik' && (
                        <div className="algorithm-keys kuznechik-key">
                            <div className="keys-header">
                                <h4>Ключ Кузнечик</h4>
                                <button 
                                    className="generate-btn"
                                    onClick={handleGenerateKuznechikKey}
                                >
                                    Сгенерировать ключ
                                </button>
                            </div>
                            
                            {kuznechikKey && (
                                <div className="keys-display">
                                    <div className="key-section">
                                        <div className="key-header">
                                            <h5>Симметричный ключ</h5>
                                            <button 
                                                className="copy-btn"
                                                onClick={() => handleCopyToClipboard(kuznechikKey, 'Ключ Кузнечик')}
                                            >
                                                📋 Копировать
                                            </button>
                                        </div>
                                        <div className="key-value">
                                            <input 
                                                type="text"
                                                readOnly
                                                value={kuznechikKey}
                                            />
                                        </div>
                                        <div className="key-info">
                                            <span className="info-icon">ℹ️</span>
                                            <span>Используется для шифрования и расшифрования</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {!kuznechikKey && (
                                <div className="no-keys">
                                    <p>Ключ не сгенерирован. Нажмите "Сгенерировать ключ"</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="key-warning">
                        <div className="warning-icon">⚠️</div>
                        <div className="warning-content">
                            <strong>Внимание!</strong>
                            <p>Храните ключи в безопасном месте!</p>
                            <p>Потеря закрытого ключа RSA или ключа Кузнечик приведет к невозможности расшифрования данных.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KeyManager;