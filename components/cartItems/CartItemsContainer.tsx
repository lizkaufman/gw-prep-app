import React from "react";
import { ItemDetails } from "../itemCards/interfaces";
import CartItem from "./CartItem";
import styles from "../../styles/cartItems.module.css";

interface CartItemsContainerProps {
  cartItems: ItemDetails[];
  cartSend: any;
}

const CartItemsContainer: React.FC<CartItemsContainerProps> = ({
  cartItems,
  cartSend,
}) => {
  if (cartItems.length === 0) {
    return (
      <section>
        <h3 className={`px-5 py-5 flex `}>Your cart is empty!</h3>
      </section>
    );
  }

  return (
    <section
      className={`flex flex-column px-5 py-5 ${styles.cartItemsContainer}`}
    >
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} cartSend={cartSend} />
      ))}
    </section>
  );
};

export default CartItemsContainer;
