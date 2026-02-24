const { Router } = require("express");

const { registerUser, loginUser,getProfile ,sendOtp, verifyOtp, forgetPassword,deleteUser,getAllUsers} = require("../controller/user");
const {addProduct,deleteProduct,getSellerProducts,getAllProducts}=require("../controller/product")
const {addToCart ,getUserCart,removeFromCart}=require("../controller/usercart")
const {checkoutOrder,getTrackOrder,changeOrderStatus, getAllOrdersBySeller,getAllOrdersByUser}=require("../controller/order");
const {addCategory,getAllCategories,getProductByCategory}=require("../controller/category");
const authMiddleware = require("../middleware/auth");
const {createRazorpayOrder,verifyAndSaveOrder} =require('../controller/payment');

const router = Router();   

//user routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware,getProfile);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/forget-password", forgetPassword);

// admin only routes
router.post("/delete-user/:userId",authMiddleware,deleteUser);//admin only 
router.get("/get-all-users",authMiddleware,getAllUsers);   //admin only

// user 
router.post("/add-to-cart",authMiddleware,addToCart);
router.post("/remove-from-cart",authMiddleware,removeFromCart);
router.get("/get-user-cart",authMiddleware,getUserCart);
router.get("/get-all-orderby-user",authMiddleware,getAllOrdersByUser);
router.post("/checkout-order",authMiddleware,checkoutOrder);
router.get("/track-order",authMiddleware,getTrackOrder);

// this is through cloudnary with image upload by seller or admin
router.post("/add-product",authMiddleware,addProduct);
router.delete("/delete-product/:productId",authMiddleware,deleteProduct);
router.get("/get-seller-products",authMiddleware,getSellerProducts);
router.post("/get-all-orderby-seller",authMiddleware,getAllOrdersBySeller);
router.post("/order-status-change",authMiddleware,changeOrderStatus);
router.get("/add-category", authMiddleware, addCategory);


router.get("/get-all-products",getAllProducts);
router.get("/get-all-categories", getAllCategories);
router.get("/get-products-by-category/:category", getProductByCategory);

router.post('/create-order',authMiddleware,createRazorpayOrder)
router.post('/verify-save-order',authMiddleware,verifyAndSaveOrder)

module.exports = router;