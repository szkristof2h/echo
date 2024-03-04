import {
  boolean,
  index,
  pgTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

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

export const connections = pgTable(
  "connections",
  {
    idUser: serial("id_user").references(() => users.id),
    idFriend: serial("id_friend").references(() => users.id),
    date: timestamp("date").default(sql`now()`),
    isPending: boolean("is_pending").default(true),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.idUser, table.idFriend] }),
  }),
)

export type User = typeof users.$inferSelect // return type when queried
export type NewUser = typeof users.$inferInsert // insert type

export type Connection = typeof connections.$inferSelect // return type when queried
export type NewConnection = typeof connections.$inferInsert // insert type
