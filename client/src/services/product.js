
import api from './axios'
export const getAllProduct=async()=>{
    const res=await api.get('/get-all-products')
    return res.data.products
}

export const getAllCatogry=async()=>{
    const res=await api.get('/get-all-categories')
    return res
}

// --- NEW --- Fetch single product by id
export const getSingleProduct = async (id) => {
  const res = await api.get(`/get-single-product/${id}`);
  return res.data.product;
};

// --- NEW --- Update product by id
export const updateProduct = async (id, data) => {
  const res = await api.put(`/get-product-update/${id}`, data);
  return res.data;
};

export const deleteProduct=async (id)=>{
  const res = await api.delete(`/delete-product/${id}`)
}

export const changeOrderStatus=async (data)=>{
  const res=await api.post("/order-status-change",data)
}