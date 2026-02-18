import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { eq, ilike, or } from 'drizzle-orm';
import * as schema from '../db/schema/schema.js';
import type { App } from '../index.js';

const peptideSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    description: { type: 'string' },
    category: { type: 'string' },
    benefits: { type: 'string' },
    sideEffects: { type: ['string', 'null'] },
    dosageMin: { type: 'string' },
    dosageMax: { type: 'string' },
    frequency: { type: 'string' },
    timing: { type: ['string', 'null'] },
    administrationRoute: { type: 'string' },
    reconstitutionInstructions: { type: ['string', 'null'] },
    createdAt: { type: 'string', format: 'date-time' },
  },
};

export function register(app: App, fastify: FastifyInstance) {
  // GET /api/peptides - Returns all peptides
  fastify.get('/api/peptides', {
    schema: {
      description: 'Get all peptides',
      tags: ['peptides'],
      response: {
        200: {
          description: 'List of all peptides',
          type: 'array',
          items: peptideSchema,
        },
      },
    },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    app.logger.info({}, 'Fetching all peptides');
    try {
      const allPeptides = await app.db.select().from(schema.peptides);
      app.logger.info({ count: allPeptides.length }, 'Successfully fetched peptides');
      return allPeptides;
    } catch (error) {
      app.logger.error({ err: error }, 'Failed to fetch peptides');
      throw error;
    }
  });

  // GET /api/peptides/search?q=searchTerm - Search peptides by name or category
  fastify.get('/api/peptides/search', {
    schema: {
      description: 'Search peptides by name or category',
      tags: ['peptides'],
      querystring: {
        type: 'object',
        required: ['q'],
        properties: {
          q: { type: 'string', description: 'Search term for peptide name or category' },
        },
      },
      response: {
        200: {
          description: 'List of matching peptides',
          type: 'array',
          items: peptideSchema,
        },
      },
    },
  }, async (
    request: FastifyRequest<{ Querystring: { q: string } }>,
    reply: FastifyReply
  ) => {
    const { q } = request.query;
    app.logger.info({ searchTerm: q }, 'Searching peptides');
    try {
      const results = await app.db
        .select()
        .from(schema.peptides)
        .where(
          or(
            ilike(schema.peptides.name, `%${q}%`),
            ilike(schema.peptides.category, `%${q}%`)
          )
        );
      app.logger.info({ searchTerm: q, count: results.length }, 'Search completed');
      return results;
    } catch (error) {
      app.logger.error({ err: error, searchTerm: q }, 'Search failed');
      throw error;
    }
  });

  // GET /api/peptides/category/:category - Get peptides by category
  fastify.get<{ Params: { category: string } }>('/api/peptides/category/:category', {
    schema: {
      description: 'Get peptides by category',
      tags: ['peptides'],
      params: {
        type: 'object',
        required: ['category'],
        properties: {
          category: { type: 'string', description: 'Peptide category' },
        },
      },
      response: {
        200: {
          description: 'List of peptides in the category',
          type: 'array',
          items: peptideSchema,
        },
      },
    },
  }, async (
    request: FastifyRequest<{ Params: { category: string } }>,
    reply: FastifyReply
  ) => {
    const rawCategory = request.params.category;
    const category = decodeURIComponent(rawCategory);
    app.logger.info({ rawCategory, decodedCategory: category }, 'Fetching peptides by category');
    try {
      const results = await app.db
        .select()
        .from(schema.peptides)
        .where(eq(schema.peptides.category, category));

      app.logger.info({ category, count: results.length }, 'Peptides retrieved by category');
      return results;
    } catch (error) {
      app.logger.error({ err: error, category }, 'Failed to fetch peptides by category');
      throw error;
    }
  });

  // GET /api/peptides/:id - Get single peptide details by id
  fastify.get<{ Params: { id: string } }>('/api/peptides/:id', {
    schema: {
      description: 'Get a specific peptide by ID',
      tags: ['peptides'],
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid', description: 'Peptide ID' },
        },
      },
      response: {
        200: {
          description: 'Peptide details',
          ...peptideSchema,
        },
        404: {
          description: 'Peptide not found',
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
  }, async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    app.logger.info({ peptideId: id }, 'Fetching peptide by ID');
    try {
      const result = await app.db
        .select()
        .from(schema.peptides)
        .where(eq(schema.peptides.id, id))
        .limit(1);

      if (result.length === 0) {
        app.logger.warn({ peptideId: id }, 'Peptide not found');
        reply.code(404);
        return { error: 'Peptide not found' };
      }

      app.logger.info({ peptideId: id }, 'Peptide retrieved successfully');
      return result[0];
    } catch (error) {
      app.logger.error({ err: error, peptideId: id }, 'Failed to fetch peptide');
      throw error;
    }
  });
}
