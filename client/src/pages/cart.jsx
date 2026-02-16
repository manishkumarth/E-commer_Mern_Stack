import React, { useEffect, useState } from "react";
import UserCart from "../component/user_cart";
import { getUserCart } from "../services/user";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../features/cart";
const Cart = () => {
  const cartData = useSelector(state => state.cart.cartData);
  const dispatch=useDispatch()

  const getCartData = async () => {
    try {
      const res = await getUserCart();
      // setCartData(res.data.cart);
      dispatch(setCart(res.data.cart))
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);
  useEffect(()=>{
    console.log("cart component re-render")
  })

  return (
    <div>
      <UserCart cart={cartData} />
    </div>
  );
};

export default Cart;
