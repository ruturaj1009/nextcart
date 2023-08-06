import express from 'express';
import formidable from 'express-formidable';
import { braintreePaymentcontroller, braintreeTokencontroller, categoryProductController, createProductcontroller, deleteProductcontroller, getProductcontroller, getsingleProductcontroller, productCountController, productfiltersController, productListController, productPhotocontroller, realtedProductController, searchProductController, updateProductcontroller } from '../controller/productController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin,formidable(),createProductcontroller);

router.put("/update-product/:id", requireSignIn, isAdmin,formidable(),updateProductcontroller);

router.get("/all-product",getProductcontroller);

router.get("/single-product/:slug",getsingleProductcontroller);

router.get("/product-img/:id",productPhotocontroller );

router.delete("/delete-product/:id", deleteProductcontroller);

router.post("/filter-product", productfiltersController);

router.get("/count-product", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", realtedProductController);

router.get("/category-product/:slug", categoryProductController);

router.get("/braintree/token", braintreeTokencontroller);

router.post("/braintree/payment", requireSignIn, braintreePaymentcontroller);

export default router;