import mongoose from "mongoose";
export type InvestDocument = mongoose.Document & {
    wallet: string,
    amount: number,
    days: number,
    percents: number,
    start: Date,
};

const investSchema = new mongoose.Schema({
    wallet: String,
    amount: Number,
    days: Number,
    percents: Number,
    start: Date
}, { timestamps: true });

const Invest = mongoose.model<InvestDocument>("invest", investSchema);

export default Invest;