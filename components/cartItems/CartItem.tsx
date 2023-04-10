import React from "react";
import { ItemDetails } from "../itemCards/interfaces";
import Button from "../Button";
import styles from "../../styles/cartItems.module.css";

interface CartItemProps {
  item: ItemDetails;
  cartSend: any;
}

const CartItem: React.FC<CartItemProps> = ({ item, cartSend }) => {
  return (
    <article
      className={`flex flex-row align-center justify-space-between  ${styles.cartItem}`}
    >
      <p>{item.name}</p>
      <div
        className={`flex flex-row justify-space-between align-center ${styles.itemInfo}`}
      >
        <p>{item.price}</p>
        <Button
          buttonText="x"
          handleClick={() => {
            console.log(`Delete button pressed for ${item.name}`);
          }}
        />
      </div>
    </article>
  );
};

export default CartItem;
