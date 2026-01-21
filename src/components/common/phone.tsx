import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { COUNTRY_CODES } from "../../utils/constants";

interface PhoneInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const PhoneInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required,
}: PhoneInputProps<T>) => {
  const inputId = `phone-${name}`;
  const codeId = `code-${name}`;
  const errorId = `${name}-error`;

  return (
    <div className="w-full">
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
        render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
          const activeCode = COUNTRY_CODES.find((c) => value?.startsWith(c.code))?.code || "+971";
          const currentNumber = value?.replace(activeCode, "") || "";

          const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            onChange(e.target.value + currentNumber);
          };

          const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let input = e.target.value.replace(/\D/g, "");
            if (input.startsWith("0")) input = input.slice(1);
            onChange(activeCode + input);
          };

          return (
            <div role="group" aria-labelledby={inputId}>
              <div className="flex gap-0 group">
                <div className="relative">
                  <select
                    id={codeId}
                    value={activeCode}
                    onChange={handleCodeChange}
                    aria-label="Country Code"
                    className="w-20 h-12.5 px-2 border border-e-0 rounded-s-md bg-muted text-text text-sm focus:outline-none border-border appearance-none cursor-pointer focus:ring-2 focus:ring-primary/20 z-10 transition-all"
                  >
                    {COUNTRY_CODES.map((item) => (
                      <option key={item.iso} value={item.code}>
                       {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  {...field}
                  id={inputId}
                  value={currentNumber}
                  onChange={handleNumberChange}
                  type="tel"
                  placeholder={placeholder}
                  aria-required={required}
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? errorId : undefined}
                  className={`w-full h-12.5 px-4 border rounded-e-md bg-input text-text text-start transition-all outline-none focus:ring-2 ${
                    error
                      ? "border-destructive focus:ring-destructive/20 ring-2 ring-destructive/20"
                      : "border-border focus:border-primary focus:ring-primary/20"
                  }`}
                />
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
          );
        }}
      />
    </div>
  );
};

export default PhoneInput;