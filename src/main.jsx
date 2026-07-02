import { createRoot } from "react-dom/client";
import "./index.css";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import store from "./Redux/store";
import ThemeProvider from "./components/common/ThemeProvider";
import AuthProviderGate from "./components/AuthProviderGate";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:3200/api/v1"
    : "https://blogify-backendpk.vercel.app/api/v1");

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <Toaster richColors position="top-center" />
      <AuthProviderGate />
    </ThemeProvider>
  </Provider>,
);
