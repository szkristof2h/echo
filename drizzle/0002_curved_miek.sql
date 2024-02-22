ALTER TABLE "echos" ADD COLUMN "title" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "echos" ADD COLUMN "timestamp4" timestamp DEFAULT now();