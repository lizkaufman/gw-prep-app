import { Content } from "next/font/google";
import { createMachine, assign } from "xstate";
import { ItemDetails } from "../../../components/itemCards/interfaces";
import cartActions from "./cartActions";

const { DELETE_ITEM, EMPTY_CART } = cartActions;

/*
Arguments of createMachine:
Config object  -> What the machine does
Options object -> How the machine does it
*/

//https://stately.ai/docs/xstate/basics/options

export const shoppingCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADpglgOygAIBjAQwCcAXQgW1ONXzADoAZdUifIsqgYgjo8LfADd0AaxZosuAiQrU6DJmw5d5vSgjHoylHEIDaABgC6ps4lCZ0sHAaHWQAD0QBWAIwAWZgDYATndvAHZ3AGYADnCAJk93SIAaEABPRE8AmOZMgMiQk3c-P3CvXIBfMuSZbG4FKlp6RmE1TlqtPjBycnRyZkwAG1JKADMemmZquR5FBpVm9lbNRR08cX1DPEtLZ1t7RzxnNwRwz3DmDJNPEPDAyMiggOS0hEjPZm9I729AmJNImLCAIqVQwNSW9WUTRYAGEZv11JA+AARMD9MCUMCEBxgGjbJAgXYODaHRDhEIBbI+bwZdzuExfEpPRDUikxGI3PzUvwheLfdzAkCTNozSGqWH1eGcREAQQgECxGNx5h2diJTnxR3CARC70KNx5JzpuSZCBi3OYMUiJjJlvclringFQvBSkaYrhCIgfAAojRMJQUnVKHibKr9iSEDydZEIuSea9PCYQt4TSUKZzPH5ItyQiE-PFwk7QVMg7MocwUWiDPJsTQ+C5YJQhixSMMMeQABR0gCUfGd0whbualfRtVrIYJYeJGtJp3OAUu11u93cj1SpJ5zDCwXc+VX3gSeaLsmFg7mLFlGiItfrjebzFb7a7Jl7-dLoual7HionhPDM+OOcLiuG5chXNdnhOHVt08TMFxMJM7j8Y8wQHV1z2YX1-RSU9KFvJsMQfNtOmfV9i1wstVCwgNcN-Kd1VAI5riycIvkuS14lyWlU08LIQNCAIigCAIMhKCpKhAPB0AgOBnDfLRKOEFU9mnRjEAAWj8E11PcbJhOEvJim8ExBJ8FCSwUj8WAWK8g2UtUDgA2Do28AJWNpPx2PyCDEDc7JvEtL4-CNQogQk+SRSHGEPSlCB7P-NSEGCPx3h5ALuTNbNYh4lLk28cI-jzViPjNcyKKs5hxWoSVbM6bpyHi1TXEQIrmH+JM6QyXifCSdcEGc95wiifKRuKTN+XC8iXUUlgR2ra9FUahjmoQALU2Kc5gvzOkYzCE4yumiqvxrRb8T-Jqjn+c58h8WCYm1Ew4h801d38NyrW1KNci+A60JmzC-Rol0lscxLsxMecgiidkFw+FM+oKs4EhuMlAj8OIbnEsogA */
    id: "Shopping cart machine",
    predictableActionArguments: true,
    tsTypes: {} as import("./shoppingCartMachine.typegen").Typegen0,
    schema: {
      services: {
        LOAD_CART: {} as {
          data: ItemDetails[];
        },
        ADD_ITEM: {} as {
          data: ItemDetails[];
        },
      },
    },
    context: {
      cartItems: [] as ItemDetails[],
      errorMessage: undefined as string | undefined,
    },
    initial: "LOADING_CART",
    states: {
      LOADING_CART: {
        invoke: {
          src: "LOAD_CART",
          onDone: [
            {
              target: "CART_LOADED",
              actions: "ASSIGN_CART_TO_CONTEXT",
            },
          ],
          onError: [
            {
              target: "CART_ERROR",
              actions: "ASSIGN_ERROR_TO_CONTEXT",
            },
          ],
        },
      },

      CART_LOADED: {
        on: {
          DELETE_ITEM: "DELETING_ITEM",
          ADD_ITEM: "ADDING_ITEM",
          EMPTY_CART: {
            cond: "cartHasItems",
            target: "EMPTYING_CART",
          },
        },
      },

      CART_ERROR: {},

      ADDING_ITEM: {
        invoke: {
          //upon entering the state, this service will be invoked
          id: "addItemToCart",
          //id is optional identifier
          src: "ADD_ITEM",
          //src is the reference to the actual service in the options object below
          onDone: {
            target: "CART_LOADED",
            actions: "UPDATE_CART",
          },
          onError: {
            target: "CART_ERROR",
            actions: "ASSIGN_ERROR_TO_CONTEXT",
          },
        },
      },

      DELETING_ITEM: {
        entry: "DELETE_ITEM",
        after: {
          50: "CART_LOADED",
        },
      },

      EMPTYING_CART: {
        entry: "EMPTY_CART",
        after: {
          50: "CART_LOADED",
        },
      },
    },
  },
  {
    guards: {
      //https://stately.ai/docs/xstate/basics/options#guards
      cartHasItems: (context) => context.cartItems.length > 0,
    },
    actions: {
      //https://stately.ai/docs/xstate/actions/
      ASSIGN_CART_TO_CONTEXT: assign((context, event) => {
        return {
          cartItems: event.data,
        };
      }),
      ASSIGN_ERROR_TO_CONTEXT: assign((context, event) => {
        console.error(event.data);
        return {
          errorMessage: (event.data as Error).message,
        };
      }),
      UPDATE_CART: assign((context, event) => {
        return {
          cartItems: event.data,
        };
      }),
    },
    services: {
      LOAD_CART: (context, event) => {
        //Simulating async fn that loads cart items
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(context.cartItems);
          }, 1000);
        });
      },
      ADD_ITEM: (context, event) => {
        return new Promise((resolve, reject) => {
          try {
            const { item }: { item: ItemDetails } = event;
            const cartItems = [...context.cartItems];

            const existingItem = cartItems.find(
              (cartItem) => cartItem.name === item.name
            );
            console.log({ item, existingItem });
            //Creates a reference to the existing item. Anything changed will be reflected within the cartItems array too.
            //Changing existingItem.quantity below will update it within the cartItems array.

            if (existingItem) {
              console.log("adding existing item");
              //The non-null operator assures TS that this won't ever be null... I had to brute-force with it because no matter what type guards I put, TS still errored and said it might be null!
              existingItem.quantity!++;
            } else {
              console.log("adding new item");
              // Add the item to the cart with a quantity of 1
              cartItems.push({ ...item, quantity: 1 });
            }

            setTimeout(() => {
              // Simulate an API call
              resolve(cartItems);
            }, 1000);
          } catch (error) {
            reject(error);
          }
        });
      },
    },
  }
);
