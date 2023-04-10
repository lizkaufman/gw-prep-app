import React from "react";
import Button from "@/components/Button";
import CartItemsContainer from "@/components/cartItems/CartItemsContainer";
import styles from "../styles/cartItems.module.css";

const ViewCart = ({
  cartState,
  cartSend,
}: {
  cartState: any;
  cartSend: any;
}) => {
  return (
    <main
      className={`flex flex-column  justify-space-around py-5 ${styles.cartPage}`}
    >
      <h1>Your Cart</h1>
      <CartItemsContainer
        cartItems={cartState.context.cartItems}
        cartSend={cartSend}
      />
      <Button
        handleClick={() => {
          console.log("check out button");
        }}
        buttonText="Check out"
      />
    </main>
  );
};

export default ViewCart;
