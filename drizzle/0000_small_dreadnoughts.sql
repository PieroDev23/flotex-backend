CREATE SCHEMA "flotex_schm";
--> statement-breakpoint
CREATE TYPE "flotex_schm"."entity_status" AS ENUM('ACTIVE', 'NOT_ACTIVE');--> statement-breakpoint
CREATE TYPE "flotex_schm"."order_status" AS ENUM('RECEIVED', 'IN_PROGRESS', 'SHIPPING', 'DELIVERED', 'CANCELED');--> statement-breakpoint
CREATE TYPE "flotex_schm"."user_type" AS ENUM('CUSTOMER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "flotex_schm"."addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" integer NOT NULL,
	"country" varchar NOT NULL,
	"city" varchar NOT NULL,
	"address" varchar NOT NULL,
	"reference" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flotex_schm"."cart_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"cart_id" uuid NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flotex_schm"."carts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flotex_schm"."categories" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"image_url" varchar NOT NULL,
	"description" varchar NOT NULL,
	"active" "flotex_schm"."entity_status" DEFAULT 'ACTIVE',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flotex_schm"."order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flotex_schm"."orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" integer,
	"address_id" uuid,
	"guest_address" varchar,
	"guest_firstname" varchar,
	"guest_lastname" varchar,
	"guest_country" varchar,
	"guest_city" varchar,
	"guest_reference" varchar,
	"guest_phone" varchar,
	"guest_email" varchar,
	"detail" varchar,
	"status" "flotex_schm"."order_status" DEFAULT 'RECEIVED' NOT NULL,
	"total_amount" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flotex_schm"."products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"image_url" varchar,
	"description" varchar NOT NULL,
	"price" integer NOT NULL,
	"sku" varchar NOT NULL,
	"stock" integer NOT NULL,
	"category_id" varchar NOT NULL,
	"discount" smallint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flotex_schm"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar NOT NULL,
	"lastname" varchar NOT NULL,
	"password" varchar NOT NULL,
	"phone" integer NOT NULL,
	"email" varchar NOT NULL,
	"active" "flotex_schm"."entity_status" DEFAULT 'ACTIVE',
	"role" "flotex_schm"."user_type" DEFAULT 'CUSTOMER' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "flotex_schm"."addresses" ADD CONSTRAINT "addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "flotex_schm"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flotex_schm"."cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "flotex_schm"."carts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flotex_schm"."cart_items" ADD CONSTRAINT "cart_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "flotex_schm"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flotex_schm"."carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "flotex_schm"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flotex_schm"."order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "flotex_schm"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flotex_schm"."order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "flotex_schm"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flotex_schm"."orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "flotex_schm"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flotex_schm"."products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "flotex_schm"."categories"("id") ON DELETE no action ON UPDATE no action;