import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationAR from './locales/ar.json';
import translationEN from './locales/en.json';

const resources = {
  ar: {
    translation: translationAR
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    debug: false,
    interpolation: {
      escapeValue: false // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Handle text direction and lang attribute on document change
const updateDocumentAttributes = (lng) => {
  const rootHtml = document.documentElement;
  rootHtml.setAttribute('lang', lng);
  if (lng === 'ar') {
    rootHtml.setAttribute('dir', 'rtl');
  } else {
    rootHtml.setAttribute('dir', 'ltr');
  }
};

// Initial setup
updateDocumentAttributes(i18n.language || 'ar');

// Listen to language changes
i18n.on('languageChanged', (lng) => {
  updateDocumentAttributes(lng);
});

export default i18n;
