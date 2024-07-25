import {
  index,
  serial,
  pgTable,
  timestamp,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"

export const typeEnum = pgEnum("type", ["agree", "disagree"])

export const reactions = pgTable(
  "reactions",
  {
    id: serial("id").primaryKey().notNull(),
    idUser: varchar("id_user").notNull(),
    idEcho: varchar("id_echo").notNull(),
    type: typeEnum('type').notNull(),
    date: timestamp("date").default(sql`now()`),
  },
  (table) => ({
    echoIdx: index("echo_idx").on(table.idEcho),
  }),
)

export const insertReactionSchema = createInsertSchema(reactions)

export type Reaction = typeof reactions.$inferSelect // return type when queried
export type NewReaction = typeof reactions.$inferInsert // insert type
