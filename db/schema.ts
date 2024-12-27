import { pgTable, serial, text, varchar, integer, boolean, uuid, timestamp } from 'drizzle-orm/pg-core';

const notes = pgTable('notes', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    text: varchar('text').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});





export { notes }
