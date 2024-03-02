import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core"
import { relations, sql } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { User, users } from "./users"

const MAX_TEXT_LENGTH = 512
const MAX_TITLE_LENGTH = 64

export const echos = pgTable("echos", {
  id: serial("id").primaryKey().notNull(),
  idSender: integer("idSender").notNull(),
  idUser: integer("idUser").notNull(),
  text: varchar("display_name", { length: MAX_TEXT_LENGTH }).notNull(),
  title: varchar("title", { length: MAX_TITLE_LENGTH }).notNull(),
  date: timestamp("date").default(sql`now()`),
})

export const echosRelations = relations(echos, ({ one }) => ({
  postedBy: one(users, { fields: [echos.idSender], references: [users.id] }),
  echodTo: one(users, { fields: [echos.idUser], references: [users.id] }),
}))

export const insertEchoSchema = createInsertSchema(echos, {
  title: (schema) => schema.text.min(3).max(MAX_TITLE_LENGTH),
  text: (schema) => schema.text.min(3).max(MAX_TEXT_LENGTH),
})

export type Echo = typeof echos.$inferSelect // return type when queried
export type NewEcho = typeof echos.$inferInsert // insert type

export type EchoWithUser = Omit<Echo, "idSender" | "idUser"> & {
  postedBy: Omit<User, "bio">
  echodTo: Omit<User, "bio">
}
