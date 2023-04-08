import { createMachine, assign } from "xstate";
import { ItemDetails } from "../components/itemCards/interfaces";

export const shoppingCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADpglgOygAIBjAQwCcAXQgW1ONXzADoAZdUifIsqgYgjo8LfADd0AaxZosuAiQrU6DJmw5d5vSgjHoylHEIDaABgC6ps4lCZ0sHAaHWQAD0QAmAMzvmnzwHYADncAFgBGAFYTEzCQkM8AGhAAT0RAsOYQoLjPWIj-CLCATgiAX1KkmWxuBSpaekZhNU4arT4wcnJ0cmZMABtSSgAzbppmKrkeRXqVJvYWzUUdPHF9QzxLS2dbe0c8ZzcEd1DfEMCios8IwM8ANhN0wKTUo7CTZgvg92vAkOOs9zlCogPDoCBwZwTVrTZSNMDbOwOdYHRAAWluzzRt3KlQw1UWdVhqnmGimVARu2RSFciD+mIQRRCzDCgV+gVutyi4VuwRxIChBKUDVUAGFpn11JAKUinNTDnEmbcsozzjcwkEnilEG9PJkrrcimFIukTF5scCBWShbMWGK6hKFkQOl1yNK9iiECF7swIt4SoF-GdAiZPJqXu4wrdmP4igbY0a-P53KagaUgA */
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
      "Cart loaded": {},
      "Cart loading error": {},
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
