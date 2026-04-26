import api from './axios'
export const requestOrder=async(amount)=>{
    const res=await api.post("/create-order",amount)
    return res
}
export const verifyOrder=async(data)=>{
    const res=await api.post("/verify-save-order",data)
    return res
}