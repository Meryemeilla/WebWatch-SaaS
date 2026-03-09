import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const monitors = sqliteTable("monitors", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    url: text("url").notNull(),
    interval: integer("interval").default(30), // minutes
    lastStatus: text("last_status"),
    createdAt: integer("created_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
