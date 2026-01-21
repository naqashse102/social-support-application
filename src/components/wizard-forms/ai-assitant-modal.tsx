import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Button from "../common/button";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AIModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  onAccept: (text: string) => void;
  suggestion: string;
  setSuggestion: Dispatch<SetStateAction<string>>;
  title: string;
}

const AIAssitantModal = ({
  setIsModalOpen,
  onAccept,
  suggestion,
  setSuggestion,
  title,
}: AIModalProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const index = useRef(0);

  useEffect(() => {
    setDisplayText("");
    index.current = 0;
    setIsTyping(true);

    const type = () => {
      if (index.current < suggestion.length) {
        setDisplayText((prev) => prev + suggestion.charAt(index.current));
        index.current++;
        setTimeout(type, 10);
      } else {
        setIsTyping(false);
      }
    };

    type();
  }, [suggestion]);

  const handleKeyNavigation = useCallback(
    (e: KeyboardEvent) => {
     // Only handle Enter and Escape
      if (e.key !== "Enter" && e.key !== "Escape") return;

      // Prevent the Wizard from getting this event
      e.stopImmediatePropagation();

      if (isTyping) return;

      if (e.key === "Enter") {
        e.preventDefault();
        onAccept(suggestion);
        setIsModalOpen(false);
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setIsModalOpen(false);
      }
    },
    [suggestion, isTyping, onAccept, setIsModalOpen], // Added isTyping for safety
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyNavigation);
    return () => window.removeEventListener("keydown", handleKeyNavigation);
  }, [handleKeyNavigation]);

  return (
    <div 
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-100"
    role="dialog" 
    aria-modal="true"
    >
      <div className="bg-background w-full   lg:min-w-2xl max-w-5xl  rounded-xl shadow-2xl border border-border animate-in zoom-in-95 duration-200 overflow-hidden">
        <div className="p-5 border-b border-border flex justify-between items-center bg-surface">
          <h3 className="text-primary font-bold flex items-center gap-2 uppercase tracking-tighter text-lg rtl:tracking-normal">
            {t("ai_modal.title", "AI Suggestion for")} {title}
          </h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="hover:rotate-90 transition-transform cursor-pointer p-1"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        <div className="p-6">
          <textarea
            disabled={isTyping}
            dir="auto"
            className={`
              w-full h-48 p-4 border border-border rounded-md focus:ring-2 focus:ring-primary/20 outline-none text-sm leading-relaxed bg-muted/20
              relative text-slate-700 placeholder:text-slate-400 placeholder:italic
              focus:border-accent/50 transition-all duration-300
              ${isTyping ? "opacity-70 cursor-not-allowed select-none" : "opacity-100"}
              ${isRtl ? "text-right" : "text-left"}
            `}
            value={isTyping ? displayText : suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </div>

        <div className="p-4 bg-surface border-t border-border flex justify-end gap-3">
          <Button
            variant="secondary"
            styleType="outlined"
            onClick={() => setIsModalOpen(false)}
            disabled={isTyping}
          >
            {t("ai_modal.discard", "Discard")}
          </Button>
          <Button
            variant="accent"
            styleType="filled"
            icon={!isTyping && <Check size={16} />}
            onClick={() => {
              onAccept(suggestion);
              setIsModalOpen(false);
            }}
            disabled={isTyping}
            iconPosition={isRtl ? "right" : "left"}
          >
            {isTyping
              ? t("ai_modal.thinking", "AI is thinking...")
              : t("ai_modal.accept", "Accept & Use")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssitantModal;
