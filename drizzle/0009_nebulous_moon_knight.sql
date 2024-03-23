DROP TABLE "users";--> statement-breakpoint
ALTER TABLE "echos" DROP CONSTRAINT "echos_idSender_users_id_fk";
--> statement-breakpoint
ALTER TABLE "echos" DROP CONSTRAINT "echos_idUser_users_id_fk";
--> statement-breakpoint
ALTER TABLE "connections" DROP CONSTRAINT "connections_id_user_users_id_fk";
--> statement-breakpoint
ALTER TABLE "connections" DROP CONSTRAINT "connections_id_friend_users_id_fk";
--> statement-breakpoint
ALTER TABLE "echos" ALTER COLUMN "idSender" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "echos" ALTER COLUMN "idUser" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "connections" ALTER COLUMN "id_user" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "connections" ALTER COLUMN "id_friend" SET DATA TYPE varchar;