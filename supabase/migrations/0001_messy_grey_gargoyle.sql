ALTER TABLE "users" ADD COLUMN "otpCode" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "expiresAt" timestamp;