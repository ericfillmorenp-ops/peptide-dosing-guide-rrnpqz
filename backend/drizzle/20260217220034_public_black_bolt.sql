CREATE TABLE "peptides" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"benefits" text NOT NULL,
	"side_effects" text,
	"dosage_min" text NOT NULL,
	"dosage_max" text NOT NULL,
	"frequency" text NOT NULL,
	"timing" text,
	"administration_route" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "peptides_name_unique" UNIQUE("name")
);
