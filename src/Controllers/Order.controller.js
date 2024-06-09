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

    for (const item of cart) {
        const product = await ProductModel.findById(item._id);
        if (!product) {
            throw new ApiError(404, "Product not found");
        }
        product.productQuantity -= item.quantity;
        await product.save();
    }

    const order = { cart, totalItems, totalPrice };

    const item = await OrderModel.create(order);
    const price = await OrderModel.findById(item?._id)
    await SheetModel.create({ totalPrice: price?.totalPrice })
    return res.status(200).json(new ApiResponse(200, {}, "Order Created Successfully"));
});
