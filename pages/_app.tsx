import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import RootLayout from "../components/RootLayout";
import Head from "next/head";

import {
  ShoppingCartProvider,
  useShoppingCart,
} from "../libs/machines/shoppingCartMachine/shoppingCartContext";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { state, send } = useShoppingCart();

  return (
    <RootLayout>
      <Component {...pageProps} cartState={state} cartSend={send} />
    </RootLayout>
  );
};

function AppWithProvider(props: AppProps) {
  return (
    <ShoppingCartProvider>
      <Head>
        <title>Games Workshop</title>
      </Head>
      <App {...props} />
    </ShoppingCartProvider>
  );
}

export default AppWithProvider;
