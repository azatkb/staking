import logger from "./logger";

export const MONGODB_URI = "mongodb+srv://admin:admin@cluster0.9yp9ew9.mongodb.net/staking?retryWrites=true&w=majority";
export const PORT = process.env.PORT|| 4000;


if (!MONGODB_URI) {
    logger.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    process.exit(1);
}
