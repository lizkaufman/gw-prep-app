// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.Shopping cart machine.LOADING_CART:invocation[0]": {
      type: "done.invoke.Shopping cart machine.LOADING_CART:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Shopping cart machine.LOADING_CART:invocation[0]": {
      type: "error.platform.Shopping cart machine.LOADING_CART:invocation[0]";
      data: unknown;
    };
    "xstate.after(50)#Shopping cart machine.ADDING_ITEM": {
      type: "xstate.after(50)#Shopping cart machine.ADDING_ITEM";
    };
    "xstate.after(50)#Shopping cart machine.DELETING_ITEM": {
      type: "xstate.after(50)#Shopping cart machine.DELETING_ITEM";
    };
    "xstate.after(50)#Shopping cart machine.EMPTYING_CART": {
      type: "xstate.after(50)#Shopping cart machine.EMPTYING_CART";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    LOAD_CART: "done.invoke.Shopping cart machine.LOADING_CART:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    ADD_ITEM: "ADD_ITEM";
    ASSIGN_CART_TO_CONTEXT: "done.invoke.Shopping cart machine.LOADING_CART:invocation[0]";
    ASSIGN_ERROR_TO_CONTEXT: "error.platform.Shopping cart machine.LOADING_CART:invocation[0]";
    DELETE_ITEM: "DELETE_ITEM";
    EMPTY_CART: "EMPTY_CART";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    LOAD_CART: "xstate.init";
  };
  matchesStates:
    | "ADDING_ITEM"
    | "CART_LOADED"
    | "CART_LOADING_ERROR"
    | "DELETING_ITEM"
    | "EMPTYING_CART"
    | "LOADING_CART";
  tags: never;
}
