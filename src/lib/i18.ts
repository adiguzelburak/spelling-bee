import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en";
import tr from "./languages/tr";

const resources = {
  en,
  tr,
};

// const lang = localStorage.getItem("lang");

i18n.use(initReactI18next).init({
  resources,
  lng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
