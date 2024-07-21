import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"
import { CloudinaryUploader } from "../Utils/cloudinary.js";
import { ProductModel } from "../Models/product.model.js";
import { ExpenseModel } from "../Models/expense.model.js";
import { OrderModel } from "../Models/order.model.js";
import { SheetModel } from "../Models/sheet.model.js";

export const AddProductHandler = asyncHandler(async (req, res) => {
    const { productName, productBasePrice, productQuantity, productSellPrice } = req.body
    if ([productName, productBasePrice, productQuantity, productSellPrice].some((item) => !item)) {
        throw new ApiError(401, "All Fields are required")
    }

    if (!req.files?.productImage) {
        throw new ApiError(401, "All fields are required");
    }
    const imgUpload = await CloudinaryUploader(req.files?.productImage ? req.files?.productImage[0]?.path : null)

    const product = { productName, productBasePrice, productQuantity, productImage: imgUpload?.url, productSellPrice }
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
    if (productDiscount == 0) {
        throw new ApiError(401, "Product Discount can't be 0")
    }
    const product = await ProductModel.findByIdAndUpdate({ _id: productId }, { productDiscount: productDiscount }, { new: true }).select("-isDeleted -updatedAt")
    product.productFinalPrice = product.productSellPrice - (product.productSellPrice * (product.productDiscount / 100))
    await product.save();
    return res.status(200).json(new ApiResponse(200, product, "Discount Added Successfully"))
})


export const ExpenseHandler = asyncHandler(async (req, res) => {
    const { expenseCost, method, description } = req?.body

    const obj = { expenseCost, method, description }
    await SheetModel.create(obj)
    return res.status(200).json(new ApiResponse(200, {}, "Expense Added"))

})


export const SheetHandler = asyncHandler(async (req, res) => {
    const result = await SheetModel.find().sort({ createdAt: -1 })
    return res.status(200).json(new ApiResponse(200, result, "Sheet Send Successfully"))
})


export const LedgerHandler = asyncHandler(async (req, res) => {
    const sheets = await SheetModel.find().sort({ createdAt: -1 });
    const ledgerEntries = sheets.map(sheet => {
        if (sheet.totalPrice) {
            return {
                account: "Sales",
                amount: sheet.totalPrice,
                type: "Credit",
                date: sheet.createdAt,
                description: `Order ID: ${sheet._id}`,
            };
        } else {
            return {
                account: "Expenses",
                amount: sheet.expenseCost,
                type: sheet.method,
                date: sheet.createdAt,
                description: sheet.description,
            };
        }
    });
    return res.status(200).json(new ApiResponse(200, ledgerEntries, "Ledger Entries Retrieved Successfully"));
});


export const RemoveDiscountHandler = asyncHandler(async (req, res) => {
    const { prodId } = req?.body;
    if (!prodId) {
        throw new ApiError(401, "Product Id Is Required")
    }
    const product = await ProductModel.findByIdAndUpdate({ _id: prodId }, { productDiscount: 0 }, { new: true }).select("-isDeleted -updatedAt")
    product.productFinalPrice = product.productSellPrice - (product.productSellPrice * (product.productDiscount / 100))
    await product.save();
    return res.status(200).json(new ApiResponse(200, product, "Discount Removed Successfully"))

})