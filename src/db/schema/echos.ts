import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core"

export const echos = pgTable("echos", {
  id: serial("id").primaryKey().notNull(),
  idSender: integer("idSender").notNull(),
  idUser: integer("idUser").notNull(),
  text: varchar("display_name", { length: 512 }).notNull(),
})

export type Echo = typeof echos.$inferSelect // return type when queried
export type NewEcho = typeof echos.$inferInsert // insert type
