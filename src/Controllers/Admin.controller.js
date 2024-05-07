import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"
import { CloudinaryUploader } from "../Utils/cloudinary.js";
import { ProductModel } from "../Models/product.model.js";

export const AddProductHandler = asyncHandler(async (req, res) => {
    const { productName, productBasePrice, productQuantity } = req.body
    if ([productName, productBasePrice, productQuantity].some((item) => !item)) {
        throw new ApiError(401, "All Fields are required")
    }

    if (!req.files?.productImage) {
        throw new ApiError(401, "All fields are required");
    }
    const imgUpload = await CloudinaryUploader(req.files?.productImage ? req.files?.productImage[0]?.path : null)

    const product = { productName, productBasePrice, productQuantity, productImage: imgUpload?.url }
    await ProductModel.create(product)
    return res.status(200).json(new ApiResponse(200, product, "Product Created Successfully"))
})


export const AddProductStock = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const product = await ProductModel.findByIdAndUpdate(
        { _id: productId },
        { $inc: { productQuantity: quantity } },
        { new: true }
    );

    return res.status(200).json(new ApiResponse(200, product, "Product Created Successfully"));
});


export const DeleteProductHandler = asyncHandler(async (req, res) => {
    const { productId } = req.body
    await ProductModel.findByIdAndUpdate(
        { _id: productId },
        {

            isDeleted: true
        },
        { new: true }
    )
    return res.status(200).json(new ApiResponse(200, {}, "Product deleted successfully"))
})


export const DiscountHandler = asyncHandler(async (req, res) => {
    const { productDiscount, productId } = req.body
    if (!productDiscount || !productId) {
        throw new ApiError(401, "All Fields are required")
    }
    if (productDiscount === 0) {
        throw new ApiError(401, "Product Discount can't be 0")
    }
    const product = await ProductModel.findByIdAndUpdate({ _id: productId }, { productDiscount: productDiscount }, { new: true }).select("-isDeleted -updatedAt")
    product.productFinalPrice = product.productBasePrice - (product.productBasePrice * (product.productDiscount / 100))
    await product.save();
    return res.status(200).json(new ApiResponse(200, product, "Discount Added Successfully"))
})
