import slugify from "slugify";
// import productModel from "../Models/productModel.js";
import productModel from '../Models/productModel.js'
import fs from "fs";  
import categoryModel from '../Models/categoryModel.js'
// import dotenv from 'dotenv'




// CREATE PRODUCT CONTROLLER
// export const createProductController = async (req, res) => {
//   try {
//     const { name, description, price, category, quantity, shipping } =
//       req.fields;
//     const { photo } = req.files;
//     //alidation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
//       case !description:
//         return res.status(500).send({ error: "Description is Required" });
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case !quantity:
//         return res.status(500).send({ error: "Quantity is Required" });
//       case photo && photo.size > 1000000:
//         return res
//           .status(500)
//           .send({ error: "photo is Required and should be less then 1mb" });
//     }

//     const products = new productModel({ ...req.fields, slug: slugify(name) });
//     if (photo) {
//       products.photo.data = fs.readFileSync(photo.path);
//       products.photo.contentType = photo.type;
//     }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Created Successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in crearing product",
//     });
//   }
// };

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log( "product errorrrrr", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};




// UPDATE PRODUCT CONTROLLER
export const updateProductController = async (req, res) => {
     
    try {

        // go to npm formidable
        const { name, slug, description, price, category, quantity} = req.fields;
    
        const { photo } = req.files;
    
    
        // validation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is reuired" });
    
          case !slug:
            return res.status(500).send({ error: "slug is reuired " });
    
          case !description:
            return res.status(500).send({ error: "description is reuired" });
    
          case !price:
            return res.status(500).send({ error: "price is reuired " });
    
          case !category:
            return res.status(500).send({ error: "categoryy is reuired" });
    
          case !quantity:
            return res.status(500).send({ error: "quantity is reuired " });
    
          case photo && photo.size > 1000000:
            return res.status(500).send({ error: "Photo is reuired and should be less that 1mb " });
        }
    
        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) },
        {new:true});
    
        if (photo) {
    
          products.photo.data = fs.readFileSync(photo.path);
          products.photo.contentType = photo.contentType;
    
        }
    
        await products.save();
        return res.status(201).send({
          message: "Product UPDATED succesfully",
          products,
        });
    
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Product",
        });
      }

};


// GET ALL PRODUCTS CONTROLLER
export const getProductsController = async (req, res) => {
    
    try {
         
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            countTotal:products.length,
            message:"All Products ",
            products
        })
    
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in getting Product",
          error:error.message
        });
      }


};


//GET SINGLE PRODUCT CONTROLLER
export const getSingleProductController = async (req, res) => {
    
    try {
         
       const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success:true,
            message:"Single  Product fetched ",
            product
        })
    
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in getting Single  Product",
          error:error.message
        });
      }

};


// PHOTO CONTROLLER
// export const productPhotoController = async (req,res)=>{
    
//     try {
         
//         const product = await productModel.findById(req.params.pid).select("photo");

//         if(product.photo.data){
//             res.set("Content-type", product.photo.contentType);
//             return res.status(200).send(product.photo.data);
//         }
         
//     }catch (error) {
//          console.log(error);
//          res.status(500).send({
//            success: false,
//            error,
//            message: "Error while getting Product photo",
//            error:error.message
//          });
//        }
// }

export const productPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid).select("photo");
  
      if (product.photo.data) {
        res.set("Content-Type", product.photo.contentType);
        res.status(200).send(product.photo.data);
      } else {
        res.status(404).send({
          success: false,
          message: "Product photo not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting Product photo",
      });
    }
  };
  

// DELETE CONTROLLER
export const deleteProductController = async (req, res) => {

    try {
        
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success:true,
            message:'Product delete succesfully'
        })
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while Deleting Product ",
        });
      }
};


// FILTER
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};


// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};


// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 100;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};


// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};


