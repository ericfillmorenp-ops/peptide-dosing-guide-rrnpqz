
import Constants from 'expo-constants';

// Get backend URL from app.json configuration
export const BACKEND_URL = Constants.expoConfig?.extra?.backendUrl || 'http://localhost:3000';

console.log('[API] Backend URL configured:', BACKEND_URL);

/**
 * Peptide interface matching the backend API schema
 * Note: Backend API returns camelCase field names
 */
export interface Peptide {
  id: string;
  name: string;
  description: string;
  category: string;
  benefits: string;
  sideEffects: string | null;
  dosageMin: string;
  dosageMax: string;
  frequency: string;
  timing: string | null;
  administrationRoute: string;
  createdAt: string;
}

/**
 * Generic API error handler
 */
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic GET request helper
 */
async function apiGet<T>(endpoint: string): Promise<T> {
  const url = `${BACKEND_URL}${endpoint}`;
  console.log(`[API] GET ${url}`);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API] Error ${response.status}:`, errorText);
      throw new ApiError(response.status, errorText || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log(`[API] Success:`, data);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[API] Network error:', error);
    throw new Error('Network request failed. Please check your connection.');
  }
}

/**
 * Fetch all peptides
 * GET /api/peptides
 */
export async function getAllPeptides(): Promise<Peptide[]> {
  return apiGet<Peptide[]>('/api/peptides');
}

/**
 * Fetch a single peptide by ID
 * GET /api/peptides/:id
 */
export async function getPeptideById(id: string): Promise<Peptide> {
  return apiGet<Peptide>(`/api/peptides/${id}`);
}

/**
 * Search peptides by name or category
 * GET /api/peptides/search?q=searchTerm
 */
export async function searchPeptides(query: string): Promise<Peptide[]> {
  const encodedQuery = encodeURIComponent(query);
  return apiGet<Peptide[]>(`/api/peptides/search?q=${encodedQuery}`);
}

/**
 * Get peptides by category
 * GET /api/peptides/category/:category
 */
export async function getPeptidesByCategory(category: string): Promise<Peptide[]> {
  const encodedCategory = encodeURIComponent(category);
  return apiGet<Peptide[]>(`/api/peptides/category/${encodedCategory}`);
}
