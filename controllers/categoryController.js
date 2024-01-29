import categoryModel from "../Models/categoryModel.js";
import slugify from "slugify";

// CREATE CATEGORY CONTROLLER
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({
                message: "Name is Required"
            });
        }

        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists",
            });
        }

        const category = await new categoryModel({
            name,
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success: true,
            message: "New category created",
            category,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category",
        });
    }
};


// UPDATE CATEGORY CONTROLER
export const updateCategoryController = async(req,res) =>{
    try {
        const { name } = req.body;
        const {id} = req.params 
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});

        
        res.status(200).send({
            success:true,
            message:"Category Update Successfully",
            category,
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category",
        });
    }
    
}


// get category Controller
export const getCategorController = async(req,res)=>{
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"All Category List",
            category,
        });

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in get category",
        });   
    }
}

// GET SINGLE CATEGORY BY ID 
export const getSingleCategoryController = async(req,res)=>{
    try{
        
        
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:" Get Single Category Successfull",
            category,
        });

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getSingle category",
        });   
    }
}

// DELETE CATEGORY CONTROLLER
export const deleteCategoryController = async (req,res)=>{
    try{
         
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfully"
        })


    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Delete category",
        }); 

    }
}