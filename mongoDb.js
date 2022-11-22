import mongoose from 'mongoose';
import './config.js';

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex: true})
.then(()=>{console.log("db connected")})
.catch((error)=>{console.log(`error  not connected ${error}`)});
