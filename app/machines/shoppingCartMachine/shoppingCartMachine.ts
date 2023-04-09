import { createMachine, assign } from "xstate";
import { ItemDetails } from "../../components/itemCards/interfaces";
import { AddItemEvent, DeleteItemEvent } from "./interfaces";

export const shoppingCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADpglgOygAIBjAQwCcAXQgW1ONXzADoAZdUifIsqgYgjo8LfADd0AaxZosuAiQrU6DJmw5d5vSgjHoylHEIDaABgC6ps4lCZ0sHAaHWQAD0QAmACwB2ZgGYANk8AVm8ADi9vEyi-ABoQAE9EPxN3ZgBOMLCTYICARgiw-L8AXxL4mWxuBSpaekZhNU5qrT4wcnJ0cmZMABtSSgAzLppmSrkeRTqVRvZmzUUdPHF9QzxLS2dbe0c8ZzcESP8g0IifaJM4xI8TdOYs729MlPS-d3zPMoqMKoXa5QaLAAwlNeupIHwACJgXpgShgQgOMA0TZIEDbBxrfaIIJpW55PKeaLnGLxJIIPwpZhRMJvTyeN5+bwpYJfEDjFpTAGqEG1MGcCEAQQgEER8JR5i2dkxTjRB1xzHxhOJUVJ10O7mCzHc72CwSKYWCKXczLZHL+SnqqmhsIM8iRND4qJs0t22IQeRyfgyAXyms8WXcYTy7jJyTe2pMYXS3gDfgiuTCn3K7J+ExqlpmLGFGiIDqdkrRGLdcsQnqNPr9wQDhRDYY1AWpJvctyVRWC7jNac5-ytjV51AArpgIAMIXNRVpnejXVjSx6vZWQ9XA8HQ+rg8wA7lvPqCd4AruwmUU3h0BA4M5zZNe1mpTs56ADgBaAL119d2Q9zOApq5jP3jKezzp467kiaYTMIeARFFGtxvAEnYpteGbTL+A6EPyF4QIBJZPogAaNukISxnG7h+DuwT1nS1KvH4xFRmEsbBHkn6-DeP48qC6jVO0nTkLhj6uARwR3N4EGiZ4MYXFc4F+HkUGvHkgTuHkHa3OkARsemWhodaMJwtUDqCbK+EIOEvjiekalBMRypvuqKSWSG5GatG4l5N42nfnpjQ5kZ4omcBZnZFqbypDGXghp66T1i2aTkSYni+kmurKV5yHdhavnAlMw6jvCOFFrOpnCR6BRasySUhEUBR5EEcVBtqur6jBRqpKaJ5AA */
    id: "Shopping cart machine",
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
        always: "Cart updated",
      },

      "Adding item": {
        entry: "Add item to cart",
        always: "Cart updated",
      },

      "Cart updated": {
        on: {
          "Load cart": "Loading cart",
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
        if (event.type === "Add item") {
          return {
            cartItems: [...context.cartItems, event.item],
          };
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
