import React, { useEffect, useState } from "react";
import UserCart from "../component/user_cart";
import { getUserCart } from "../services/user";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../features/cart";
import toast from "react-hot-toast";
const Cart = () => {
  const cartData = useSelector(state => state.cart.cartData);
  const dispatch = useDispatch()

  const handleCart = async () => {
    try {
      const cartRes = await getUserCart();
      console.log("cart data",cartRes.data.cart.items)
      const cartItems = cartRes.data.cart;
      dispatch(setCart(cartItems))

    } catch (error) {
      toast.error("something went wrong")
    }

  }

  useEffect(() => {
    console.log("cart component re-render")
    handleCart()
  },[])

  return (
    <div>
      <UserCart cart={cartData} />
    </div>
  );
};

export default Cart;
