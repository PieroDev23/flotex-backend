"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItems = exports.carts = exports.orderItems = exports.orders = exports.products = exports.categories = exports.addresses = exports.users = exports.SHIPPING_TYPE = exports.ENTITY_STATUS = exports.ORDER_STATUS = exports.USER_TYPE = exports.flotexSchema = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.flotexSchema = (0, pg_core_1.pgSchema)("flotex_schm");
exports.USER_TYPE = exports.flotexSchema.enum("user_type", ["CUSTOMER", "ADMIN"]);
exports.ORDER_STATUS = exports.flotexSchema.enum("order_status", ["RECEIVED", "IN_PROGRESS", "SHIPPING", "DELIVERED", "CANCELED"]);
exports.ENTITY_STATUS = exports.flotexSchema.enum("entity_status", ["ACTIVE", "NOT_ACTIVE"]);
exports.SHIPPING_TYPE = exports.flotexSchema.enum("shipping_type", ["SHIPPING", "INHOUSE"]);
// Usuarios registrados
exports.users = exports.flotexSchema.table("users", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    firstname: (0, pg_core_1.varchar)("firstname").notNull(),
    lastname: (0, pg_core_1.varchar)("lastname").notNull(),
    password: (0, pg_core_1.varchar)("password").notNull(),
    phone: (0, pg_core_1.integer)("phone").notNull(),
    email: (0, pg_core_1.varchar)("email").notNull().unique(),
    active: (0, exports.ENTITY_STATUS)().default("ACTIVE"),
    role: (0, exports.USER_TYPE)().default("CUSTOMER").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
// Direcciones de usuarios
exports.addresses = exports.flotexSchema.table("addresses", {
    id: (0, pg_core_1.uuid)("id").default((0, drizzle_orm_1.sql) `gen_random_uuid()`).primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id).notNull(),
    country: (0, pg_core_1.varchar)("country").notNull(),
    city: (0, pg_core_1.varchar)("city").notNull(),
    address: (0, pg_core_1.varchar)("address").notNull(),
    reference: (0, pg_core_1.varchar)("reference"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
// Categorías
exports.categories = exports.flotexSchema.table("categories", {
    id: (0, pg_core_1.varchar)("id").primaryKey().notNull(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    imageUrl: (0, pg_core_1.varchar)("image_url").notNull(),
    description: (0, pg_core_1.varchar)("description").notNull(),
    active: (0, exports.ENTITY_STATUS)().default("ACTIVE"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
// Productos
exports.products = exports.flotexSchema.table("products", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    imageUrl: (0, pg_core_1.varchar)("image_url"),
    description: (0, pg_core_1.varchar)("description").notNull(),
    price: (0, pg_core_1.integer)("price").notNull(),
    sku: (0, pg_core_1.varchar)("sku").notNull(),
    stock: (0, pg_core_1.integer)().notNull(),
    categoryId: (0, pg_core_1.varchar)("category_id").references(() => exports.categories.id).notNull(),
    discount: (0, pg_core_1.smallint)(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
// Órdenes
exports.orders = exports.flotexSchema.table("orders", {
    id: (0, pg_core_1.uuid)("id").default((0, drizzle_orm_1.sql) `gen_random_uuid()`).primaryKey().notNull(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id),
    addressId: (0, pg_core_1.uuid)("address_id"),
    guestAddress: (0, pg_core_1.varchar)("guest_address"),
    guestFirstname: (0, pg_core_1.varchar)("guest_firstname"),
    guestLastname: (0, pg_core_1.varchar)("guest_lastname"),
    guestCountry: (0, pg_core_1.varchar)("guest_country"),
    guestCity: (0, pg_core_1.varchar)("guest_city"),
    guestReference: (0, pg_core_1.varchar)("guest_reference"),
    guestPhone: (0, pg_core_1.varchar)("guest_phone"),
    guestEmail: (0, pg_core_1.varchar)("guest_email"),
    shippingType: (0, exports.SHIPPING_TYPE)().default("SHIPPING"),
    detail: (0, pg_core_1.varchar)("detail"),
    status: (0, exports.ORDER_STATUS)().default("RECEIVED").notNull(),
    totalAmount: (0, pg_core_1.varchar)("total_amount").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
// Ítems de las órdenes
exports.orderItems = exports.flotexSchema.table("order_items", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    orderId: (0, pg_core_1.uuid)("order_id").references(() => exports.orders.id).notNull(),
    productId: (0, pg_core_1.integer)("product_id").references(() => exports.products.id).notNull(),
    quantity: (0, pg_core_1.integer)("quantity").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
// Carritos (uno por usuario o sesión)
exports.carts = exports.flotexSchema.table("carts", {
    id: (0, pg_core_1.uuid)("id").default((0, drizzle_orm_1.sql) `gen_random_uuid()`).primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
// Ítems del carrito
exports.cartItems = exports.flotexSchema.table("cart_items", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    cartId: (0, pg_core_1.uuid)("cart_id").references(() => exports.carts.id).notNull(),
    productId: (0, pg_core_1.integer)("product_id").references(() => exports.products.id).notNull(),
    quantity: (0, pg_core_1.integer)("quantity").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
