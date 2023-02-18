import mongoose from "mongoose";
export type TransactionDocument = mongoose.Document & {
    amount: number;
    type: string;
    wallet: string;
    hash: string;
};

const transactionSchema = new mongoose.Schema({
    amount: Number,
    type: String,
    wallet: String,
    hash: String,

}, { timestamps: true });

const Transaction = mongoose.model<TransactionDocument>("Transaction", transactionSchema);

export default Transaction;
