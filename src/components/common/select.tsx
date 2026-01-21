import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  id?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const Select = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  id,
  className = "",
  required,
  disabled
}: SelectProps<T>) => {
  const selectId = id || `select-${name}`;
  const errorId = `${name}-error`;

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={selectId}
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
        render={({ field, fieldState: { error }  }) => (
          <div className="relative">
            <select
              {...field}
              disabled={disabled}
              id={selectId}
              value={field.value ?? ""}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? errorId : undefined}
              aria-required={required}
              className={`w-full px-4 py-3 border rounded-md text-text text-start appearance-none bg-input transition-all outline-none focus:ring-2 ${
                error
                  ? "border-destructive focus:ring-destructive/20 ring-2 ring-destructive/20"
                  : "border-border focus:border-primary focus:ring-primary/20"
              } ${!field.value ? "text-text-muted" : "text-text"} ${
                disabled ? "bg-muted cursor-not-allowed opacity-60" : "bg-background"
              }`}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Custom Chevron - Positioned based on RTL/LTR */}
            <div className="pointer-events-none absolute inset-y-0 flex items-center px-3 ltr:right-0 rtl:left-0">
              <ChevronDown className="h-4 w-4 text-text-muted" />
            </div>

              {error && (
                <p 
                  id={errorId} 
                  role="alert" 
                  className="text-destructive text-sm font-medium text-start animate-in fade-in duration-200"
                >
                  {error.message}
                </p>
              )}
          </div>
        )}
      />
    </div>
  );
}

export default Select;