import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"
import { CloudinaryUploader } from "../Utils/cloudinary.js";
import { ProductModel } from "../Models/product.model.js";

export const AddProductHandler = asyncHandler(async (req, res) => {
    const { productName, productPrice, productQuantity } = req.body
    if ([productName, productPrice, productQuantity].some((item) => !item)) {
        throw new ApiError(401, "All Fields are required")
    }

    if (!req.files?.productImage) {
        throw new ApiError(401, "All fields are required");
    }
    const imgUpload = await CloudinaryUploader(req.files?.productImage ? req.files?.productImage[0]?.path : null)

    const product = { productName, productPrice, productQuantity, productImage: imgUpload?.url }
    await ProductModel.create(product)
    return res.status(200).json(new ApiResponse(200, product, "Product Created Successfully"))
})