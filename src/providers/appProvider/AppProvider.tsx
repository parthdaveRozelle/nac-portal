"use client";

import { IReactNode } from "@/interfaces";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";
import { ThemeProvider } from "@mui/material";
import { charcoal } from "@/styles";

export const AppProvider = ({ children }: IReactNode) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={charcoal}>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
