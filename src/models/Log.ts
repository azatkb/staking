import mongoose from "mongoose";
export type LogDocument = mongoose.Document & {
    ip: string,
    type: string,
    wallet: string,
};

const logSchema = new mongoose.Schema({
    ip: String,
    type: String,
    wallet: String,
}, { timestamps: true });

const Log = mongoose.model<LogDocument>("log", logSchema);

export default Log;
