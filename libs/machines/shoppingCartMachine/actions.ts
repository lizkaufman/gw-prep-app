import { assign, ActionObject, BaseActionObject, AnyEventObject } from "xstate";
import {
  CartContext,
  AddItemEvent,
  DeleteItemEvent,
  EmptyCartEvent,
} from "./interfaces";

const cartActions = {
  ADD_ITEM: assign((context: CartContext, event: AddItemEvent) => {
    if (event.type === "ADD_ITEM") {
      const itemExistsInCart = context.cartItems.some(
        (item) => item.name === event.item.name
      );

      if (itemExistsInCart) {
        // If the item exists in the cart, update its quantity
        return {
          ...context,
          cartItems: context.cartItems.map((item) =>
            item.name === event.item.name
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      } else {
        // If the item doesn't exist in the cart, add it with a quantity of 1
        return {
          ...context,
          cartItems: [...context.cartItems, { ...event.item, quantity: 1 }],
        };
      }
    }
    return context;
  }) as ActionObject<CartContext, AddItemEvent, BaseActionObject>,
  DELETE_ITEM: assign((context: CartContext, event: DeleteItemEvent) => {
    if (event.type === "DELETE_ITEM") {
      const itemQuantity = context.cartItems.filter(
        (item: any) => item.id === event.itemId
      )[0].quantity;

      if (itemQuantity && itemQuantity > 1) {
        return {
          ...context,
          cartItems: context.cartItems.map((item) =>
            item.id === Number(event.itemId)
              ? { ...item, quantity: (item.quantity || 1) - 1 }
              : item
          ),
        };
      }

      return {
        ...context,
        cartItems: context.cartItems.filter(
          (item: any) => item.id !== event.itemId
        ),
      };
    }
    return context;
  }) as ActionObject<CartContext, DeleteItemEvent, BaseActionObject>,
  EMPTY_CART: assign((context: CartContext, event: EmptyCartEvent) => {
    if (event.type === "EMPTY_CART") {
      return {
        ...context,
        cartItems: [],
      };
    }
    return context;
  }) as ActionObject<CartContext, AnyEventObject, BaseActionObject>,
};

export default cartActions;
