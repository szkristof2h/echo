import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import schema from "./schema"

const db = drizzle(sql, { schema })

export default db
