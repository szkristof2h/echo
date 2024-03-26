CREATE TABLE IF NOT EXISTS "topics" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp DEFAULT now(),
	"text" varchar NOT NULL
);
