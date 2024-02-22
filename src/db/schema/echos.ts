import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core"
import { relations, sql } from "drizzle-orm"
import { User, users } from "./users"

export const echos = pgTable("echos", {
  id: serial("id").primaryKey().notNull(),
  idSender: integer("idSender").notNull(),
  idUser: integer("idUser").notNull(),
  text: varchar("display_name", { length: 512 }).notNull(),
  title: varchar("title", { length: 64 }).notNull(),
  date: timestamp("timestamp").default(sql`now()`),
})

export const echosRelations = relations(echos, ({ one }) => ({
  postedBy: one(users, { fields: [echos.idSender], references: [users.id] }),
  echodTo: one(users, { fields: [echos.idUser], references: [users.id] }),
}))

export type Echo = typeof echos.$inferSelect // return type when queried
export type NewEcho = typeof echos.$inferInsert // insert type

export type EchoWithUser = Omit<Echo, "idSender" | "idUser"> & {
  postedBy: Omit<User, "bio">
  echodTo: Omit<User, "bio">
}
