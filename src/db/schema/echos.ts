import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  index,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { topics } from "./topics"

export const MAX_TEXT_LENGTH = 8192
const MAX_TITLE_LENGTH = 64

export const echos = pgTable(
  "echos",
  {
    id: serial("id").primaryKey().notNull(),
    idSender: varchar("id_sender").notNull(),
    idReceiver: varchar("id_user").notNull(),
    idParent: integer("id_parent"),
    text: varchar("text", { length: MAX_TEXT_LENGTH }).notNull(),
    title: varchar("title", { length: MAX_TITLE_LENGTH }).notNull(),
    date: timestamp("date").default(sql`now()`),
    idTopic: integer("id_topic").references(() => topics.id),
  },
  (table) => {
    return {
      dateIdx: index("date_idx").on(table.date),
      topicIdx: index("topic_idx").on(table.idTopic),
    }
  },
)

export const insertEchoSchema = createInsertSchema(echos, {
  title: (schema) =>
    schema.title
      .min(3, { message: "The title must be at least 3 characters long" })
      .max(MAX_TITLE_LENGTH, {
        message: `The title can't be more than ${MAX_TITLE_LENGTH} characters long`,
      }),
  text: (schema) =>
    schema.text
      .min(60, { message: "The post text must be at least 60 characters long" })
      .max(MAX_TEXT_LENGTH, {
        message: `The title can't be more than ${MAX_TEXT_LENGTH} characters long`,
      }),
})

export type Echo = typeof echos.$inferSelect // return type when queried
export type NewEcho = typeof echos.$inferInsert // insert type
