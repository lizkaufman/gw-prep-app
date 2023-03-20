import React from "react";
import Image, { ImageProps } from "next/image";
import { ItemDetails } from "./interfaces";

import placeholderImage from "../../images/placeholder.jpeg";

const ItemCard: React.FC<ItemDetails> = ({ id, name, price, image }) => {
  return (
    <article>
      <Image src={placeholderImage} alt="placeholder" />
      <h3>{name}</h3>
      <p>{price}</p>
      <button>Add to cart</button>
    </article>
  );
};

export default ItemCard;
