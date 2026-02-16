const mongoose=require('mongoose');
const categorySchema=mongoose.Schema({
    name:{
        type:String, 
    },
    description:{
        type:String, 
    }
})
module.exports=mongoose.model('Category',categorySchema);