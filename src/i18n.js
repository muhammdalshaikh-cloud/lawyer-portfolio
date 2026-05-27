import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar.json';
import en from './locales/en.json';
import ur from './locales/ur.json';

const resources = {
  ar: { translation: ar },
  en: { translation: en },
  ur: { translation: ur }
};

// Get language from URL
const getLanguageFromURL = () => {
  const path = window.location.pathname;
  if (path.startsWith('/en')) return 'en';
  if (path.startsWith('/ur')) return 'ur';
  if (path.startsWith('/ar')) return 'ar';
  return 'ar';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguageFromURL(),
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
