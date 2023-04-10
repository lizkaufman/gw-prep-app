import React, { createContext, useContext } from "react";
import { useMachine } from "@xstate/react";
import { shoppingCartMachine } from "./shoppingCartMachine";

// Define the context type
interface ShoppingCartContextValue {
  state: ReturnType<typeof useMachine>[0];
  send: ReturnType<typeof useMachine>[1];
  //By using ReturnType<typeof useMachine> for both state and send properties in the ShoppingCartContextValue interface, we directly utilize the types returned by the useMachine hook. This should resolve the TypeScript errors related to state and send.
}

const ShoppingCartContext = createContext<ShoppingCartContextValue | null>(
  null
);

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (context === null) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  children,
}) => {
  const [state, send] = useMachine(shoppingCartMachine);

  return (
    <ShoppingCartContext.Provider value={{ state, send }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
