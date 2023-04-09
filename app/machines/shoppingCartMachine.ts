import { createMachine, assign } from "xstate";
import { ItemDetails } from "../components/itemCards/interfaces";

export const shoppingCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADpglgOygAIBjAQwCcAXQgW1ONXzADoAZdUifIsqgYgjo8LfADd0AaxZosuAiQrU6DJmw5d5vSgjHoylHEIDaABgC6ps4lCZ0sHAaHWQAD0QAmAMwAWZgHZ3E28ANk8-AA5Pdz8ARk9ggBoQAE8Pb09mdwBOdwBWLPDvb3dwmMK-AF8KpJlsbgUqWnpGYTVOeq0+MHJydHJmTAAbUkoAMz6aZlq5HkUmlVb2ds1FHTxxfUM8S0tnW3tHPGc3BC93Zk8w8PdvGNyTExiizyTUhFLmbwjnp9y-XJiWVyVRqGDqK0ayhaLAAwnNBupIHwAIIQCCESjoBqUXZIED7BxbY6IYLRZiPEwAm5Zbw0ymvRCA4IXS4FTxA9zBPwFYJVaogPDoCBwZzTDpzKFMPZ2QlOPEnAC0iRSiCVIJAYohSmaqiWGlmVGlByJ8sQxQZCBpzDKhXCwWC91uwWu6s1Bu1C1h8MRECNsqOpoQIQy4RMdvuJgdT2dFqZzEi7Mit1D+Vy7ldYJm2Pm0OYcMaCOWRG6vXIfsOxKDRWYwS+NPCbJiEXCsZMGXSuWCWRid1KJi8lX5buzktaqP1hAcYBoGKxWnLJtAJz8sXJwRMsXZMRMQOCMVjWWZCbZHK5WSyGdk4shOrHaPqU5nmOxzGEAHdCLBKCMwIQYgu5SXRBSiyNcNzibsd07fcVVOSILibFduzKLtcmBPkgA */
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
          "Add to cart": "Adding item to cart",
        },
      },
      "Cart loading error": {},
      "Adding item to cart": {
        states: {
          "new state 1": {},
        },

        initial: "new state 1",
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
    },
  }
);
