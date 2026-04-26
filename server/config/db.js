

const mongoose=require('mongoose');
let isConnected=false
const connectToDb=async()=>{
    try{
        if(isConnected){
            return
        }
      const res=await mongoose.connect(process.env.MONGODB_URL);
        isConnected=true
      console.log("Connected to MongoDB",res.connection.host);
    }catch(err){
        console.log("Faild to connect DB",err)
    }
   
}

module.exports=connectToDb;
