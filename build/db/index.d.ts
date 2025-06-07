import "dotenv/config";
import * as schema from "./schema";
declare const _default: import("drizzle-orm/node-postgres").NodePgDatabase<typeof schema> & {
    $client: import("drizzle-orm/node-postgres").NodePgClient;
};
export default _default;
