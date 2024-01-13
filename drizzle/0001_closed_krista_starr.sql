CREATE TABLE IF NOT EXISTS "echos" (
	"id" serial PRIMARY KEY NOT NULL,
	"idSender" integer NOT NULL,
	"idUser" integer NOT NULL,
	"display_name" varchar(512) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "display_name" SET NOT NULL;