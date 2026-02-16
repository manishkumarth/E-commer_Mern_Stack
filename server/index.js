const express=require('express');
const app=express()
app.use(express.json());
require('dotenv').config();
const cors=require('cors');
app.use(cors());
const router=require('./routes/router')
const connectToDb=require('./config/db')
connectToDb();
app.use('/api',router);
app.get('/api',(req,res)=>{
    res.send("api working fine ");
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})