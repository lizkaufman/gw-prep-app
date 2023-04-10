import React, { useCallback } from "react";

import { useShoppingCart } from "@/libs/machines/shoppingCartMachine/shoppingCartContext";

const ViewCart = ({
  cartState,
  cartSend,
}: {
  cartState: any;
  cartSend: any;
}) => {
  console.log(cartState.context);

  const handleAddItem1 = useCallback(() => {
    console.log("cartSend", {
      id: 0,
      name: "Battletome",
      price: "£35",
    });
    cartSend({
      type: "Add item",
      item: {
        id: 0,
        name: "Battletome",
        price: "£35",
      },
      timestamp: Date.now(),
    });
  }, [cartSend]);

  const handleAddItem2 = useCallback(() => {
    console.log("cart send", {
      id: 1,
      name: "Warscroll Cards",
      price: "£22",
    });
    cartSend({
      type: "Add item",
      item: {
        id: 1,
        name: "Warscroll Cards",
        price: "£22",
      },
      timestamp: Date.now(),
    });
  }, [cartSend]);

  return (
    <main>
      <h1>Your Shopping Cart</h1>
      <p>{JSON.stringify(cartState.context.cartItems)}</p>
      <button onClick={handleAddItem1}>add item test 1</button>
      <button onClick={handleAddItem2}>add item test 2</button>
    </main>
  );
};

export default ViewCart;
