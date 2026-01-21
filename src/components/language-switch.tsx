import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex items-center gap-4 select-none">
      <span className="font-aptos font-bold text-lg text-primary ">
        {i18n.language === "en" ? "العربية" : "English"}
      </span>
      <span className="text-text text-lg font-bold">|</span>

      <button
        onClick={toggleLanguage}
        aria-label={
          i18n.language === "en" ? "Switch to Arabic" : "Switch to English"
        }
        className="group relative flex items-center justify-center w-12 h-12 rounded-full 
          bg-white shadow-sm border border-border
          transition-all duration-300 ease-out
          hover:border-accent/40 hover:shadow-md
          active:scale-90 active:bg-slate-50
          cursor-pointer"
      >
        <Globe className="w-6 h-6 text-primary group-hover:text-accent group-hover:rotate-12 transition-all duration-300" />

        <div className="absolute inset-0 rounded-full bg-accent/5 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
      </button>
    </div>
  );
};

export default LanguageSwitch;
