ALTER TABLE "connections" DROP CONSTRAINT "connections_id_user_id_friend_pk";--> statement-breakpoint
ALTER TABLE "connections" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_id_user_id_friend_type_pk" PRIMARY KEY("id_user","id_friend","type");