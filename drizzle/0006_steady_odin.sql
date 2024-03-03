CREATE TABLE IF NOT EXISTS "connections" (
	"id_user" serial NOT NULL,
	"id_friend" serial NOT NULL,
	"date" timestamp DEFAULT now(),
	"is_pending" boolean DEFAULT true,
	CONSTRAINT connections_id_user_id_friend_pk PRIMARY KEY("id_user","id_friend")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connections" ADD CONSTRAINT "connections_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connections" ADD CONSTRAINT "connections_id_friend_users_id_fk" FOREIGN KEY ("id_friend") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
