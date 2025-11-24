import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Левый блок - Логотип и описание */}
                <div className="footer-section">
                    <div className="footer-logo">
                        <span className="logo-icon"></span>
                        <span className="logo-text">WebEncoder</span>
                    </div>
                    <p className="footer-description">
                        Профессиональное кодирование и декодирование данных. 
                        Быстро, безопасно, удобно.
                    </p>
                    
                </div>

                {/* Центральный блок - Навигация */}
                <div className="footer-section">
                    <h3 className="footer-title">Навигация</h3>
                    <nav className="footer-nav">
                        <Link to="/encoder" className="footer-link">
                            <span className="link-icon">🔐</span>
                            Закодировать
                        </Link>
                        <Link to="/decoder" className="footer-link">
                            <span className="link-icon">🔓</span>
                            Раскодировать
                        </Link>
                        <Link to="/results" className="footer-link">
                            <span className="link-icon">📊</span>
                            Результаты
                        </Link>
                        <Link to="/profile" className="footer-link">
                            <span className="link-icon">👤</span>
                            Профиль
                        </Link>
                    </nav>
                </div>

                {/* Правый блок - Контакты и информация */}
                <div className="footer-section">
                    <h3 className="footer-title">Контакты</h3>
                    <div className="contact-info">
                        <div className="contact-item">
                            <span className="contact-icon">📧</span>
                            <span>pochepayka@webencoder.com</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-icon">🌐</span>
                            <span>webencoder.com</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Нижняя часть футера */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <div className="copyright">
                        © {currentYear} WebEncoder. Все права защищены.
                    </div>
                    <div className="footer-links">
                        <Link to="/privacy" className="footer-bottom-link">
                            Политика конфиденциальности
                        </Link>
                        <Link to="/terms" className="footer-bottom-link">
                            Условия использования
                        </Link>
                        <Link to="/cookies" className="footer-bottom-link">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;