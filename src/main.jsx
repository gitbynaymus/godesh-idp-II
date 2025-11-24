import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { RouterProvider } from "react-router";
import router from "./router/router";
import AuthProvider from "./contexts/Auth/AuthProvider";
import { Toaster } from "react-hot-toast";
import PageTransitionWrapper from "./Animation/PageTransitionWrapper";
import useLenisScroll from "./Animation/Hooks/useLenisScroll";
const queryClient = new QueryClient();

export function LenisProvider() {
  useLenisScroll();
  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
