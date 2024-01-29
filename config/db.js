import mongoose from "mongoose";

const connectDB = async()=>{
    try{
          const conn = await mongoose.connect(process.env.MONGODB_URL);
          console.log(`connected to MongoDB Database `)
    }catch(error){
        console.log(`Error in MongoDB ${error}`)
    }
};

export default connectDB;