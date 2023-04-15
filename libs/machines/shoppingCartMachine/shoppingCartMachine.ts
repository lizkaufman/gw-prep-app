import { createMachine, assign, AnyEventObject } from "xstate";
import { ItemDetails } from "../../../components/itemCards/interfaces";
import cartActions from "./actions";

const { ADD_ITEM, DELETE_ITEM, EMPTY_CART } = cartActions;

export const shoppingCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADpglgOygAIBjAQwCcAXQgW1ONXzADoAZdUifIsqgYgjo8LfADd0AaxZosuAiQrU6DJmw5d5vSgjHoylHEIDaABgC6ps4lCZ0sHAaHWQAD0QBWAIwAWZgDYATndvAHZ3AGYADnCAJk93SIAaEABPRE8AmOZMgMiQk3c-P3CvXIBfMuSZbG4FKlp6RmE1TlqtPjBycnRyZkwAG1JKADMemmZquR5FBpVm9lbNRR08cX1DPEtLZ1t7RzxnNwRwz3DmDJNPEPDAyMiggOS0hEjPZm9I729AmJNImLCAIqVQwNSW9WUTRYAGEZv11JA+AARMD9MCUMCEBxgGjbJAgXYODaHRDhEIBbI+bwZdzuExfEpPRDUikxGI3PzUvwheLfdzAkCTNozSGqWH1eGcREAQQgECxGNx5h2diJTnxR3CARC70KNx5JzpuSZCBi3OYMUiJjJlvclringFQvBSkaYrhCIgfAAojRMJQUnVKHibKr9iSEDydZEIuSea9PCYQt4TSUKZzPH5ItyQiE-PFwk7QVMg7MocwUWiDPJsTQ+C5YJQhixSMMMeQABR0gCUfGd0whbualfRtVrIYJYeJGtJp3OAUu11u93cj1SpJ5zDCwXc+VX3gSeaLsmFg7mLFlGiItfrjebzFb7a7Jl7-dLoual7HionhPDM+OOcLiuG5chXNdnhOHVt08TMFxMJM7j8Y8wQHV1z2YX1-RSU9KFvJsMQfNtOmfV9i1wstVCwgNcN-Kd1VAI5riycIvkuS14lyWlU08LIQNCAIigCAIMhKCpKhAPB0AgOBnDfLRKOEFU9mnRjEAAWj8E11PcbJhOEvJim8ExBJ8FCSwUj8WAWK8g2UtUDgA2Do28AJWNpPx2PyCDEDc7JvEtL4-CNQogQk+SRSHGEPSlCB7P-NSEGCPx3h5ALuTNbNYh4lLk28cI-jzViPjNcyKKs5hxWoSVbM6bpyHi1TXEQIrmH+JM6QyXifCSdcEGc95wiifKRuKTN+XC8iXUUlgR2ra9FUahjmoQALU2Kc5gvzOkYzCE4yumiqvxrRb8T-Jqjn+c58h8WCYm1Ew4h801d38NyrW1KNci+A60JmzC-Rol0lscxLsxMecgiidkFw+FM+oKs4EhuMlAj8OIbnEsogA */
    id: "Shopping cart machine",
    predictableActionArguments: true,
    //tsTypes line autogenerates the typegen file to make sure all types line up correctly
    tsTypes: {} as import("./shoppingCartMachine.typegen").Typegen0,
    schema: {
      services: {
        LOAD_CART: {} as {
          data: ItemDetails[];
        },
      },
    },
    context: {
      //key-value store for anything needing to be stored in machine
      cartItems: [] as ItemDetails[],
      errorMessage: undefined as string | undefined,
    },
    initial: "LOADING_CART",
    states: {
      LOADING_CART: {
        invoke: {
          //invoke a service that's passed in where useMachine is called
          //service is async and returns a promise
          src: "LOAD_CART",
          onDone: [
            {
              target: "CART_LOADED",
              actions: "ASSIGN_CART_TO_CONTEXT",
            },
          ],
          onError: [
            {
              target: "CART_LOADING_ERROR",
              actions: "ASSIGN_ERROR_TO_CONTEXT",
            },
          ],
        },
      },

      CART_LOADED: {
        on: {
          DELETE_ITEM: "DELETING_ITEM",
          ADD_ITEM: "ADDING_ITEM",
          EMPTY_CART: "EMPTYING_CART",
        },
      },

      CART_LOADING_ERROR: {},

      DELETING_ITEM: {
        //entry - thing happens, and then it pings back to cart loaded after that artificial 50ms...
        //whether that entry action fails or succeeds, we don't know!
        //and then the after has to force it back to the cart loaded state
        entry: "DELETE_ITEM",
        after: {
          50: "CART_LOADED",
        },
      },

      ADDING_ITEM: {
        entry: "ADD_ITEM",
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
    actions: {
      ASSIGN_CART_TO_CONTEXT: assign((context, event) => {
        //assign is one of Xstate's built-in actions to add things to context
        //this function tells Xstate what to do to assign
        //in assign callback fn, always need to return a partial of the new context
        return {
          //event.data holds what's returned when the load cart service is invoked
          cartItems: event.data,
        };
      }),
      ASSIGN_ERROR_TO_CONTEXT: assign((context, event) => {
        return {
          errorMessage: (event.data as Error).message,
        };
      }),
      ADD_ITEM,
      DELETE_ITEM,
      EMPTY_CART,
    },
    services: {
      LOAD_CART: (context, event) => {
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
