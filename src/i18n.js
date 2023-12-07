import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform } from "react-native";
import "intl-pluralrules";

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    const locale =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    callback(locale.split("_")[0]);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources: {
      // eslint-disable-next-line no-undef
      en: { translation: require("./locales/en.json") },
      // eslint-disable-next-line no-undef
      ru: { translation: require("./locales/ru.json") },
    },
    fallbackLng: "en",
    debug: false,
  });

export default i18n;
