import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowUpRight } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const base = import.meta.env.BASE_URL;
  const theme = localStorage.getItem('theme') || 'light';
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.stats'), path: '/statistics' },
    { name: t('nav.quiz'), path: '/quiz' },
    { name: t('nav.media'), path: '/media' },
    { name: t('nav.tracks'), path: '/tracks' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  return (
    <footer className="glass-panel footer-container" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="footer-content">
        {/* Column 1: Logo & Brief Bio */}
        <div className="footer-col brand-col">
          <div className="footer-logo-wrapper">
            <img 
              src={theme === 'light'
                ? `${base}assets/images/logo png/wejha_logo_cropped.png`
                : `${base}assets/images/logo png/wejha_logo_cropped_dark_mode.png`} 
              alt="Wejha Logo" 
              className="footer-logo-img"
            />
          </div>
          <p className="footer-bio-text">
            {t('footer.description')}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col links-col">
          <h3 className="footer-title">{t('footer.quick_links')}</h3>
          <ul className="footer-links-list">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path} className="footer-link">
                  <ArrowUpRight size={14} className="link-arrow" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact & Socials */}
        <div className="footer-col contact-col">
          <h3 className="footer-title">{t('footer.contact_us')}</h3>
          <p className="contact-sub">{t('hero.sponsor')}</p>
          <div className="social-icons-row">
            <a href="https://www.facebook.com/share/17jYdNTeBv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-icon-btn facebook" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/wejha_wejha?igsh=dWs3eGx6cjN1cWt1" target="_blank" rel="noopener noreferrer" className="social-icon-btn instagram" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="https://www.tiktok.com/@wejha_wejha?_r=1&_t=ZS-97VpTmN1mPU" target="_blank" rel="noopener noreferrer" className="social-icon-btn tiktok" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a href="mailto:info@wejha.org.ly" className="social-icon-btn email" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-divider"></div>
      <div className="footer-bottom">
        <p className="copyright-text">
          {t('footer.copyright', { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}
