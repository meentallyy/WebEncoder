import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './profile.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: 'Александр Петров',
        email: 'alex.petrov@webencoder.com',
        phone: '+7 (999) 123-45-67',
        avatar: '👨‍💻',
        joinDate: '15 января 2024',
        subscription: 'Pro',
        encodingUsage: 156,
        maxEncoding: 1000,
        filesStored: 47,
        maxFiles: 200
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleSave = () => {
        setUser(editedUser);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    const handleChange = (field: string, value: string) => {
        setEditedUser(prev => ({ ...prev, [field]: value }));
    };

    const encodingProgress = (user.encodingUsage / user.maxEncoding) * 100;
    const storageProgress = (user.filesStored / user.maxFiles) * 100;

    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* Хедер профиля */}
                <div className="profile-header">
                    <div className="header-content">
                        <h1 className="profile-title">
                            <span className="profile-icon">👤</span>
                            Мой профиль
                        </h1>
                        <p className="profile-subtitle">
                            Управляйте вашей учетной записью и настройками
                        </p>
                    </div>
                    
                    <div className="header-actions">
                        {!isEditing ? (
                            <button 
                                className="edit-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                <span className="btn-icon">✏️</span>
                                Редактировать профиль
                            </button>
                        ) : (
                            <div className="edit-actions">
                                <button className="save-btn" onClick={handleSave}>
                                    <span className="btn-icon">💾</span>
                                    Сохранить
                                </button>
                                <button className="cancel-btn" onClick={handleCancel}>
                                    <span className="btn-icon">❌</span>
                                    Отмена
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="profile-content">
                    {/* Левая колонка - Аватар и информация */}
                    <div className="profile-sidebar">
                        <div className="avatar-section">
                            <div className="avatar-large">
                                {user.avatar}
                            </div>
                            <div className="avatar-info">
                                <h3 className="user-name">{user.name}</h3>
                                <p className="user-email">{user.email}</p>
                                <span className={`subscription-badge subscription-${user.subscription.toLowerCase()}`}>
                                    {user.subscription}
                                </span>
                            </div>
                        </div>

                        <div className="stats-section">
                            <div className="stat-item">
                                <div className="stat-icon">📅</div>
                                <div className="stat-info">
                                    <div className="stat-label">Дата регистрации</div>
                                    <div className="stat-value">{user.joinDate}</div>
                                </div>
                            </div>
                            
                            <div className="stat-item">
                                <div className="stat-icon">🔐</div>
                                <div className="stat-info">
                                    <div className="stat-label">Активность</div>
                                    <div className="stat-value">Активен</div>
                                </div>
                            </div>
                        </div>

                        <div className="quick-actions">
                            <h4 className="actions-title">Быстрые действия</h4>
                            <Link to="/encoder" className="quick-action">
                                <span className="action-icon">🔐</span>
                                Новое кодирование
                            </Link>
                            <Link to="/results" className="quick-action">
                                <span className="action-icon">📊</span>
                                Мои результаты
                            </Link>
                            <button className="quick-action">
                                <span className="action-icon">⚙️</span>
                                Настройки
                            </button>
                        </div>
                    </div>

                    {/* Правая колонка - Основная информация */}
                    <div className="profile-main">
                        <div className="info-cards">
                            {/* Карточка личной информации */}
                            <div className="info-card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <span className="card-icon">📋</span>
                                        Личная информация
                                    </h3>
                                </div>
                                <div className="card-content">
                                    {isEditing ? (
                                        <div className="edit-form">
                                            <div className="form-group">
                                                <label className="form-label">Имя и фамилия</label>
                                                <input
                                                    type="text"
                                                    value={editedUser.name}
                                                    onChange={(e) => handleChange('name', e.target.value)}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    value={editedUser.email}
                                                    onChange={(e) => handleChange('email', e.target.value)}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Телефон</label>
                                                <input
                                                    type="tel"
                                                    value={editedUser.phone}
                                                    onChange={(e) => handleChange('phone', e.target.value)}
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="info-grid">
                                            <div className="info-item">
                                                <span className="info-label">Имя и фамилия</span>
                                                <span className="info-value">{user.name}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Email</span>
                                                <span className="info-value">{user.email}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Телефон</span>
                                                <span className="info-value">{user.phone}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Карточка использования */}
                            <div className="info-card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <span className="card-icon">📊</span>
                                        Использование сервиса
                                    </h3>
                                </div>
                                <div className="card-content">
                                    <div className="usage-item">
                                        <div className="usage-header">
                                            <span className="usage-label">Кодирования</span>
                                            <span className="usage-count">
                                                {user.encodingUsage} / {user.maxEncoding}
                                            </span>
                                        </div>
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill encoding-progress"
                                                style={{ width: `${encodingProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <div className="usage-item">
                                        <div className="usage-header">
                                            <span className="usage-label">Хранилище файлов</span>
                                            <span className="usage-count">
                                                {user.filesStored} / {user.maxFiles}
                                            </span>
                                        </div>
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill storage-progress"
                                                style={{ width: `${storageProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Карточка подписки */}
                            <div className="info-card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <span className="card-icon">💎</span>
                                        Подписка
                                    </h3>
                                </div>
                                <div className="card-content">
                                    <div className="subscription-info">
                                        <div className="subscription-current">
                                            <span className="subscription-name">{user.subscription}</span>
                                            <span className="subscription-status">Активна</span>
                                        </div>
                                        <p className="subscription-description">
                                            Доступно {user.maxEncoding} кодирований в месяц и 
                                            хранение до {user.maxFiles} файлов
                                        </p>
                                        <button className="upgrade-btn">
                                            <span className="btn-icon">🚀</span>
                                            Обновить подписку
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Карточка безопасности */}
                            <div className="info-card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <span className="card-icon">🔒</span>
                                        Безопасность
                                    </h3>
                                </div>
                                <div className="card-content">
                                    <div className="security-items">
                                        <div className="security-item">
                                            <span className="security-label">Последний вход</span>
                                            <span className="security-value">2 часа назад</span>
                                        </div>
                                        <div className="security-item">
                                            <span className="security-label">Двухфакторная аутентификация</span>
                                            <span className="security-status inactive">Не активна</span>
                                        </div>
                                        <button className="security-btn">
                                            <span className="btn-icon">🛡️</span>
                                            Настроить безопасность
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;