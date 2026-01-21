/**
 * IsAdult Utility
 * Calculate the age and return boolean if adult => true | false
 */
const isAdult = (birthDate: string): boolean => {
  const dateOfBirth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - dateOfBirth.getFullYear();

  const hadBirthdayThisYear =
    today >= new Date(
      today.getFullYear(),
      dateOfBirth.getMonth(),
      dateOfBirth.getDate()
    );

  if (!hadBirthdayThisYear) {
    age -= 1;
  }

  return age >= 18;
};

/**
 * Debounce Utility
 * Prevents a function from running too frequently.
 * The function will only run after it stops being called for `wait` milliseconds.
 */
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);

    // Start a new timer
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}


const formatEnum = (enumObj: any) => 
    Object.values(enumObj).map((val: any) => ({
      label: val.charAt(0).toUpperCase() + val.slice(1).toLowerCase().replaceAll("_", " "),
      value: val
    }));

export { isAdult, debounce , formatEnum};
