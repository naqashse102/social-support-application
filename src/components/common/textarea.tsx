import { Controller } from "react-hook-form";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  control: any;
  label: string;
  hintText?: string;
  className?: string;
}

export const Textarea = ({
  name,
  control,
  label,
  placeholder,
  required,
  rows = 4,
  hintText,
  className,
  ...props
}: TextareaProps) => {
  const textareaId = `textarea-${name}`;
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={textareaId}
        className="block mb-1 text-text-secondary font-medium text-start"
      >
        {label}
        {required && (
          <span className="text-destructive ms-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <textarea
              {...field}
              id={textareaId}
              rows={rows}
              placeholder={placeholder}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={
                error ? errorId : hintText ? hintId : undefined
              }
              aria-required={required}
              className={`w-full p-4 border rounded-md text-text text-start placeholder-text-muted transition-all resize-none outline-none focus:ring-2
              ${
                error
                  ? "border-destructive bg-destructive/5 focus:border-destructive ring-destructive/20"
                  : "border-border focus:border-primary focus:ring-primary/20"
              }
            `}
              {...props}
            />

              {error ? (
                <span
                  id={errorId}
                  role="alert" // immediately show error to screen readers
                  className="text-sm font-medium text-destructive flex items-center gap-1 animate-in fade-in duration-200"
                >
                  {error.message}
                </span>
              ) : (
                hintText && (
                  <span 
                    id={hintId} 
                    className="text-[11px] text-text-secondary italic block"
                  >
                    {hintText}
                  </span>
                )
              )}
          </>
        )}
      />
    </div>
  );
};

export default Textarea;