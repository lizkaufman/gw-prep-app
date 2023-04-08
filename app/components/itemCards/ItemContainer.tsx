import React from "react";

import { ItemDetails } from "./interfaces";
import styles from "../../styles/itemCards.module.css";
import itemData from "@/app/libs/itemData";

import ItemCard from "./ItemCard";

import { useMachine } from "@xstate/react";
import { shoppingCartMachine } from "@/app/machines/shoppingCartMachine";

const ItemContainer: React.FC = () => {
  const [state, send] = useMachine(shoppingCartMachine, {
    services: {
      "Load cart": async () => {
        return itemData;
      },
    },
  });

  return (
    <section className={`py-5 px-5 mx-5 ${styles.itemContainer}`}>
      {state.context.cartItems.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
      {itemData.map((item: ItemDetails) => {
        // {exampleItemList.map((item: ItemDetails) => {
        return (
          <ItemCard
            id={item.id}
            name={item.name}
            price={item.price}
            key={item.id}
            image={item.image}
          />
        );
      })}
    </section>
  );
};

export default ItemContainer;
