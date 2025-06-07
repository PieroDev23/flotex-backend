import { z } from "zod";
export declare const productSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    imageUrl: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    sku: z.ZodString;
    stock: z.ZodNumber;
    status: z.ZodDefault<z.ZodEnum<["ACTIVE", "NOT_ACTIVE"]>>;
    categoryId: z.ZodString;
    discount: z.ZodNullable<z.ZodNumber>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: "ACTIVE" | "NOT_ACTIVE";
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    imageUrl: string;
    description: string;
    price: number;
    sku: string;
    stock: number;
    categoryId: string;
    discount: number | null;
}, {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    imageUrl: string;
    description: string;
    price: number;
    sku: string;
    stock: number;
    categoryId: string;
    discount: number | null;
    status?: "ACTIVE" | "NOT_ACTIVE" | undefined;
}>;
export type Product = z.infer<typeof productSchema>;
export declare const listProductsRequestSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodNumber>;
    categoryId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    sku: z.ZodOptional<z.ZodString>;
    priceSort: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    id?: number | undefined;
    name?: string | undefined;
    createdAt?: string | undefined;
    sku?: string | undefined;
    categoryId?: string | undefined;
    priceSort?: "asc" | "desc" | undefined;
}, {
    search?: string | undefined;
    id?: number | undefined;
    name?: string | undefined;
    createdAt?: string | undefined;
    sku?: string | undefined;
    categoryId?: string | undefined;
    priceSort?: "asc" | "desc" | undefined;
}>;
export type ListProductRequest = z.infer<typeof listProductsRequestSchema>;
export declare const createProductRequestSchema: import("drizzle-zod").BuildSchema<"insert", {
    id: import("drizzle-orm/pg-core").PgColumn<{
        name: "id";
        tableName: "products";
        dataType: "number";
        columnType: "PgSerial";
        data: number;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    name: import("drizzle-orm/pg-core").PgColumn<{
        name: "name";
        tableName: "products";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    imageUrl: import("drizzle-orm/pg-core").PgColumn<{
        name: "image_url";
        tableName: "products";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    description: import("drizzle-orm/pg-core").PgColumn<{
        name: "description";
        tableName: "products";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    price: import("drizzle-orm/pg-core").PgColumn<{
        name: "price";
        tableName: "products";
        dataType: "number";
        columnType: "PgInteger";
        data: number;
        driverParam: string | number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    sku: import("drizzle-orm/pg-core").PgColumn<{
        name: "sku";
        tableName: "products";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    stock: import("drizzle-orm/pg-core").PgColumn<{
        name: "stock";
        tableName: "products";
        dataType: "number";
        columnType: "PgInteger";
        data: number;
        driverParam: string | number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    categoryId: import("drizzle-orm/pg-core").PgColumn<{
        name: "category_id";
        tableName: "products";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    discount: import("drizzle-orm/pg-core").PgColumn<{
        name: "discount";
        tableName: "products";
        dataType: "number";
        columnType: "PgSmallInt";
        data: number;
        driverParam: string | number;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    createdAt: import("drizzle-orm/pg-core").PgColumn<{
        name: "created_at";
        tableName: "products";
        dataType: "date";
        columnType: "PgTimestamp";
        data: Date;
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    updatedAt: import("drizzle-orm/pg-core").PgColumn<{
        name: "updated_at";
        tableName: "products";
        dataType: "date";
        columnType: "PgTimestamp";
        data: Date;
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
}, undefined>;
export type CreateProductRequest = z.infer<typeof createProductRequestSchema>;
export declare const createProductFormSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    sku: z.ZodString;
    stock: z.ZodNumber;
    categoryId: z.ZodString;
    discount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    price: number;
    sku: string;
    stock: number;
    categoryId: string;
    discount?: number | null | undefined;
}, {
    name: string;
    description: string;
    price: number;
    sku: string;
    stock: number;
    categoryId: string;
    discount?: number | null | undefined;
}>;
export type CreateProductFormData = z.infer<typeof createProductFormSchema>;
export declare const updateProductRequestSchema: z.ZodObject<{
    productId: z.ZodNumber;
    fields: z.ZodObject<Omit<{
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        imageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNumber>;
        sku: z.ZodOptional<z.ZodString>;
        stock: z.ZodOptional<z.ZodNumber>;
        categoryId: z.ZodOptional<z.ZodString>;
        discount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        createdAt: z.ZodOptional<z.ZodDate>;
        updatedAt: z.ZodOptional<z.ZodDate>;
    }, "id">, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        imageUrl?: string | null | undefined;
        description?: string | undefined;
        price?: number | undefined;
        sku?: string | undefined;
        stock?: number | undefined;
        categoryId?: string | undefined;
        discount?: number | null | undefined;
    }, {
        name?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        imageUrl?: string | null | undefined;
        description?: string | undefined;
        price?: number | undefined;
        sku?: string | undefined;
        stock?: number | undefined;
        categoryId?: string | undefined;
        discount?: number | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    productId: number;
    fields: {
        name?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        imageUrl?: string | null | undefined;
        description?: string | undefined;
        price?: number | undefined;
        sku?: string | undefined;
        stock?: number | undefined;
        categoryId?: string | undefined;
        discount?: number | null | undefined;
    };
}, {
    productId: number;
    fields: {
        name?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        imageUrl?: string | null | undefined;
        description?: string | undefined;
        price?: number | undefined;
        sku?: string | undefined;
        stock?: number | undefined;
        categoryId?: string | undefined;
        discount?: number | null | undefined;
    };
}>;
export type UpdateProductRequest = z.infer<typeof updateProductRequestSchema>;
export declare const deleteProductRequestSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export type DeleteProductRequest = z.infer<typeof deleteProductRequestSchema>;
export declare const getProductRequestSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export type GetProductRequest = z.infer<typeof getProductRequestSchema>;
