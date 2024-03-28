ALTER TABLE "connections" ADD COLUMN "type" varchar;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "type_idx" ON "connections" ("type");