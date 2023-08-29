import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import hr from './hr.json';

const resources = {
  en: {
    translation: en,
  },
  hr: {
    translation: hr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'hr',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false
  }
});
export default i18n