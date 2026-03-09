import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { monitors } from "./monitor";

export const checks = sqliteTable("checks", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    monitorId: text("monitor_id").references(() => monitors.id).notNull(),
    status: text("status").notNull(), // unchanged, changed, error
    hash: text("hash").notNull(), // SHA256
    responseTime: integer("response_time"), // in ms
    timestamp: integer("timestamp", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
