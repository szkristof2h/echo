import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "./users"

export const echos = pgTable("echos", {
  id: serial("id").primaryKey().notNull(),
  idSender: integer("idSender").notNull(),
  idUser: integer("idUser").notNull(),
  text: varchar("display_name", { length: 512 }).notNull(),
})

export const echosRelations = relations(echos, ({ one }) => ({
  postedBy: one(users, { fields: [echos.idSender], references: [users.id] }),
  echodTo: one(users, { fields: [echos.idUser], references: [users.id] }),
}))

export type Echo = typeof echos.$inferSelect // return type when queried
export type NewEcho = typeof echos.$inferInsert // insert type
