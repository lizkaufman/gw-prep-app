"use client";
import React from "react";
import Image, { ImageProps } from "next/image";
import Button from "../Button";
import { ItemDetails } from "./interfaces";
import styles from "../../styles/itemCards.module.css";

import placeholderImage from "../../images/placeholder.jpeg";

const ItemCard: React.FC<ItemDetails> = ({ id, name, price, image }) => {
  return (
    <article
      className={`flex flex-column align-start my-3 py-5 px-5 ${styles.itemCard}`}
    >
      <Image
        src={placeholderImage}
        alt={`product image for ${name}`}
        className={`${styles.productImage}`}
      />
      <h3>{name}</h3>
      <p>{price}</p>
      <Button
        buttonText="Add to cart"
        handleClick={() => console.log(`Add to cart for ${name} pressed`)}
      />
    </article>
  );
};

export default ItemCard;
