
import api from './axios'
export const getAllProduct=async()=>{
    const res=await api.get('/get-all-products')
    return res.data.products
}

export const getAllCatogry=async()=>{
    const res=await api.get('/get-all-categories')
    return res
}