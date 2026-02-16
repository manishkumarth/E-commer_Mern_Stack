

const mongoose=require('mongoose');
const connectToDb=async()=>{
    try{
      const res=await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to MongoDB",res.connection.host);
    }catch(err){
        console.log("Faild to connect DB",err)
    }
   
}

module.exports=connectToDb;