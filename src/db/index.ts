import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import schema from "./schema"
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"

const db = drizzle(sql, { schema })

export default db
