import { sql } from "drizzle-orm";
import {
  integer,
  pgSchema,
  serial,
  smallint,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

export const flotexSchema = pgSchema("flotex_schm");

export const USER_TYPE = flotexSchema.enum("user_type", ["CUSTOMER", "ADMIN"]);
export const ORDER_STATUS = flotexSchema.enum("order_status", ["RECEIVED", "IN_PROGRESS", "SHIPPING", "DELIVERED", "CANCELED"]);
export const ENTITY_STATUS = flotexSchema.enum("entity_status", ["ACTIVE", "NOT_ACTIVE"]);
export const SHIPPING_TYPE = flotexSchema.enum("shipping_type", ["SHIPPING", "INHOUSE"]);

// Usuarios registrados
export const users = flotexSchema.table("users", {
  id: serial("id").primaryKey().notNull(),
  firstname: varchar("firstname").notNull(),
  lastname: varchar("lastname").notNull(),
  password: varchar("password").notNull(),
  phone: integer("phone").notNull(),
  email: varchar("email").notNull().unique(),
  active: ENTITY_STATUS().default("ACTIVE"),
  role: USER_TYPE().default("CUSTOMER").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Direcciones de usuarios
export const addresses = flotexSchema.table("addresses", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  country: varchar("country").notNull(),
  city: varchar("city").notNull(),
  address: varchar("address").notNull(),
  reference: varchar("reference"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Categorías
export const categories = flotexSchema.table("categories", {
  id: varchar("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  imageUrl: varchar("image_url").notNull(),
  description: varchar("description").notNull(),
  active: ENTITY_STATUS().default("ACTIVE"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Productos
export const products = flotexSchema.table("products", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  imageUrl: varchar("image_url"),
  description: varchar("description").notNull(),
  price: integer("price").notNull(),
  sku: varchar("sku").notNull(),
  stock: integer().notNull(),
  categoryId: varchar("category_id").references(() => categories.id).notNull(),
  discount: smallint(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Órdenes
export const orders = flotexSchema.table("orders", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey().notNull(),
  userId: integer("user_id").references(() => users.id),
  addressId: uuid("address_id"),
  guestAddress: varchar("guest_address"),
  guestFirstname: varchar("guest_firstname"),
  guestLastname: varchar("guest_lastname"),
  guestCountry: varchar("guest_country"),
  guestCity: varchar("guest_city"),
  guestReference: varchar("guest_reference"),
  guestPhone: varchar("guest_phone"),
  guestEmail: varchar("guest_email"),
  shippingType: SHIPPING_TYPE().default("SHIPPING"),
  detail: varchar("detail"),
  status: ORDER_STATUS().default("RECEIVED").notNull(),
  totalAmount: varchar("total_amount").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Ítems de las órdenes
export const orderItems = flotexSchema.table("order_items", {
  id: serial("id").primaryKey().notNull(),
  orderId: uuid("order_id").references(() => orders.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Carritos (uno por usuario o sesión)
export const carts = flotexSchema.table("carts", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Ítems del carrito
export const cartItems = flotexSchema.table("cart_items", {
  id: serial("id").primaryKey().notNull(),
  cartId: uuid("cart_id").references(() => carts.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});