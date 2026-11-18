import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Breakfast",
                "Meals",
                "Snacks",
                "Beverages",
                "Desserts",
                "Fast Food"
            ]
        },

        preparationTime: {
            type: Number,
            required: true
        },

        isAvailable: {
            type: Boolean,
            default: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;