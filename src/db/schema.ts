
import { pgTable, serial, text } from "drizzle-orm/pg-core";

// creating a table named tesitng with id and name as schema values
export const testing = pgTable('testing', {
  id: serial('id').notNull().primaryKey(),
  name: text('name'),
})