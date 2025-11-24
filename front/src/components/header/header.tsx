import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileSvg from '../../svg/profileSvg.tsx';
import './header.css';

const Header = () => {
    const location = useLocation();
    
    return(
        <header className="header">
            <nav className="header-nav">
                {/* Левый спейсер для балансировки */}
                <div className="nav-spacer"></div>

                {/* Центрированные ссылки */}
                <div className="nav-center">
                    <div className="nav-links">
                        <Link 
                            to={'/encoder'} 
                            className={`nav-link ${location.pathname === '/encoder' ? 'nav-link-active' : ''}`}
                        >
                            <span className="nav-icon"></span>
                            Закодировать
                        </Link>

                        <Link 
                            to={'/decoder'} 
                            className={`nav-link ${location.pathname === '/decoder' ? 'nav-link-active' : ''}`}
                        >
                            <span className="nav-icon"></span>
                            Раскодировать
                        </Link>

                        <Link 
                            to={'/results'} 
                            className={`nav-link ${location.pathname === '/results' ? 'nav-link-active' : ''}`}
                        >
                            <span className="nav-icon"></span>
                            Результаты
                        </Link>
                    </div>
                </div>

                {/* Иконка профиля справа */}
                <div className="profile-section">
                    <Link to={'/profile'} className="profile-link">
                        <ProfileSvg size={70}/>
                        <span className="profile-tooltip">Профиль</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;