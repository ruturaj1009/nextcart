 import express  from "express";
import { allCategorycontoller, createCategorycontroller, deleteCategorycontroller, singleCategorycontoller, updateCategorycontroller } from "../controller/categoryController.js";
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';



 const router = express.Router();

 router.post("/create-category", requireSignIn, isAdmin, createCategorycontroller);

 router.put("/update-category/:id",requireSignIn, isAdmin, updateCategorycontroller);

 router.get("/all-category", allCategorycontoller);

 router.get("/single-category/:slug",singleCategorycontoller);

 router.delete("/delete-category/:id", deleteCategorycontroller)

 export default router;