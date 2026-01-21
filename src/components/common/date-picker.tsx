import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

interface DatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
}

const DatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  required,
}: DatePickerProps<T>) => {
  const datePickerId = `date-${name}`;
  const errorId = `${name}-error`;

  return (
    <div className="w-full">
      <label 
        htmlFor={datePickerId}
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
          <div className="relative">
            <input
              {...field}
              id={datePickerId}
              type="date"
              value={field.value ?? ""}
              aria-required={required}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? errorId : undefined}
              className={`w-full px-4 py-3 border rounded-md bg-input text-text transition-all outline-none focus:ring-2 
                ${
                  error 
                    ? "border-destructive focus:ring-destructive/20 ring-2 ring-destructive/20" 
                    : "border-border focus:border-primary focus:ring-primary/20"
                }
                [&::-webkit-calendar-picker-indicator]:cursor-pointer
                [&::-webkit-calendar-picker-indicator]:opacity-50 
                hover:[&::-webkit-calendar-picker-indicator]:opacity-100
                transition-opacity
              `}
            />

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

export default DatePicker;