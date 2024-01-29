import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { 
    createProductController,
    getProductsController,
    getSingleProductController,
    productPhotoController,
    deleteProductController,
    updateProductController,
    productFiltersController,
    productCountController,
    productListController,
    productCategoryController
    

 } from '../controllers/productController.js';

//  import formidable from 'formidable';

const router = express.Router()


//PRODUCT ROUTES


// CREATE PORDUCT ROUTE
router.post('/create-product', requireSignIn, isAdmin, createProductController);



// UPDATE PORDUCT ROUTE
router.put('/update-product/:pid', requireSignIn, isAdmin, updateProductController);


// GET PORDUCTS ROUTE
router.get('/get-products', getProductsController)


// GET SINGLE PORDUCT
router.get('/getsingle-product/:slug', getSingleProductController);


// GET PHOTO
router.get('/product-photo/:pid', productPhotoController)

// DELETE PORDUCT ROUTE
router.delete('/delete-product/:pid' ,  deleteProductController);



//filter product
router.post("/product-filters", productFiltersController);


//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);


//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router