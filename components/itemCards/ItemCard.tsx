"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Button from "../Button";
import { ItemDetails } from "./interfaces";
import styles from "../../styles/itemCards.module.css";

const ItemCard: React.FC<ItemDetails> = ({
  id,
  name,
  price,
  image,
  cartSend,
}) => {
  const handleAddItem = useCallback(() => {
    //memoized here to avoid creating new functions in each render (which can cause unnecessary re-renders and issues with stale closures)
    console.log(`cartSend for item ${id}`);
    cartSend({
      type: "Add item",
      item: { id, name, price, image },
      timestamp: Date.now(),
    });
  }, [cartSend, id, name, price, image]);

  return (
    <article
      className={`flex flex-column align-center justify-space-around mx-3 my-3 py-5 px-4 ${styles.itemCard}`}
    >
      <Image
        src={image}
        alt={`product image for ${name}`}
        className={`${styles.productImage}`}
      />
      <h3 className={`${styles.itemName}`}>{name}</h3>
      <p className={`${styles.itemPrice}`}>{price}</p>
      <Button buttonText="Add to cart" handleClick={handleAddItem} />
    </article>
  );
};

export default ItemCard;
