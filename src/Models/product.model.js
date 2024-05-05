import mongoose, { Schema } from "mongoose"

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required"],

    },
    productPrice: {
        type: Number,
        required: [true, "Product Price is required"],
        min: 1
    },
    productQuantity: {
        type: Number,
        required: [true, "Product Quantity is required"],
        min: 1
    },
    productImage: {
        type: String,
        // required: [true, "Product Image is required"],
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true
    }
)

export const ProductModel = mongoose.model("Product", ProductSchema)