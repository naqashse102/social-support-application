import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full font-sans border-t border-border">
      <section className="bg-footer-background py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-center md:text-start">
              <span className="text-primary-foreground font-bold">
                {t("footer.copyright", "@2026 Government Social Support Portal")}
              </span>

              <span className="hidden md:block w-px h-4 bg-border"></span>

              <span className="text-primary-foreground text-sm">
                {t("footer.rights", "All rights reserved")}
              </span>
            </div>
          </div>
      </section>
    </footer>
  );
};

export default Footer;