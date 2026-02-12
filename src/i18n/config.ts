import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en, es } from './locales';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es,
            en
        },
        lng: 'es', // Set Spanish as default
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
