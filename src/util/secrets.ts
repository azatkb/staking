import logger from "./logger";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; 

export const MONGODB_URI = process.env["MONGODB_URI"];
export const PORT = process.env["PORT"];


if (!MONGODB_URI) {
    logger.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    process.exit(1);
}
