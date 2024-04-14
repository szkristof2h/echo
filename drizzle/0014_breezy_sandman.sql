CREATE TABLE IF NOT EXISTS "suggestions" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_user" varchar NOT NULL,
	"date" timestamp DEFAULT now(),
	"title" varchar NOT NULL,
	"analysis" varchar NOT NULL,
	"filter" varchar NOT NULL,
	"suggestion" varchar NOT NULL
);
