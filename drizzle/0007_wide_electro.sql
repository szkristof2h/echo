DO $$ BEGIN
 ALTER TABLE "echos" ADD CONSTRAINT "echos_idSender_users_id_fk" FOREIGN KEY ("idSender") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "echos" ADD CONSTRAINT "echos_idUser_users_id_fk" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
