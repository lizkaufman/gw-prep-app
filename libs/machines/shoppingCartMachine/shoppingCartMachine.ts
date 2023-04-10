import { createMachine, assign, AnyEventObject } from "xstate";
import { ItemDetails } from "../../../components/itemCards/interfaces";
import { AddItemEvent, DeleteItemEvent, EmptyCartEvent } from "./interfaces";

export const shoppingCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADpglgOygAIBjAQwCcAXQgW1ONXzADoAZdUifIsqgYgjo8LfADd0AaxZosuAiQrU6DJmw5d5vSgjHoylHEIDaABgC6ps4lCZ0sHAaHWQAD0QBmAEzvmATgDs-gCsAIwhACwAbCEm-pG+ADQgAJ6IIf4AHMwh3uERJr4ZeQC+xUky2NwKVLT0jMJqnFVafGDk5OjkzJgANqSUAGadNMwVcjyKtSoN7E2aijp44vqGeJaWzrb2jnjObghePgHBYVExcYkpiBkhzOEZQZGRmZ4m7oUZ-qXlGJXzNcp6iwAMKTHrqSB8AAiYB6YEoYEIDjANA2SBAWwcqz2Hl8Pmih38IXc4XcISCGSSqQQpM8zFi7xM4X8ngiNze3xAY2ak0BqlBNXBnEhAEEIBAkQjUeZNnYsU50fs8rdfOkyRFfEFfNrvFTEJ5-OFmHEwv4TGEDWavmUub9xtUlHV+WCIRA+ABRGiYSjJB1omxynY4hCGo4UyLuILhEwZSLhIJ6g5m7JM+7BXyeDLuEyeIKc7n-R3TFgwuEGeTImh8FywSj9FikAYI8gACiCJgAlHwCxMAU6GqX4VVK-6MYHsYqPN4-IFQhForF4on3Fn6e44sF7jlAhH83aeX3i8wxRoiJXq7X68xG82253u-vC1MgcfxcOpaPMUHJwdp8c52ci6XNSXiRH4ni+HGnwrjcGZ7rIB5Fi+nreskiEXnWCLXk2bR3l2PYOs+qgoT6iGfuOCqgPs6b0hkEH+OuDHRniy6svSkR0XkZLRuSTKlDaeDoBAcDOARWhEcIsrbBOVGIAAtJEiYKfSJiqWp6lqdaPwIU+fIzOoiFSfKuw-jktwhDcWbPJGsYFP4ia+EajyBOEmpxu2mrhPBfy9khzqCq6RnfrJCCPGBqnrhkhSaiShqsUEzCxpGrmRG8NykpE3n2uJekgi6cxEG0HTkEFMmuIgQRRswoTuF4EThBB4SuYmMRGp4rxkrGRTaiEmpZYhEklrCQ4VlKpWUeVNKeMuDF+A8TxBOuZJzv1un9iwJ7vii40mSFq54q5WbMlFTJkomnhxsawSZhEQSsiE8Srb5g3MCRaGFjtwZRbc8bMpEi25n97jLjk9IPe12oZFDTUZPxxRAA */
    id: "Shopping cart machine",
    predictableActionArguments: true,
    //tsTypes line autogenerates the typegen file to make sure all types line up correctly
    tsTypes: {} as import("./shoppingCartMachine.typegen").Typegen0,
    schema: {
      services: {
        "Load cart": {} as {
          data: ItemDetails[];
        },
      },
    },
    context: {
      //key-value store for anything needing to be stored in machine
      cartItems: [] as ItemDetails[],
      errorMessage: undefined as string | undefined,
    },
    initial: "Loading cart",
    states: {
      "Loading cart": {
        invoke: {
          //invoke a service that's passed in where useMachine is called
          //service is async and returns a promise
          src: "Load cart",
          onDone: [
            {
              target: "Cart loaded",
              actions: "Assign cart to context",
            },
          ],
          onError: [
            {
              target: "Cart loading error",
              actions: "Assign error to context",
            },
          ],
        },
      },

      "Cart loaded": {
        on: {
          "Delete item": "Deleting item",
          "Add item": "Adding item",
          "Empty cart": "Emptying cart",
        },
      },

      "Cart loading error": {},

      "Deleting item": {
        entry: "Remove item from cart",
        after: {
          50: "Cart loaded",
        },
      },

      "Adding item": {
        entry: "Add item to cart",
        after: {
          50: "Cart loaded",
        },
        //Having the after property adds a delay of 50ms before transitioning back to cart loaded. This means that you can add multiple items to the cart and give it time to transition back to cart loaded. (This solves the issue of only being able to add one item to the cart.)
      },

      "Emptying cart": {
        entry: "Empty cart",
        after: {
          50: "Cart loaded",
        },
      },
    },
  },
  {
    actions: {
      //actions are ways to do things that are synchronous or take 0 time
      //vs services which are async!
      "Assign cart to context": assign((context, event) => {
        //assign is one of Xstate's built-in actions to add things to context
        //this function tells Xstate what to do to assign
        //in assign callback fn, always need to return a partial of the new context
        return {
          //event.data holds what's returned when the load cart service is invoked
          cartItems: event.data,
        };
      }),

      "Assign error to context": assign((context, event) => {
        return {
          errorMessage: (event.data as Error).message,
        };
      }),

      "Add item to cart": assign((context, event: AddItemEvent) => {
        console.log("add item action in machine");
        if (event.type === "Add item") {
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
      }),

      "Remove item from cart": assign((context, event: DeleteItemEvent) => {
        if (event.type === "Delete item") {
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
      }),

      "Empty cart": assign((context, event: EmptyCartEvent) => {
        if (event.type === "Empty cart") {
          return {
            ...context,
            cartItems: [],
          };
        }
        return context;
      }),
    },
    services: {
      "Load cart": (context, event) => {
        // Here, you can simulate an async function that loads cart items.
        // Replace this with a call to an actual API when you're ready.
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(context.cartItems);
          }, 1000);
        });
      },
    },
  }
);
