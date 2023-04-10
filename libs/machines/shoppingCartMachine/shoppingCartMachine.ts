import { createMachine, assign } from "xstate";
import { ItemDetails } from "../../../components/itemCards/interfaces";
import { AddItemEvent, DeleteItemEvent } from "./interfaces";

export const shoppingCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADpglgOygAIBjAQwCcAXQgW1ONXzADoAZdUifIsqgYgjo8LfADd0AaxZosuAiQrU6DJmw5d5vSgjHoylHEIDaABgC6ps4lCZ0sHAaHWQAD0QAmAOwBmZiYCsACwAbMFB-ibegQCM3gA0IACeiNGegcz+ABz+AJyhXibB0dH+-gC+ZQky2NwKVLT0jMJqnLVafGDk5OjkzJgANqSUAGY9NMzVcjyKDSrN7K2aijp44vqGeJaWzrb2jnjObghevgEhYYERUbEJyQiZ0cyB2cGZ7pnBJoVZ7hVVGDUlvVlE0WABhGb9dSQPgAETA-TAlDAhAcYBo2yQIF2Dg2h0QoU8zE8D28n0yOSyJhy0VuHmCRNewXcgTyDxKPkCfxAkzaMxBqgh9ShnBhAEEIBBUciMeYdnZcU4sUdvP4id5ojkTO5vJkTJ5PAzPHTjgzmEyWWzimqotzeUClI1VBKNEQ0TQ+C5YJQhixSMNkeQABQRACUfHt02BTuaLtq7sxNgV+3xxx8fiCoXCkRi8SSiA1mWYqSygUChRyaS53Lw6AgcGckbqjrmYHlezxysQAFpgibe3aAVNm7NQS1Xc324qDl2EAbzVrqWE8tEKZcTTl0iYYhS0u4WZ5oq9B7I+dHW8whdQRfWIFOU7PWekci-PO5V5kNTk3ib3K9ix8lqvNanInoCUYtmOV6EDetSdN05D3p2oBHM8-hPKuJjRO436ZJ4ORRCa0SRMwOHESch7bv4qpgcOWijqo8KIgY8jukhSooYgpIYZuJLuF8Xibr+ZYLlh-hFEUJRYcEtFnpBzqSvGMrsTOnEIIE7i-lkxaRCSwTeC+7hXNWFRAA */
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
          return {
            ...context,
            cartItems: context.cartItems.filter(
              (item: any) => item.id !== event.itemId
            ),
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
