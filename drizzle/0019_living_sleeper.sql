DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('agree', 'disagree');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_user" varchar NOT NULL,
	"id_echo" varchar NOT NULL,
	"type" "type" NOT NULL,
	"date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "echo_idx" ON "reactions" ("id_echo");