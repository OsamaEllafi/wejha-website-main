import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Globe, Menu, X, Hammer, QrCode, UserCheck, Bell, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isOpen, setIsOpen] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLng);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.stats'), path: '/statistics' },
    { name: t('nav.quiz'), path: '/quiz' },
    { name: t('nav.media'), path: '/media' },
    { name: t('nav.tracks'), path: '/tracks' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  return (
    <>
      <nav className="glass-panel navbar-container">
        <div className="navbar-content">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <img 
            src={theme === 'light' 
              ? `${import.meta.env.BASE_URL}assets/images/logo png/wejha_logo_cropped.png` 
              : `${import.meta.env.BASE_URL}assets/images/logo png/wejha_logo_cropped_dark_mode.png`} 
            alt="Wejha Logo" 
            className="logo-img"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="nav-active-line"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Controls (Theme, Language, Mobile Menu Button) */}
        <div className="navbar-controls">
          {/* Highlighted Portal Button */}
          <button 
            onClick={() => setShowDevModal(true)} 
            className="navbar-portal-btn"
          >
            <span>{t('nav.portal')}</span>
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="control-btn" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Language Toggle */}
          <button onClick={toggleLanguage} className="control-btn lang-toggle" aria-label="Toggle Language">
            <Globe size={20} />
            <span className="lang-text">{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {/* Mobile Menu Icon */}
          <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-btn" aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-nav"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Highlighted Mobile Portal Button */}
            <button 
              onClick={() => {
                setIsOpen(false);
                setShowDevModal(true);
              }} 
              className="mobile-navbar-portal-btn"
            >
              <span>{t('nav.portal')}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

      {/* Portal Development Warning Modal */}
      <AnimatePresence>
        {showDevModal && (
          <motion.div 
            className="navbar-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDevModal(false)}
          >
            <motion.div 
              className="glass-panel portal-dev-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal-x" onClick={() => setShowDevModal(false)}>
                <X size={20} />
              </button>
              
              <div className="modal-icon-circle-dev">
                <Hammer size={36} className="modal-hammer-icon" />
              </div>
              
              <h3>{t('contact.dev_title')}</h3>
              <p className="modal-dev-subtitle">{t('contact.dev_subtitle')}</p>
              
              <div className="upcoming-features-list">
                <h4>{t('contact.features_title')}</h4>
                
                <div className="feature-item-row">
                  <div className="feat-icon-badge">
                    <UserCheck size={18} />
                  </div>
                  <span>{t('contact.feat_auth')}</span>
                </div>

                <div className="feature-item-row">
                  <div className="feat-icon-badge">
                    <QrCode size={18} />
                  </div>
                  <span>{t('contact.feat_qr')}</span>
                </div>

                <div className="feature-item-row">
                  <div className="feat-icon-badge">
                    <ClipboardList size={18} />
                  </div>
                  <span>{t('contact.feat_survey')}</span>
                </div>

                <div className="feature-item-row">
                  <div className="feat-icon-badge">
                    <Bell size={18} />
                  </div>
                  <span>{t('contact.feat_notif')}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowDevModal(false)}
                className="close-dev-modal-btn"
              >
                {t('contact.close_btn')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
