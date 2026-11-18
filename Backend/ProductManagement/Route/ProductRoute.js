
import express from "express";

import {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} from "../Controller/ProductController.js";

import isAuthorized from "../../Middleware/IsAuthorized.js";
import isCanteenOwner from "../../Middleware/IsCanteenOwner.js";

const ProductRouter = express.Router();

// Public Routes
ProductRouter.get("/all-products", getAllProducts);
ProductRouter.get("/product-details/:id", getSingleProduct);

// Canteen Owner Routes
ProductRouter.post("/add-product", isAuthorized, isCanteenOwner, createProduct);
ProductRouter.put("/update-product/:id", isAuthorized, isCanteenOwner, updateProduct);
ProductRouter.delete("/delete-product/:id", isAuthorized, isCanteenOwner, deleteProduct);

export default ProductRouter;
