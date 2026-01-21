import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const DirectionHandler = () => {
  const { i18n: {language} } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  return null;
}
