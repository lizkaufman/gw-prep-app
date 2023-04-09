import React from "react";
import { AppProps } from "next/app";
import { ShoppingCartProvider } from "./machines/shoppingCartMachine/shoppingCartContext";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ShoppingCartProvider>
      <Component {...pageProps} />
    </ShoppingCartProvider>
  );
};

export default MyApp;
