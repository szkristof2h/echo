ALTER TABLE "echos" RENAME COLUMN "idSender" TO "id_sender";--> statement-breakpoint
ALTER TABLE "echos" RENAME COLUMN "idUser" TO "id_user";--> statement-breakpoint
ALTER TABLE "echos" RENAME COLUMN "display_name" TO "text";--> statement-breakpoint
ALTER TABLE "echos" ALTER COLUMN "text" SET DATA TYPE varchar(8192);