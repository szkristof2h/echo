import { pgTable, serial, timestamp, text } from "drizzle-orm/pg-core"
import { users } from "./users"

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey().notNull(),
  idUser: serial("id_user")
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})

export type Session = typeof sessions.$inferSelect // return type when queried
export type NewSession = typeof sessions.$inferInsert // insert type
