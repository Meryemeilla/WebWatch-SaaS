import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as monitorSchema from "./schema/monitor";
import * as checkSchema from "./schema/check";
import dotenv from "dotenv";

dotenv.config();

const sqlite = new Database(process.env.DATABASE_URL || "sqlite.db");

export const db = drizzle(sqlite, {
    schema: { ...monitorSchema, ...checkSchema },
});
