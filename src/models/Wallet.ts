import mongoose from "mongoose";
export type WalletDocument = mongoose.Document & {
    wallet: string
};

const walletSchema = new mongoose.Schema({
    wallet: String
}, { timestamps: true });

const Wallet = mongoose.model<WalletDocument>("wallet", walletSchema);

export default Wallet;