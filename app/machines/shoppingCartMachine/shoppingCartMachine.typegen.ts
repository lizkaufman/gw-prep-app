// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.Shopping cart machine.Loading cart:invocation[0]": {
      type: "done.invoke.Shopping cart machine.Loading cart:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Shopping cart machine.Loading cart:invocation[0]": {
      type: "error.platform.Shopping cart machine.Loading cart:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "Load cart": "done.invoke.Shopping cart machine.Loading cart:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    "Add item to cart": "Add item";
    "Assign cart to context": "done.invoke.Shopping cart machine.Loading cart:invocation[0]";
    "Assign error to context": "error.platform.Shopping cart machine.Loading cart:invocation[0]";
    "Remove item from cart": "Delete item";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    "Load cart": "Load cart" | "xstate.init";
  };
  matchesStates:
    | "Adding item"
    | "Cart loaded"
    | "Cart loading error"
    | "Cart updated"
    | "Deleting item"
    | "Loading cart";
  tags: never;
}