import { createMachine, assign } from "xstate";
import { ItemDetails } from "../../../components/itemCards/interfaces";
import { AddItemEvent, DeleteItemEvent } from "./interfaces";

export const shoppingCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADpglgOygAIBjAQwCcAXQgW1ONXzADoAZdUifIsqgYgjo8LfADd0AaxZosuAiQrU6DJmw5d5vSgjHoylHEIDaABgC6ps4lCZ0sHAaHWQAD0QAmAOwBmZiYCsACwAbJ6B7gAcYSZhngA0IACeiACMYcz+Ef4AnN4RKdnB3jERgQC+ZQky2NwKVLT0jMJqnLVafGDk5OjkzJgANqSUAGY9NMzVcjyKDSrN7K2aijp44vqGeJaWzrb2jnjObghevgEhYZHRsQnJCPnMgVmh-p7+OSYxnhVVGDVL9comiwAMIzfrqSB8AAiYH6YEoYEIDjANG2SBAuwcG0OiGCoWYnnyaUC-ncJm8-gKNw8+OCEWCZJMRVCKUC2XKlRAkzaM0BqlB9XBnEhAEEIBAkQjUeYdnYsU50UcKZ5mN4UhFsllNWrsuz4kkaSq6QyPszPKzst8ub8pnUlI1VGKNERkTQ+AAlWHqO1omxy-Y4hDeTzZZjZc05c1FbzB-zUoMRCLMOla7wsxM+YIVTl4dAQODObn-e1zMCyvbYxWIAC0wXjtb8Hw+lPVwfybytRemAId83UPKo5flByrCE8RuyH2yKXVJ3H+tu7L8gXViZSJhSpJ8EU7NoHJaBzAF1CF+YgQ4Do7ZgTDupNgR8K+yXnj7jpzHVJqZafN193sn3WZD2PQhT1qTpunIC9K1AI5Hn8B40mfSJ2WCUkinjddfHcacPnpHIZ08GJ-z+bsD1UGE4QMeRXWghVYMQfJfCfWc101N9X0CG9gknEwohSbxnyjEjbS0IDHXFWpaPRTFLwYhBwlfTIP3JTx3C49cwiybMyiAA */
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
      },

      "Adding item": {
        entry: "Add item to cart",

        on: {
          "Reload cart": "Cart loaded",
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
          const newContext: any = {
            ...context,
            cartItems: [...context.cartItems, event.item],
          };
          console.log({ newContext });
          return newContext;
        }
        return context;
      }),
      "Remove item from cart": assign((context, event: DeleteItemEvent) => {
        if (event.type === "Delete item") {
          return {
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
