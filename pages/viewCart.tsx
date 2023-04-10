import React from "react";

const ViewCart = ({
  cartState,
  cartSend,
}: {
  cartState: any;
  cartSend: any;
}) => {
  console.log(cartState.context);

  return (
    <main>
      <h1>Your Shopping Cart</h1>
      <p>{JSON.stringify(cartState.context.cartItems)}</p>
    </main>
  );
};

export default ViewCart;
