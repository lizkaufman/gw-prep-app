import React from "react";
import { ItemDetails } from "./interfaces";
import ItemCard from "./ItemCard";

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

// const ItemContainer: React.FC<ItemDetails[]> = () => {
const ItemContainer: React.FC = () => {
  return <ItemCard id={1} name={"test 1"} price={"£10"} />;
};

export default ItemContainer;
