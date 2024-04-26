ALTER TABLE "echos" ADD COLUMN "id_topic" integer;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "topic_idx" ON "echos" ("id_topic");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "echos" ADD CONSTRAINT "echos_id_topic_topics_id_fk" FOREIGN KEY ("id_topic") REFERENCES "topics"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
