import React from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { ItemDetails } from "@/components/itemCards/interfaces";
import styles from "../styles/checkoutPage.module.css";

const CheckoutPage = ({
  cartState,
  cartSend,
}: {
  cartState: any;
  cartSend: any;
}) => {
  const boughtItems = cartState.context.cartItems;
  const totalPrice = boughtItems.reduce((acc: number, cur: ItemDetails) => {
    return acc + Number(cur.price.slice(1));
  }, 0);

  return (
    <main
      className={`px-5 py-5 flex flex-column align-center ${styles.checkoutPage}`}
    >
      <h3 className={`${styles.checkoutPageHeader}`}>
        Thank you for your purchase!
      </h3>
      <p>Items purchased:</p>
      <ul className={`${styles.itemsPurchasedList}`}>
        {boughtItems.map((item: ItemDetails) => (
          <li key={item.id}>
            {item.quantity} {item.name}
          </li>
        ))}
      </ul>
      <p className={`${styles.totalDisplay}`}>
        Total paid: £{totalPrice.toFixed(2)}
      </p>
      <Link href="/">
        <Button
          buttonText="Shop again"
          handleClick={() => {
            cartSend({ type: "EMPTY_CART" });
          }}
        />
      </Link>
    </main>
  );
};

export default CheckoutPage;
