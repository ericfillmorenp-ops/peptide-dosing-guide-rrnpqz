import { createApplication } from "@specific-dev/framework";
import * as schema from './src/db/schema/schema.js';
import { peptideSeedData } from './src/lib/peptide-seed-data.js';

const app = await createApplication(schema);

try {
  app.logger.info({ count: peptideSeedData.length }, 'Starting peptide database seed');

  // Clear existing peptides
  await app.db.delete(schema.peptides);
  app.logger.info('Cleared existing peptides');

  // Seed with comprehensive data
  for (const peptide of peptideSeedData) {
    await app.db.insert(schema.peptides).values(peptide);
  }

  app.logger.info({ count: peptideSeedData.length }, 'Successfully seeded peptides with reconstitution instructions');
  process.exit(0);
} catch (error) {
  app.logger.error({ err: error }, 'Failed to seed peptides');
  process.exit(1);
}
