"use client";
import React from "react";
import Image, { ImageProps } from "next/image";
import Button from "../Button";
import { ItemDetails } from "./interfaces";
import styles from "../../styles/itemCards.module.css";

const ItemCard: React.FC<ItemDetails> = ({
  id,
  name,
  price,
  image,
  send,
  state,
}) => {
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
      <Button
        buttonText="Add to cart"
        handleClick={() => console.log(`Add to cart for ${name} pressed`)}
      />
    </article>
  );
};

export default ItemCard;
