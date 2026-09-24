import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const events = sqliteTable('events', {
 id: text('id').primaryKey(), date: text('date').notNull().default(''), time: text('time').notNull().default(''), venue: text('venue').notNull().default(''), address: text('address').notNull().default(''), mapUrl: text('map_url').notNull().default(''),
});
export const replies = sqliteTable('replies', {
 id: text('id').primaryKey(), name: text('name').notNull(), phone: text('phone').notNull(), nikkah: integer('nikkah').notNull(), mehndi: integer('mehndi').notNull(), walima: integer('walima').notNull(), message: text('message').notNull().default(''), createdAt: text('created_at').notNull(),
});
