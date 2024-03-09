import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/index.css";
import { BrowserRouter } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import SocketContextProvider from "./context/socketContext.jsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

if (import.meta.env.VITE_APP_NODE_DEV === "production") {
   disableReactDevTools();
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools />
         <BrowserRouter>
            <SocketContextProvider>
               <Toaster position="top-right" richColors />
               <App />
            </SocketContextProvider>
         </BrowserRouter>
      </QueryClientProvider>
   </React.StrictMode>
);
