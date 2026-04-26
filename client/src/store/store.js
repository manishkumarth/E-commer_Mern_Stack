import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth_slice'
import cartReducer from '../features/cart'
export const store = configureStore({
    reducer: {
        user: authReducer,
        cart:cartReducer
    }
})
