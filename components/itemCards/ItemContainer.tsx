import React from "react";

import { ItemDetails } from "./interfaces";
import styles from "../../styles/itemCards.module.css";
import itemData from "@/libs/data/itemData";

import ItemCard from "./ItemCard";

import { useMachine } from "@xstate/react";
import { shoppingCartMachine } from "@/libs/machines/shoppingCartMachine/shoppingCartMachine";

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
