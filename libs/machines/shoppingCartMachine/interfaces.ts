import { ItemDetails } from "../../../components/itemCards/interfaces";
import { AnyEventObject } from "xstate";

export interface AddItemEvent extends AnyEventObject {
  type: "Add item";
  item: ItemDetails;
}

export interface DeleteItemEvent extends AnyEventObject {
  type: "Delete item";
  itemId: string;
}
