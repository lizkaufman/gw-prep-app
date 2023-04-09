import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import RootLayout from "../components/RootLayout";

import { ShoppingCartProvider } from "../libs/machines/shoppingCartMachine/shoppingCartContext";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ShoppingCartProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ShoppingCartProvider>
  );
};

export default MyApp;
