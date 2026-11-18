
import axiosInstance from "../../../axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ADD PRODUCT
export const createProductThunk = createAsyncThunk(
    "product/add",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/add-product", formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product creation failed"
            );
        }
    }
);


// GET ALL PRODUCTS
export const getAllProductsThunk = createAsyncThunk(
    "product/all",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/all-products");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch products"
            );
        }
    }
);


// GET SINGLE PRODUCT
export const getSingleProductThunk = createAsyncThunk(
    "product/single",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/product-details/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product not found"
            );
        }
    }
);


// UPDATE PRODUCT
export const updateProductThunk = createAsyncThunk(
    "product/update",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `/update-product/${id}`,
                formData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product update failed"
            );
        }
    }
);


// DELETE PRODUCT
export const deleteProductThunk = createAsyncThunk(
    "product/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/delete-product/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product deletion failed"
            );
        }
    }
);
