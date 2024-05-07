import mongoose, { Schema } from "mongoose"

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required"],

    },
    productBasePrice: {
        type: Number,
        required: [true, "Product Price is required"],
        min: 1
    },
    productDiscount: {
        type: Number,
        default: 0
    },
    productFinalPrice: {
        type: Number,
        default: function () {
            return this.productBasePrice || 0;
        }
    },
    productQuantity: {
        type: Number,
        required: [true, "Product Quantity is required"],
        min: 0
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