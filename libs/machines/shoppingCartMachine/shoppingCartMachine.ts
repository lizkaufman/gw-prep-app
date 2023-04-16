import { createMachine, assign } from "xstate";
import { ItemDetails } from "../../../components/itemCards/interfaces";

/*
Arguments of createMachine:
Config object  -> What the machine does
Options object -> How the machine does it
*/

//https://stately.ai/docs/xstate/basics/options

export const shoppingCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADpglgOygAIBjAQwCcAXQgW1ONXzADoAZAeQEEARASQDkA4gH0AwpwBKAFQDEEdHhb4AbugDWLNFlwESFanQZM2XPkLGSpCFejKUcCgNoAGALovXiUJnSwc9hS8QAA9EAGYAdgAmZjCwgBYARgBOMOSIgA4wxLCMgDYAGhAAT0REiPjmKLzkxOcAVgyGtIz6+IBfdqKtbHwiMipaekZFEx4BEXFpGTBycnRyZkwAG1JKADMFmmYenX79IaNRjnHzKasbOwc8Dw8gnz8AvCDQhEiYuKTU9Kyc-KLSggMolmPFWjUIfEKolEvVOt0ML1dAMDMNjOdhCduABRbgyHGsbFSbHCXjEgCydyQIAe-muL0Q8TylShGSiETa9XqFSZEQBjPqMTyKTBeQizmcUW5HS6IF2fT0g0MIxYGKxuJkPG4pIpVO8vjpgWprzByWYzgiYtyGWSNVSDX5CHqyXqzHy4OyYWcTXicNl8uRB2V6MsmNMGux5IAClIAJoWaR6mkGp4MoFSqrCvJ5CVJZwtR3xVLMerObOJYGfZzxKJheFyxF7RWoo4sLUTHWRuQKJR4VQaZhazuUtz3FP043haKxBIpNKZT3-EqIZl5Gc1r3RMvJeIyhHaBUow4qwfcMwiMld2bzRYrNabcjbIeXkeeam01OTt7Tz5zn6LwplydfNzVaWtEihPJnQtesA32JU0VGAkiQ7F9u1GGwB2Q4lhyTD8J1AV53nXP8Fz+QDATCZ03TCHMJStWExVgxtDyDRCWGw1CKRmOYFiWVYNi2ZhsJJF88PHI1CKnD5Z2+MjcgoxBqgic1BXqCDVwaZ1mIPQMENbZhIxjWMO3OGRglgSg1hYUh1koWYAApSwAShkODm2PYwjLjUzLHEx4CJCRB0jCZgIltS0ywyBdLULJlzSovJqmzbkxRdTpZTwdAIDgIJ3KPYNFDHALJKChAAFpFIq11klqur6vqut-RYvSWxPLFfOkYrDWeL9YRBXcJRtDI2VrLlHWLG0LRSdIoJGlIdKReC2pDaQwx4XFus-KSECglTMkSKUEgiWEuUSQtS2YHN8iLSUUjqKJFqbAr2OYDFsQkCR2AkLbAtePawuBI6oVO9THSiEawolRphXybIkie1j9JPdtzBfX7SteDJKgiL06jybJhVhKJ4kdQVQvyCt8hJ3HaL3BtdOWzykOxQkpC4yMMd6naa3B6K3SiZISezfMSb9fclo8wqWG8kyzksLm0xhZwQTFKISfm3JDvqQtIlBdS6ktbkIhOxIMvaIA */
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
        DELETE_ITEM: {} as {
          data: ItemDetails[];
        },
        EMPTY_CART: {} as {
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
          id: "ADD_ITEM",
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
        invoke: {
          id: "DELETE_ITEM",
          src: "DELETE_ITEM",
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

      EMPTYING_CART: {
        invoke: {
          id: "EMPTY_CART",
          src: "EMPTY_CART",
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
        if (
          event.type === "done.invoke.ADD_ITEM" ||
          event.type === "done.invoke.DELETE_ITEM" ||
          event.type === "done.invoke.EMPTY_CART"
        ) {
          return {
            ...context,
            cartItems: event.data,
          };
        }
        return context;
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
              (cartItem) => cartItem.id === item.id
            );
            //Creates a reference to the existing item. Anything changed will be reflected within the cartItems array too.
            //Changing existingItem.quantity below will update it within the cartItems array.

            if (existingItem) {
              //The non-null operator assures TS that this won't ever be null... I had to brute-force with it because no matter what type guards I put, TS still errored and said it might be null!
              existingItem.quantity!++;
            } else {
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
      DELETE_ITEM: (context, event) => {
        return new Promise((resolve, reject) => {
          try {
            const cartItems = [...context.cartItems];
            const { itemId }: { itemId: number } = event;

            const existingItem = cartItems.find(
              (cartItem) => cartItem.id === itemId
            );

            if (existingItem?.quantity && existingItem.quantity > 1) {
              existingItem.quantity--;
            } else {
              const index = cartItems.findIndex(
                (cartItem) => cartItem.id === itemId
              );
              cartItems.splice(index, 1);
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
      EMPTY_CART: (context, event) => {
        return new Promise((resolve, reject) => {
          try {
            const emptyCart: ItemDetails[] = [];

            setTimeout(() => {
              // Simulate an API call
              resolve(emptyCart);
            }, 1000);
          } catch (error) {
            reject(error);
          }
        });
      },
    },
  }
);
