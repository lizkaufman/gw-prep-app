import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import CartItemsContainer from "@/components/cartItems/CartItemsContainer";
import styles from "../styles/cartItems.module.css";
import { ItemDetails } from "@/components/itemCards/interfaces";

const ViewCart = ({
  cartState,
  cartSend,
}: {
  cartState: any;
  cartSend: any;
}) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartItems = cartState.context.cartItems;
    const currentTotal = cartItems.reduce((acc: number, cur: ItemDetails) => {
      return acc + Number(cur.price.slice(1));
    }, 0);
    setTotal(currentTotal.toFixed(2));
  }, [cartState.context.cartItems]);

  return (
    <main
      className={`flex flex-column  justify-space-around py-5 ${styles.cartPage}`}
    >
      <h1>Your Cart</h1>
      <CartItemsContainer
        cartItems={cartState.context.cartItems}
        cartSend={cartSend}
      />
      {total > 0 && (
        <h3 className={` ${styles.totalDisplay}`}>Total: £{total}</h3>
      )}
      <div
        className={`flex justify-space-around ${styles.cartButtonsContainer}`}
      >
        <Link href="/">
          <Button buttonText="Keep shopping" handleClick={() => {}} />
        </Link>
        {total > 0 && (
          <Link href="/checkout">
            <Button handleClick={() => {}} buttonText="Check out" />
          </Link>
        )}
      </div>
    </main>
  );
};

export default ViewCart;
