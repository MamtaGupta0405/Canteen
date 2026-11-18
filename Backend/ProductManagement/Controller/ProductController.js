import ProductModel from "../Model/ProductModel.js";

// CREATE PRODUCT - Only Canteen Owner
export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      image,
      category,
      preparationTime,
    } = req.body;

    if (
      !productName ||
      !description ||
      price === undefined ||
      !image ||
      !category ||
      preparationTime === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await ProductModel.create({
      productName,
      description,
      price,
      image,
      category,
      preparationTime,
      createdBy: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS - Public Access
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({
      isAvailable: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE PRODUCT - Public Access
export const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      _id: req.params.id,
      isAvailable: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PRODUCT - Only Canteen Owner
export const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      image,
      category,
      preparationTime,
      isAvailable,
    } = req.body;

    const product = await ProductModel.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.id,
      },
      {
        productName,
        description,
        price,
        image,
        category,
        preparationTime,
        isAvailable,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT - Only Canteen Owner
export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
