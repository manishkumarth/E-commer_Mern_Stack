
import api from "./axios";
export const getRegister = async (data) => {
    const res = await api.post('/register', data)
    return res;
}
export const getLogin = async (data) => {
    const res = await api.post('/login', data)
    // localStorage.setItem("token", res.data.token);
    return res;
}

export const getProfile = async () => {
    const res = await api.get('/profile')
    return res;
}
export const getSendOtp = async (email) => {
    const res = await api.post("/send-otp", email);
    return res;
}
export const getVerifyOtp = async (data) => {
    const res = await api.post("/verify-otp", data);
    return res;
}
export const getForgotPassword = async (otp) => {
    const res = await api.post("/forget-password", otp);
    return res;
}
// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);
// router.post("/forget-password", forgetPassword);


export const getUserCart = async () => {
    const res = await api.get('/get-user-cart')
    return res;
}
export const saveToCart = async (data) => {
    const res = await api.post('/add-to-cart', data)
}
export const removeFromCart = async (productId) => {
    const res = await api.post('/remove-from-cart', productId)
}