import { createApplication } from "@specific-dev/framework";
import * as schema from './db/schema/schema.js';
import * as authSchema from './db/schema/auth-schema.js';
import * as peptidesRoutes from './routes/peptides.js';
import { peptideSeedData } from './lib/peptide-seed-data.js';

// Combine application and auth schemas
const combinedSchema = { ...schema, ...authSchema };

// Create application with combined schema for full database type support
export const app = await createApplication(combinedSchema);

// Export App type for use in route files
export type App = typeof app;

// Enable authentication with email/password and OAuth providers
app.withAuth();
app.logger.info('Authentication enabled with email/password, Google OAuth, and Apple OAuth');

// Seed database - clear and reseed with complete data
async function seedDatabase() {
  try {
    app.logger.info({ count: peptideSeedData.length }, 'Starting peptides database seed');

    // Clear existing peptides to ensure fresh data
    const deletedCount = await app.db.delete(schema.peptides);
    app.logger.info('Cleared existing peptides from database');

    // Seed with comprehensive data
    for (const peptide of peptideSeedData) {
      await app.db.insert(schema.peptides).values(peptide);
    }

    app.logger.info({ count: peptideSeedData.length }, 'Successfully seeded all peptides with reconstitution instructions');
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
