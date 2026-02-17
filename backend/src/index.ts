import { createApplication } from "@specific-dev/framework";
import * as schema from './db/schema/schema.js';
import * as peptidesRoutes from './routes/peptides.js';
import { peptideSeedData } from './lib/peptide-seed-data.js';

// Create application with schema for full database type support
export const app = await createApplication(schema);

// Export App type for use in route files
export type App = typeof app;

// Seed database if empty
async function seedDatabase() {
  try {
    const existingCount = await app.db.select().from(schema.peptides).limit(1);

    if (existingCount.length === 0) {
      app.logger.info({ count: peptideSeedData.length }, 'Seeding peptides database');

      for (const peptide of peptideSeedData) {
        await app.db.insert(schema.peptides).values(peptide);
      }

      app.logger.info({ count: peptideSeedData.length }, 'Successfully seeded peptides');
    } else {
      app.logger.info('Peptides table already populated, skipping seed');
    }
  } catch (error) {
    app.logger.error({ err: error }, 'Failed to seed database');
    throw error;
  }
}

// Register routes - add your route modules here
// IMPORTANT: Always use registration functions to avoid circular dependency issues
peptidesRoutes.register(app, app.fastify);

// Seed database before starting server
await seedDatabase();

await app.run();
app.logger.info('Application running');
