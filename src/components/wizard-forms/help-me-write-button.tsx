import { AlertCircle, RefreshCw, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { openAIApi } from "../../services/api.http";
import { FIELD_PROMPTS } from "../../utils/constants";
import AIAssitantModal from "./ai-assitant-modal";

interface HelpMeWriteButtonProps {
  fieldId: string;
  currentValue: string;
  onAccept: (suggestion: string) => void;
}

const HelpMeWriteButton = ({
  fieldId,
  currentValue,
  onAccept,
}: HelpMeWriteButtonProps) => {
  const { t, i18n } = useTranslation();
  const [suggestion, setSuggestion] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const fetchAISuggestion = useCallback(async () => {
    setStatus("loading");
    setErrMsg("");

    const currentLang = i18n.language === "ar" ? "Arabic" : "English";
    const config = FIELD_PROMPTS[fieldId] || {
      system: "Help the user write a professional application description.",
      userPrefix: "Improve this text: ",
    };

    try {
      const response = await openAIApi.post("/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            // Dynamically tell the AI to respond in the active language
            content: `${config.system} Use formal ${currentLang}. Keep the response between 60 and 400 characters. Respond ONLY in ${currentLang}. Do not use placeholders like '[Name]'.`,
          },
          {
            role: "user",
            content: `${config.userPrefix} "${currentValue || "I am currently facing difficulties and need assistance."}"`,
          },
        ],
        temperature: 0.7,
        max_tokens: 200, 
      });

       response.data.choices[0].message?.content && setSuggestion(response.data.choices[0].message.content);
        setIsModalOpen(true);
        setStatus("idle");
    } catch (err: any) {
      setStatus("error");
      if (err?.response?.status === 429) {
        setErrMsg(t("ai.errors.rate_limit", "AI is busy. Try later."));
      }else if (err?.code === "ECONNABORTED") {
        t("ai.errors.no_connection", "Connection timed out. Retrying...");
      }  else {
        setErrMsg(
          t("ai.errors.generic", "AI Assistant is currently unavailable."),
        );
      }

      setTimeout(() => {
        setStatus("idle");
        setErrMsg("");
      }, 5000);
    }
  }, [currentValue, fieldId, i18n.language, t]);

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={fetchAISuggestion}
          disabled={status === "loading"}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[14px] font-bold transition-all border cursor-pointer
          ${
            status === "loading"
              ? "bg-muted text-text-secondary border-border cursor-wait"
              : status === "error"
                ? "bg-destructive/10 text-destructive border-destructive mb-4"
                : "bg-accent/10 text-accent border-accent/20 hover:bg-accent hover:text-white"
          }
        `}
        >
          {status === "loading" ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : status === "error" ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <Sparkles className="h-5 w-5 text-sparkle-gold" />
          )}

          {status === "loading" && t("ai.status.loading", "AI is thinking...")}
          {status === "error" && t("ai.status.error", "Try again?")}
          {status === "idle" && t("ai.status.idle", "Help me write")}
        </button>

        {status === "error" && errMsg && (
          <div className="absolute top-11 ltr:right-0 rtl:left-0 z-50 w-75 p-2 bg-destructive text-white text-[11px] rounded-md shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errMsg}</span>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <AIAssitantModal
          setIsModalOpen={setIsModalOpen}
          suggestion={suggestion}
          setSuggestion={setSuggestion}
          onAccept={onAccept}
          title={t(
            `situation.fields.${fieldId === "financialSituation" ? "financial" : fieldId === "employmentCircumstances" ? "employment" : "reason"}.label`,
          )}
        />
      )}
    </>
  );
};

export default HelpMeWriteButton;
