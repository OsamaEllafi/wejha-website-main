import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Globe, Menu, X, Hammer, QrCode, UserCheck, Bell, ClipboardList, Home, BookOpen, BarChart2, Compass, Image as ImageIcon, Cpu, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 } 
  }
};

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
    { name: t('nav.home'), path: '/', icon: <Home size={18} /> },
    { name: t('nav.about'), path: '/about', icon: <BookOpen size={18} /> },
    { name: t('nav.stats'), path: '/statistics', icon: <BarChart2 size={18} /> },
    { name: t('nav.quiz'), path: '/quiz', icon: <Compass size={18} /> },
    { name: t('nav.media'), path: '/media', icon: <ImageIcon size={18} /> },
    { name: t('nav.tracks'), path: '/tracks', icon: <Cpu size={18} /> },
    { name: t('nav.contact'), path: '/contact', icon: <Mail size={18} /> }
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
                  <span className="mobile-nav-icon">{link.icon}</span>
                  <span className="mobile-nav-text">{link.name}</span>
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
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Backlight Ambient Glow */}
              <div className="modal-glow-backlight"></div>

              {/* Top Close Button */}
              <button className="close-modal-x" onClick={() => setShowDevModal(false)}>
                <X size={20} />
              </button>
              
              {/* Active Development Status Badge */}
              <span className="dev-status-tag">
                <span className="pulse-dot"></span>
                {t('contact.dev_badge')}
              </span>
              
              {/* Premium Futuristic Animated Illustration */}
              <div className="portal-dev-illustration">
                <div className="illustration-ring ring-1"></div>
                <div className="illustration-ring ring-2"></div>
                <div className="illustration-center">
                  <Hammer size={32} className="modal-hammer-icon" />
                </div>
              </div>
              
              <h3>{t('contact.dev_title')}</h3>
              <p className="modal-dev-subtitle">{t('contact.dev_subtitle')}</p>
              
              {/* Development Progress Tracker */}
              <div className="dev-progress-container">
                <div className="dev-progress-header">
                  <span>{t('contact.dev_progress')}</span>
                  <span className="progress-percent">{t('contact.dev_progress_val')}</span>
                </div>
                <div className="dev-progress-track">
                  <motion.div 
                    className="dev-progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              {/* Features List using Staggered Cascade Cards */}
              <div className="upcoming-features-wrapper">
                <h4>{t('contact.features_title')}</h4>
                
                <motion.div 
                  className="upcoming-features-list"
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="feature-item-card">
                    <div className="feat-icon-badge">
                      <UserCheck size={18} />
                    </div>
                    <span>{t('contact.feat_auth')}</span>
                  </motion.div>
  
                  <motion.div variants={itemVariants} className="feature-item-card">
                    <div className="feat-icon-badge">
                      <QrCode size={18} />
                    </div>
                    <span>{t('contact.feat_qr')}</span>
                  </motion.div>
  
                  <motion.div variants={itemVariants} className="feature-item-card">
                    <div className="feat-icon-badge">
                      <ClipboardList size={18} />
                    </div>
                    <span>{t('contact.feat_survey')}</span>
                  </motion.div>
  
                  <motion.div variants={itemVariants} className="feature-item-card">
                    <div className="feat-icon-badge">
                      <Bell size={18} />
                    </div>
                    <span>{t('contact.feat_notif')}</span>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Action Button */}
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
