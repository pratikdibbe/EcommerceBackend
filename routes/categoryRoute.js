import express from 'express'
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { 
    createCategoryController,
    updateCategoryController,
    getCategorController,
    getSingleCategoryController,
    deleteCategoryController
 } from '../controllers/categoryController.js';


const router = express.Router()

//routes
// CREATE CATEGORY ROUTE
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);


// UPDATE CATEGORY ROUTE
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);


// GET CATEGORY ROUTE
router.get('/get-category', getCategorController)


// GET SINGLE CATEGORY
router.get('/single-category/:slug', getSingleCategoryController);


// DELETE CATEGORY ROUTE
router.delete('/delete-category/:id' ,  requireSignIn, isAdmin, deleteCategoryController);


export default router