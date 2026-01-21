const formStorageKey = "wizard-form";
const formActiveStepKey = "wizard-active-step";

/**
 * LocalStorage Helpers
 * Centralized logic for getting and setting form data
 */
const save = (key: string, data: any) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

const get = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return null;
  }
};

const clear = () => {
  localStorage.clear();
};

export { save, get, clear, formStorageKey, formActiveStepKey };
