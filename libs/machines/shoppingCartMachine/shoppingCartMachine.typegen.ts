// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.ADD_ITEM": {
      type: "done.invoke.ADD_ITEM";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.DELETE_ITEM": {
      type: "done.invoke.DELETE_ITEM";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.EMPTY_CART": {
      type: "done.invoke.EMPTY_CART";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Shopping cart machine.LOADING_CART:invocation[0]": {
      type: "done.invoke.Shopping cart machine.LOADING_CART:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.ADD_ITEM": {
      type: "error.platform.ADD_ITEM";
      data: unknown;
    };
    "error.platform.DELETE_ITEM": {
      type: "error.platform.DELETE_ITEM";
      data: unknown;
    };
    "error.platform.EMPTY_CART": {
      type: "error.platform.EMPTY_CART";
      data: unknown;
    };
    "error.platform.Shopping cart machine.LOADING_CART:invocation[0]": {
      type: "error.platform.Shopping cart machine.LOADING_CART:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    ADD_ITEM: "done.invoke.ADD_ITEM";
    DELETE_ITEM: "done.invoke.DELETE_ITEM";
    EMPTY_CART: "done.invoke.EMPTY_CART";
    LOAD_CART: "done.invoke.Shopping cart machine.LOADING_CART:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    ASSIGN_CART_TO_CONTEXT: "done.invoke.Shopping cart machine.LOADING_CART:invocation[0]";
    ASSIGN_ERROR_TO_CONTEXT:
      | "error.platform.ADD_ITEM"
      | "error.platform.DELETE_ITEM"
      | "error.platform.EMPTY_CART"
      | "error.platform.Shopping cart machine.LOADING_CART:invocation[0]";
    UPDATE_CART:
      | "done.invoke.ADD_ITEM"
      | "done.invoke.DELETE_ITEM"
      | "done.invoke.EMPTY_CART";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    cartHasItems: "EMPTY_CART";
  };
  eventsCausingServices: {
    ADD_ITEM: "ADD_ITEM";
    DELETE_ITEM: "DELETE_ITEM";
    EMPTY_CART: "EMPTY_CART";
    LOAD_CART: "xstate.init";
  };
  matchesStates:
    | "ADDING_ITEM"
    | "CART_ERROR"
    | "CART_LOADED"
    | "DELETING_ITEM"
    | "EMPTYING_CART"
    | "LOADING_CART";
  tags: never;
}
