import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const peptides = pgTable('peptides', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  benefits: text('benefits').notNull(),
  sideEffects: text('side_effects').notNull(),
  dosageMin: text('dosage_min').notNull(),
  dosageMax: text('dosage_max').notNull(),
  frequency: text('frequency').notNull(),
  timing: text('timing').notNull(),
  administrationRoute: text('administration_route').notNull(),
  reconstitutionInstructions: text('reconstitution_instructions'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
