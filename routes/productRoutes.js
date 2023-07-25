import express from 'express';
import formidable from 'express-formidable';
import { createProductcontroller } from '../controller/productController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin,formidable(),createProductcontroller);


export default router;