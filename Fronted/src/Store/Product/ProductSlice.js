
import { createSlice } from "@reduxjs/toolkit";

import {
    createProductThunk,
    getAllProductsThunk,
    getSingleProductThunk,
    updateProductThunk,
    deleteProductThunk
} from "./ProductApi";

const initialState = {
    products: [],
    product: null,
    selectedProduct: null,

    loading: false,
    error: null,
    success: false,
    message: "",

    isEditPopUp: false,
    isDeletePopUp: false,
    isCreatePopUp:false
};

const ProductSlice = createSlice({
    name: "product",
    initialState,

    reducers: {
        openEditPopUp: (state, action) => {
            state.selectedProduct = action.payload;
            state.isEditPopUp = true;
        },

        closeEditPopUp: (state) => {
            state.isEditPopUp = false;
            state.selectedProduct = null;
        },

        openDeletePopUp: (state, action) => {
            state.selectedProduct = action.payload;
            state.isDeletePopUp = true;
        },

        closeDeletePopUp: (state) => {
            state.isDeletePopUp = false;
            state.selectedProduct = null;
        },
        openCreatePopUp:(state)=>{
            state.isCreatePopUp=true
        },
        closeCreatePopUp:(state)=>{
            state.isCreatePopUp=false
        }
    },

    extraReducers: (builder) => {
        builder

            // CREATE PRODUCT
            .addCase(createProductThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.products.unshift(action.payload.product);
            })
            .addCase(createProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // GET ALL PRODUCTS
            .addCase(getAllProductsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(getAllProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // GET SINGLE PRODUCT
            .addCase(getSingleProductThunk.fulfilled, (state, action) => {
                state.product = action.payload.product;
            })

            // UPDATE PRODUCT
            .addCase(updateProductThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;

                const updatedProduct = action.payload.product;

                state.products = state.products.map((item) =>
                    item._id === updatedProduct._id ? updatedProduct : item
                );

                state.selectedProduct = null;
                state.isEditPopUp = false;
            })
            .addCase(updateProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE PRODUCT
            .addCase(deleteProductThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;

                state.products = state.products.filter(
                    (item) => item._id !== action.meta.arg
                );

                state.selectedProduct = null;
                state.isDeletePopUp = false;
            })
            .addCase(deleteProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    openEditPopUp,
    closeEditPopUp,
    openDeletePopUp,
    closeDeletePopUp,
    closeCreatePopUp,
    openCreatePopUp
} = ProductSlice.actions;
const ProductReducer=ProductSlice.reducer

export default ProductReducer;