import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  id?: string;
  className?: string; 
  required?: boolean;
}

const Input = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  id,
  className = "",
  required,
}: InputProps<T>) => {
  const inputId = id || `input-${name}`;
  const errorId = `${name}-error`;

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={inputId}
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
            <input
              {...field}
              id={inputId}
              type={type}
              placeholder={placeholder}
              value={field.value ?? ""}
              aria-required={required}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? errorId : undefined}
              className={`w-full px-4 py-3 border rounded-md text-text text-start placeholder-text-muted transition-all outline-none focus:ring-2 ${
                error
                  ? "border-destructive focus:ring-destructive/20 ring-2 ring-destructive/20"
                  : "border-border focus:border-primary focus:ring-primary/20"
              } bg-input`}
            />
            
              {error && (
                <p 
                  id={errorId} 
                  role="alert" // Ensures immediate announcement of the error
                  className="text-destructive text-sm font-medium text-start animate-in fade-in duration-200"
                >
                  {error.message}
                </p>
              )}
          </>
        )}
      />
    </div>
  );
}

export default Input;