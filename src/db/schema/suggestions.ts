import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"

export const suggestions = pgTable("suggestions", {
  id: serial("id").primaryKey().notNull(),
  idUser: varchar("id_user").notNull(),
  date: timestamp("date").default(sql`now()`),
  title: varchar("title").notNull(),
  analysis: varchar("analysis").notNull(),
  filter: varchar("filter").notNull(),
  suggestion: varchar("suggestion").notNull(),
})

export const insertSuggestionschema = createInsertSchema(suggestions)

export type Suggestion = typeof suggestions.$inferSelect // return type when queried
export type NewSuggestion = typeof suggestions.$inferInsert // insert type
