import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"
import { OrderModel } from "../Models/order.model.js";
import { ProductModel } from "../Models/product.model.js";
import { SheetModel } from "../Models/sheet.model.js";


export const OrderHandler = asyncHandler(async (req, res) => {
    const { cart, totalItems, totalPrice } = req.body;
    if (!cart || cart.length <= 0 || !totalItems || !totalPrice) {
        throw new ApiError(401, "Something went wrong");
    }

    let totalProfit = 0;

    for (const item of cart) {
        const product = await ProductModel.findById(item._id);
        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        // Ensure the values are numbers
        const productBasePrice = Number(product.productBasePrice); // Getting base price from product model
        const productFinalPrice = Number(item.productFinalPrice);
        const quantity = Number(item.quantity);

        if (isNaN(productBasePrice) || isNaN(productFinalPrice) || isNaN(quantity)) {
            throw new ApiError(400, "Invalid product data in number conversion");
        }

        product.productQuantity -= quantity;
        await product.save();

        totalProfit += (productFinalPrice - productBasePrice) * quantity;
    }

    // Ensure totalProfit is a valid number
    if (isNaN(totalProfit)) {
        throw new ApiError(400, "Calculation error: totalProfit is NaN");
    }

    const totalPriceNumber = Number(totalPrice);
    if (isNaN(totalPriceNumber)) {
        throw new ApiError(400, "Invalid total price");
    }

    const order = { cart, totalItems, totalPrice: totalPriceNumber, totalProfit };

    const item = await OrderModel.create(order);
    const price = await OrderModel.findById(item?._id);
    await SheetModel.create({ totalPrice: price?.totalPrice, totalProfit: price?.totalProfit });

    return res.status(200).json(new ApiResponse(200, {}, "Order Created Successfully"));
});


