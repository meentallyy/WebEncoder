import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Имитация запроса к API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Login attempt:', { email, password, rememberMe });
        setIsLoading(false);
        navigate('/encoder');
    };

    const handleDemoLogin = () => {
        setEmail('demo@webencoder.com');
        setPassword('demo123');
    };

    return (
        <div className="login-page">
            {/* Декоративные элементы */}
            <div className="login-decoration">
                <div className="decoration-circle circle-1"></div>
                <div className="decoration-circle circle-2"></div>
                <div className="decoration-circle circle-3"></div>
            </div>

            <div className="login-container">
                {/* Левая часть - Приветствие */}
                <div className="login-welcome">
                    <div className="welcome-content">
                        <div className="welcome-icon">🔐</div>
                        <h1 className="welcome-title">
                            Добро пожаловать в <span className="gradient-text">WebEncoder</span>
                        </h1>
                        <p className="welcome-subtitle">
                            Войдите в свой аккаунт для доступа к профессиональным инструментам 
                            кодирования и декодирования данных.
                        </p>
                        
                        <div className="features-list">
                            <div className="feature-item">
                                <span className="feature-icon">⚡</span>
                                <span>Быстрая обработка данных</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🔒</span>
                                <span>Безопасное хранение</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">📊</span>
                                <span>Детальная аналитика</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Правая часть - Форма */}
                <div className="login-form-section">
                    <div className="form-container">
                        <div className="form-header">
                            <h2 className="form-title">Вход в аккаунт</h2>
                            <p className="form-subtitle">Введите ваши учетные данные</p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="input-group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="login-input"
                                    placeholder=" "
                                    required
                                />
                                <label className="input-label">Email адрес</label>
                                <span className="input-icon">📧</span>
                            </div>

                            <div className="input-group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="login-input"
                                    placeholder=" "
                                    required
                                />
                                <label className="input-label">Пароль</label>
                                <span className="input-icon">🔑</span>
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="checkbox-input"
                                    />
                                    <span className="checkmark"></span>
                                    Запомнить меня
                                </label>
                                
                                <Link to="/forgot-password" className="forgot-link">
                                    Забыли пароль?
                                </Link>
                            </div>

                            <button 
                                type="submit" 
                                className={`login-btn ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                                onClick={()=>{}}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Вход...
                                    </>
                                ) : (
                                    <>
                                        <span className="btn-icon">🚀</span>
                                        Войти в аккаунт
                                    </>
                                )}
                            </button>

                            <div className="demo-section">
                                <button 
                                    type="button" 
                                    className="demo-btn"
                                    onClick={handleDemoLogin}
                                >
                                    <span className="demo-icon">👤</span>
                                    Использовать демо-аккаунт
                                </button>
                            </div>
                        </form>

                        <div className="form-footer">
                            <p className="footer-text">
                                Еще нет аккаунта?{' '}
                                <Link to="/registration" className="register-link">
                                    Зарегистрироваться
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;