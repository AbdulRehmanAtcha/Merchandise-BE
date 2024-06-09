import mongoose, { Schema, Types } from "mongoose";


const sheetSchema = new Schema({

    totalPrice: {
        type: Number
    },

    expenseCost: {
        type: Number
    },

    method: {
        type: String
    },
    description: {
        type: String
    }
},
    {
        timestamps: true
    })

export const SheetModel = mongoose.model("Sheet", sheetSchema)