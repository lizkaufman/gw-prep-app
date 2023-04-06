import React from "react";
import { ItemDetails } from "./interfaces";
import ItemCard from "./ItemCard";
import styles from "../../styles/itemCards.module.css";
import itemData from "@/app/libs/itemData";

const exampleItemList: ItemDetails[] = [
  {
    id: 1,
    name: "test 1",
    price: "£10",
  },
  {
    id: 2,
    name: "test 2",
    price: "£20",
  },
  {
    id: 3,
    name: "test 3",
    price: "£30",
  },
];

const ItemContainer: React.FC = () => {
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
