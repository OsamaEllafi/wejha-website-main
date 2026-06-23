import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.jsx'

// Inject Vite's BASE_URL into a <style> tag so that public/ assets
// (fonts, images referenced in CSS) resolve correctly on GitHub Pages.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const fontStyle = document.createElement('style');
fontStyle.textContent = `
  @font-face {
    font-family: 'DIN Next LT Arabic';
    src: url('${base}/assets/fonts/DINNextLTArabic-Light.ttf') format('truetype');
    font-weight: 300; font-style: normal; font-display: swap;
  }
  @font-face {
    font-family: 'DIN Next LT Arabic';
    src: url('${base}/assets/fonts/DINNextLTArabic-Regular.ttf') format('truetype');
    font-weight: 400; font-style: normal; font-display: swap;
  }
  @font-face {
    font-family: 'DIN Next LT Arabic';
    src: url('${base}/assets/fonts/DINNextLTArabic-Bold.ttf') format('truetype');
    font-weight: 700; font-style: normal; font-display: swap;
  }
  @font-face {
    font-family: 'DIN Next LT Arabic';
    src: url('${base}/assets/fonts/DINNextLTArabic-Heavy.ttf') format('truetype');
    font-weight: 900; font-style: normal; font-display: swap;
  }
  [data-theme="dark"] .footer-logo-img {
    content: url('${base}/assets/images/logo png/wejha_logo_cropped_dark_mode.png');
  }
`;
document.head.appendChild(fontStyle);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

