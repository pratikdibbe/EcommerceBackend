import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
            
        },
        slug:{
            type:String,
            require:true,
          
        },
        description:{
            type:String,
            require:true,
        },
        price:{
            type:Number,
            require:true,
        },
        category:{
            type:mongoose.ObjectId,
            // linked category model 
            ref:"Category",
            require:true,
        },
        quantity:{
           type:Number,
           require:true,
        },
        photo:{
            data:Buffer,
            contentType:String
        },
        shipping:{
            type:Boolean,

        }
    },{timestamps:true}
);

export default mongoose.model("Product", productSchema)