import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import store from "./Redux/store";
import ThemeProvider from "./components/ThemeProvider";
import AuthProviderGate from "./components/AuthProviderGate";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <Toaster richColors position="top-center" />
      <AuthProviderGate />
    </ThemeProvider>
  </Provider>,
);
