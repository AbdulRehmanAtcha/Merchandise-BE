import mongoose, { Schema } from "mongoose";


const orderSchema = new Schema({
    cart: [
        {
            productImage: String,
            quantity: Number,
            productPrice: Number,
            _id: { type: mongoose.Schema.Types.ObjectId, ref:"products", select:"productName productPrice productImage" },
            productName: String
        }
    ],
    totalItems: {
        type: Number,
        default: 0,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    totalProfit: {
        // type: Number,
        // default: 0,
    },
},
{
    timestamps: true
})

export const OrderModel = mongoose.model("Order", orderSchema)