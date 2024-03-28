import {
  boolean,
  index,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"

export const connections = pgTable(
  "connections",
  {
    idUser: varchar("id_user").notNull(),
    idConnection: varchar("id_friend").notNull(),
    type: varchar("type").notNull(),
    date: timestamp("date").default(sql`now()`),
    isPending: boolean("is_pending").default(true),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.idUser, table.idConnection, table.type] }),
    nameIdx: index("type_idx").on(table.type),
  }),
)

export const insertConnectionSchema = createInsertSchema(connections)

export type Connection = typeof connections.$inferSelect // return type when queried
export type NewConnection = typeof connections.$inferInsert // insert type
