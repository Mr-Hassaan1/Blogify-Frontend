import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store";

import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "./components/common/ThemeProvider";
import AuthProviderGate from "./components/authenticationPages/AuthProviderGate";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <Toaster richColors position="top-center" />
      <AuthProviderGate />
    </ThemeProvider>
  </Provider>,
);
