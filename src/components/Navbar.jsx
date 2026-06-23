import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isOpen, setIsOpen] = useState(false);

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
    { name: t('nav.tracks'), path: '/tracks' }
  ];

  return (
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
