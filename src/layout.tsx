import React from "react";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";
import { LoaderProvider } from "./contexts/app-loader";
import { useTranslation } from "react-i18next";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  return (
    <LoaderProvider>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />

        <main className="flex-1 w-full flex flex-col items-start justify-center py-10 px-4 sm:px-6 lg:px-8 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat bg-fixed">
          <h2 className="text-4xl md:text-5xl text-center font-sans font-bold tracking-tight text-primary mt-3 mb-10 w-full uppercase rtl:tracking-normal">
            {t("layout.main_title", "Social Support Portal")}
          </h2>
          {children}
        </main>

        <Footer />
      </div>
    </LoaderProvider>
  );
};
