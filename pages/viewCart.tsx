import React from "react";

import { useShoppingCart } from "@/libs/machines/shoppingCartMachine/shoppingCartContext";

const ViewCart = ({
  cartState,
  cartSend,
}: {
  cartState: any;
  cartSend: any;
}) => {
  const { state, send } = useShoppingCart();

  console.log(state.context);

  return (
    <main>
      <h1>Your Shopping Cart</h1>
      <p>{JSON.stringify(state.context.cartItems)}</p>
      <button
        onClick={() => {
          send({
            type: "Add item",
            item: {
              id: 0,
              name: "Battletome",
              price: "£35",
            },
          });
        }}
      >
        add item test 1
      </button>
      <button
        onClick={() => {
          send({
            type: "Add item",
            item: {
              id: 1,
              name: "Warscroll Cards",
              price: "£22",
            },
          });
        }}
      >
        add item test 2
      </button>
    </main>
  );
};

export default ViewCart;
