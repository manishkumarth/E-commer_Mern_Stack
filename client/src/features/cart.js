import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartData: { items: [], cartTotal: 0 },
        cartCount: 0,
    },
    reducers: {
        addItemOptimistic(state, action) {
            const item = action.payload;
            const existing = state.cartData.items.find(
                i => i.productId === item.productId
            );

            if (existing) {
                existing.quantity += 1;
                existing.total += existing.price;
            } else {
                state.cartData.items.push({
                    ...item,
                    quantity: 1,
                    total: item.price,
                });
            }

            state.cartCount += 1;
            state.cartData.cartTotal += item.price;
        },

        increaseQty(state, action) {
            const item = state.cartData.items.find(
                i => i.productId === action.payload
            );
            if (item) {
                item.quantity += 1;
                item.total += item.price;
                state.cartCount += 1;
                state.cartData.cartTotal += item.price;
            }
        },

        decreaseQty(state, action) {
            const item = state.cartData.items.find(
                i => i.productId === action.payload
            );
            if (item && item.quantity >= 1) {
                item.quantity -= 1;
                item.total -= item.price;
                state.cartCount -= 1;
                state.cartData.cartTotal -= item.price;
            }
        },

        setCart(state, action) {
            state.cartData = action.payload;
            state.cartCount = action.payload.items.reduce(
                (sum, i) => sum + i.quantity,
                0
            );
        },
        resetCart: (state) => {
            state.cartCount = 0;
            state.cartData = { items: [], cartTotal: 0 };
        }

    },
});

export const {
    addItemOptimistic,
    increaseQty,
    decreaseQty,
    setCart,
    resetCart
} = cartSlice.actions;

export default cartSlice.reducer;
