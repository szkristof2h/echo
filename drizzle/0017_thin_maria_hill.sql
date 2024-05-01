ALTER TABLE "echos" ADD COLUMN "is_test" boolean DEFAULT false;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "test_idx" ON "echos" ("is_test");