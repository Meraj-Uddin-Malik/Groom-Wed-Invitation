CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text DEFAULT '' NOT NULL,
	`time` text DEFAULT '' NOT NULL,
	`venue` text DEFAULT '' NOT NULL,
	`address` text DEFAULT '' NOT NULL,
	`map_url` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `replies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`nikkah` integer NOT NULL,
	`mehndi` integer NOT NULL,
	`walima` integer NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL
);
