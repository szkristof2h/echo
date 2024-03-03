import { index, pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    displayName: varchar("display_name", { length: 16 }).notNull(),
    bio: varchar("bio", { length: 256 }),
  },
  (table) => {
    return {
      nameIdx: index("display_name_idx").on(table.displayName),
    }
  },
)

export type User = typeof users.$inferSelect // return type when queried
export type NewUser = typeof users.$inferInsert // insert type
