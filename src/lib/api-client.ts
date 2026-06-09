import i18n from "@/lang/i18n";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { toast } from "sonner";

/** ------------------------------
 * Configuration
 * -------------------------------*/
const API_BASE_URL = import.meta.env.VITE_API_URL;
const DEFAULT_TIMEOUT = 5000; // Increased for realism; adjust as needed

/** ------------------------------
 * Axios Instance with Interceptors
 * -------------------------------*/
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  withCredentials: true,
  headers: { "Accept-Language": "fa-IR" }, // Consider making this configurable via env
});

// Response interceptor: Handle success toasts globally if needed (but per-request overrides in class)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Global auth handling
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }
    return Promise.reject(error);
  },
);

/** ------------------------------
 * Toast Helper (simplified)
 * -------------------------------*/
const toastError = (message: string, suppress = false) => {
  if (!suppress) toast.error(message);
};
const toastSuccess = (message: string, suppress = false) => {
  if (!suppress) toast.success(message);
};

/** ------------------------------
 * Simplified ApiClient
 * -------------------------------*/
export class ApiClient<T = unknown> {
  private endpoint: string;
  private config: AxiosRequestConfig = {};
  private successMessage?: string;
  private errorMessage?: string;
  private suppressToasts = false;

  constructor(endpoint: string = "") {
    this.endpoint = endpoint;
  }

  /** ---------------- Chainable Builders ---------------- */
  // Merge custom config (e.g., headers, params) while preserving defaults
  setConfig(customConfig: AxiosRequestConfig = {}) {
    this.config = { ...this.config, ...customConfig };
    return this;
  }

  // Set success message for this request
  onSuccess(message: string) {
    this.successMessage = message;
    return this;
  }

  // Set custom error message fallback
  onError(message: string) {
    this.errorMessage = message;
    return this;
  }

  // Suppress toasts for this request
  suppress(flag = true) {
    this.suppressToasts = flag;
    return this;
  }

  /** ---------------- Private Request Handler ---------------- */
  private async request(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    payload?: unknown,
  ): Promise<T> {
    try {
      const response = await axiosInstance({
        method: method.toLowerCase() as any,
        url: this.endpoint,
        data: payload,
        ...this.config,
      });

      if (this.successMessage) {
        toastSuccess(i18n.t(this.successMessage), this.suppressToasts);
      }

      return response.data;
    } catch (error: any) {
      const message =
        this.errorMessage ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        (!error.response && "اتصال به سرور برقرار نشد") ||
        (error.code === "ECONNABORTED"
          ? "درخواست شما به دلیل زمان طولانی لغو شد"
          : "خطای نامشخص رخ داده است");

      toastError(i18n.t(message), this.suppressToasts);

      // Re-throw for caller to handle (e.g., via try-catch)
      throw error;
    }
  }

  /** ---------------- CRUD Methods (chainable) ---------------- */
  get() {
    return this.request("GET");
  }

  post(payload?: unknown) {
    return this.request("POST", payload);
  }

  put(payload?: unknown) {
    return this.request("PUT", payload);
  }

  patch(payload?: unknown) {
    return this.request("PATCH", payload);
  }

  delete(payload?: unknown) {
    return this.request("DELETE", payload);
  }

  /** ---------------- Factory ---------------- */
  static for<T = unknown>(endpoint: string): ApiClient<T> {
    return new ApiClient<T>(endpoint);
  }
}

export default ApiClient;
