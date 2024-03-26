import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"

export const topics = pgTable("topics", {
  id: serial("id").primaryKey().notNull(),
  date: timestamp("date").default(sql`now()`),
  text: varchar("text").notNull(),
})

export const insertTopicSchema = createInsertSchema(topics)

export type Topic = typeof topics.$inferSelect // return type when queried
export type NewTopic = typeof topics.$inferInsert // insert type
