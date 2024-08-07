import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ProductModel } from "../Models/product.model.js";


export const GetAllProductHandler = asyncHandler(async (req, res) => {
    // console.log("Hello World")
    const products = await ProductModel.find({ isDeleted: false }).select("-updatedAt").sort({ createdAt: -1 })
    // console.log(products)
    return res.status(200).json(new ApiResponse(200, products, "Successfully"))
})