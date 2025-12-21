import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './registration.css';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    // Проверка сложности пароля
    useEffect(() => {
        let strength = 0;
        
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        setPasswordStrength(strength);
    }, [password]);

    const getStrengthClass = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength <= 1) return 'weak';
        if (passwordStrength <= 2) return 'medium';
        return 'strong';
    };

    const getStrengthText = () => {
        if (password.length === 0) return 'Введите пароль';
        if (passwordStrength <= 1) return 'Слабый пароль';
        if (passwordStrength <= 2) return 'Средний пароль';
        return 'Надежный пароль';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }
        
        if (!agreeTerms) {
            alert('Пожалуйста, примите условия использования');
            return;
        }
        
        if (passwordStrength < 2) {
            alert('Пароль слишком слабый. Используйте не менее 8 символов, заглавные буквы и цифры');
            return;
        }
        
        setIsLoading(true);
        
        // Имитация запроса к API
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Registration attempt:', { name, email, password });
        
        // Показываем уведомление об успехе
        setShowSuccess(true);
        setIsLoading(false);
        
        // Через 3 секунды перенаправляем на страницу входа
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    const handleQuickFill = () => {
        setName('Иван Иванов');
        setEmail('user@webencoder.com');
        setPassword('SecurePass123!');
        setConfirmPassword('SecurePass123!');
        setAgreeTerms(true);
    };

    return (
        <div className="registration-page">
            {/* Декоративные элементы */}
            <div className="registration-decoration">
                <div className="reg-decoration-circle reg-circle-1"></div>
                <div className="reg-decoration-circle reg-circle-2"></div>
                <div className="reg-decoration-circle reg-circle-3"></div>
                <div className="reg-decoration-circle reg-circle-4"></div>
            </div>

            <div className="registration-container">
                {/* Левая часть - Информация */}
                <div className="registration-info">
                    <div className="info-content">
                        <div className="info-icon">🚀</div>
                        <h1 className="info-title">
                            Начните работу с <span className="gradient-text">WebEncoder</span>
                        </h1>
                        <p className="info-subtitle">
                            Присоединяйтесь к сообществу профессионалов и получите доступ 
                            к передовым инструментам кодирования и аналитики данных.
                        </p>
                        
                        <div className="benefits-list">
                            <div className="benefit-item">
                                <span className="benefit-icon">⚡</span>
                                <span>Мгновенный доступ ко всем функциям</span>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">🔒</span>
                                <span>Защита данных по стандартам GDPR</span>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">📊</span>
                                <span>Расширенная аналитика проектов</span>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">👥</span>
                                <span>Совместная работа в команде</span>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">🆓</span>
                                <span>Бесплатный период на 14 дней</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Правая часть - Форма */}
                <div className="registration-form-section">
                    <div className="reg-form-container">
                        <div className="reg-form-header">
                            <h2 className="reg-form-title">Создание аккаунта</h2>
                            <p className="reg-form-subtitle">Заполните форму для регистрации</p>
                        </div>

                        <form onSubmit={handleSubmit} className="registration-form">
                            <div className="reg-input-group">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="reg-input"
                                    placeholder=" "
                                    required
                                />
                                <label className="reg-input-label">Полное имя</label>
                                <span className="reg-input-icon">👤</span>
                            </div>

                            <div className="reg-input-group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="reg-input"
                                    placeholder=" "
                                    required
                                />
                                <label className="reg-input-label">Email адрес</label>
                                <span className="reg-input-icon">📧</span>
                            </div>

                            <div className="reg-input-group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="reg-input"
                                    placeholder=" "
                                    required
                                />
                                <label className="reg-input-label">Пароль</label>
                                <span className="reg-input-icon">🔑</span>
                                {password && (
                                    <div className="password-strength">
                                        <span>{getStrengthText()}</span>
                                        <div className="strength-bar">
                                            <div className={`strength-fill ${getStrengthClass()}`}></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="reg-input-group">
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="reg-input"
                                    placeholder=" "
                                    required
                                />
                                <label className="reg-input-label">Подтверждение пароля</label>
                                <span className="reg-input-icon">✅</span>
                                {confirmPassword && password !== confirmPassword && (
                                    <div className="password-strength" style={{ color: '#e74c3c' }}>
                                        Пароли не совпадают
                                    </div>
                                )}
                            </div>

                            <div className="terms-group">
                                <label className="terms-label">
                                    <input
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        className="terms-checkbox"
                                    />
                                    <span className="terms-checkmark"></span>
                                    <span>
                                        Я соглашаюсь с{' '}
                                        <Link to="/terms" className="terms-link">
                                            условиями использования
                                        </Link>{' '}
                                        и{' '}
                                        <Link to="/privacy" className="terms-link">
                                            политикой конфиденциальности
                                        </Link>
                                    </span>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                className={`reg-btn ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading || !agreeTerms}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="reg-spinner"></span>
                                        Регистрация...
                                    </>
                                ) : (
                                    <>
                                        <span className="reg-btn-icon">✨</span>
                                        Создать аккаунт
                                    </>
                                )}
                            </button>

                            <button 
                                type="button" 
                                className="demo-btn"
                                onClick={handleQuickFill}
                                style={{ marginTop: '1rem' }}
                            >
                                <span className="demo-icon">⚡</span>
                                Быстрое заполнение формы
                            </button>

                            {showSuccess && (
                                <div className="success-notification">
                                    <span>✅</span>
                                    <div>
                                        <strong>Регистрация успешна!</strong>
                                        <p>Сейчас вы будете перенаправлены на страницу входа.</p>
                                    </div>
                                </div>
                            )}
                        </form>

                        <div className="reg-form-footer">
                            <p className="reg-footer-text">
                                Уже есть аккаунт?{' '}
                                <Link to="/login" className="login-link">
                                    Войти
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;