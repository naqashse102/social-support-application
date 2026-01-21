import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./i18n/en.json";
import ar from "./i18n/ar.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
