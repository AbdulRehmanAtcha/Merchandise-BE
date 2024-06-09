import mongoose, { Schema, Types } from "mongoose";

const expenseSchema = new Schema({
    expenseCost: {
        type: Number,
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

export const ExpenseModel = mongoose.model("Expense", expenseSchema)