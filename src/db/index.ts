import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// for query purposes

declare global {
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

const connectionOptions = {
  ssl: {
    rejectUnauthorized: false,
  },
};

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(process.env.DATABASE_URL!, connectionOptions), {
    schema,
  });
} else {
  if (!global.db) {
    global.db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
  }
  db = global.db;
}

export { db };
