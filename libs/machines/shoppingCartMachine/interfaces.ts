import { ItemDetails } from "../../../components/itemCards/interfaces";
import { AnyEventObject } from "xstate";

export interface CartContext {
  cartItems: ItemDetails[];
  errorMessage: string | undefined;
}

export interface AddItemEvent extends AnyEventObject {
  type: "ADD_ITEM";
  item: ItemDetails;
}

export interface DeleteItemEvent extends AnyEventObject {
  type: "DELETE_ITEM";
  itemId: string;
}

export interface EmptyCartEvent extends AnyEventObject {
  type: "EMPTY_CART";
}

export interface AssignCartEvent extends AnyEventObject {
  data: ItemDetails[];
}

export interface AssignErrorEvent extends AnyEventObject {
  data: Error;
}
