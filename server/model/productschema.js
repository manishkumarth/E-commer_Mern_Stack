
const mongoose=require('mongoose');
const product=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    sellerInfo:{
       sellername:{ type:String},
       sellerId:{ type:String},
    },
    comment:[
        {
            userID:{ type:String, required:true },  
            commentText:{ type:String, required:true },
            date:{ type:Date, default:Date.now },
        }
    ],
})
module.exports=mongoose.model('Product',product);