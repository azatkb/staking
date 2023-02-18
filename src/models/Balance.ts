import mongoose from "mongoose";
export type BalanceDocument = mongoose.Document & {
    wallet: string,
    amount: number
};

const balanceSchema = new mongoose.Schema({
    wallet: String,
    amount: Number
}, { timestamps: true });

const Balance = mongoose.model<BalanceDocument>("balance", balanceSchema);

export default Balance;