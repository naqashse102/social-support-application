import axios from "axios";
import axiosRetry from "axios-retry";

export const openAIApi = axios.create({
  baseURL: "https://api.openai.com/v1",
  // baseURL: "https://cors-anywhere.com/https://openai-mock.mock.beeceptor.com",
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  },
});

axiosRetry(openAIApi, {
  retries: 3,
  retryDelay: (retryCount) => {
    return axiosRetry.exponentialDelay(retryCount);
  },
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === "ECONNABORTED" ||
      (error.response?.status ? error.response.status >= 500 : false)
    );
  },
  onRetry: (retryCount, error) => {
    if (import.meta.env.DEV) {
      // A check that only used for development
      console.warn(`Retry attempt #${retryCount} due to: ${error.message}`);
    }
  },
});


