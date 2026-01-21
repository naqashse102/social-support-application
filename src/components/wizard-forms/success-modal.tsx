import { CheckCircle2, Home } from "lucide-react";
import Button from "../common/button";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const referenceNumber = useMemo(
    () => Math.floor(Math.random() * 548949465464),
    [],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent accidental double-submits or scrolls
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-500"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-background w-full  sm:min-w-100 md:min-w-100 lg:min-w-2xl max-w-3xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-border overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <div className="relative h-40 bg-accent/10 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-accent via-transparent to-transparent animate-pulse" />
          <div className="relative bg-white rounded-full p-4 shadow-xl shadow-accent/20">
            <CheckCircle2
              size={64}
              className="text-accent animate-bounce-short"
            />
          </div>
        </div>

        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-tight rtl:tracking-normal">
            {t("success.title", "Application Submitted")}
          </h2>
          <p className="text-text-secondary mt-2 text-sm leading-relaxed">
            {t(
              "success.message",
              "Your request for social support has been successfully received.",
            )}
          </p>

          {/* Reference Card */}
          <div className="mt-8 p-4 bg-muted rounded-2xl border border-border/50">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest rtl:tracking-normal">
              {t("success.reference_label", "Reference Number")}
            </span>
            <div
              className="text-xl font-mono font-bold text-primary mt-1 tracking-wider"
              dir="ltr"
            >
              {referenceNumber}
            </div>
          </div>

          <div className="mt-10">
            <Button
              variant="secondary"
              icon={<Home size={18} />}
              onClick={onClose}
              iconPosition={isRtl ? "right" : "left"}
            >
              {t("success.button", "Return to Home")}
            </Button>
          </div>
        </div>

        <div className="p-4 bg-surface border-t border-border text-center">
          <p className="text-[11px] text-text-secondary italic">
            {t(
              "success.email_note",
              "A confirmation email has been sent to your registered address.",
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
