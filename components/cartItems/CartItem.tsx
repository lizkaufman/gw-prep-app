import React, { useCallback } from "react";
import { ItemDetails } from "../itemCards/interfaces";
import Button from "../Button";
import styles from "../../styles/cartItems.module.css";

interface CartItemProps {
  item: ItemDetails;
  cartSend: any;
}

const CartItem: React.FC<CartItemProps> = ({ item, cartSend }) => {
  const handleDeleteItem = useCallback(() => {
    cartSend({
      type: "DELETE_ITEM",
      itemId: item.id,
    });
  }, [cartSend, item.id]);

  return (
    <article
      className={`flex flex-row align-center justify-space-between  ${styles.cartItem}`}
    >
      <p>{item.name}</p>
      <div
        className={`flex flex-row justify-space-between align-center ${styles.itemInfo}`}
      >
        {item.quantity && <p>x{item.quantity}</p>}
        <p>{item.price}</p>
        <Button buttonText="x" handleClick={handleDeleteItem} />
      </div>
    </article>
  );
};

export default CartItem;
