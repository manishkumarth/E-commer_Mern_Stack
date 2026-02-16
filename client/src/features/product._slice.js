import { createSlice } from "@reduxjs/toolkit";


const productSlice=createSlice({
    initialState:{
        name:"product",
        product_data:[],
    },
    reducers:{
        setProduct:(state,action)=>{
            state.product_data=action.payload.data
        },
        filterByPrice:(state,action)=>{

        },
        filterByCategory:()=>{

        },
        search:(state,action)=>{

        }

    }
})
export const {setProduct,filterByCategory,filterByPrice,search}=action.productSlice
export default productSlice.reducer
