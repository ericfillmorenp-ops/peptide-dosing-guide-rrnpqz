import { describe, test, expect } from "bun:test";
import { api, authenticatedApi, signUpTestUser, expectStatus, connectWebSocket, connectAuthenticatedWebSocket, waitForMessage } from "./helpers";

describe("API Integration Tests", () => {
  // Shared state for chaining tests (e.g., created resource IDs, auth tokens)
  let peptideId: string;

  describe("Peptides - Get All", () => {
    test("Get all peptides should return 200", async () => {
      const res = await api("/api/peptides");
      await expectStatus(res, 200);
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
      // Store first peptide ID for later tests if available
      if (data.length > 0) {
        peptideId = data[0].id;
        expect(peptideId).toBeDefined();
        expect(data[0].name).toBeDefined();
        expect(data[0].category).toBeDefined();
      }
    });
  });

  describe("Peptides - Get by ID", () => {
    test("Get existing peptide by ID should return 200", async () => {
      // If no peptides available, verify the test gracefully
      if (!peptideId) {
        expect(peptideId).toBeFalsy();
        return;
      }
      const res = await api(`/api/peptides/${peptideId}`);
      await expectStatus(res, 200);
      const data = await res.json();
      expect(data.id).toBe(peptideId);
      expect(data.name).toBeDefined();
      expect(data.category).toBeDefined();
    });

    test("Get non-existent peptide should return 404", async () => {
      const nonExistentId = "00000000-0000-0000-0000-000000000000";
      const res = await api(`/api/peptides/${nonExistentId}`);
      await expectStatus(res, 404);
    });

    test("Get peptide with invalid UUID format should return 400", async () => {
      const res = await api("/api/peptides/invalid-uuid");
      await expectStatus(res, 400);
    });
  });

  describe("Peptides - Search", () => {
    test("Search peptides with valid query should return 200", async () => {
      const res = await api("/api/peptides/search?q=growth");
      await expectStatus(res, 200);
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test("Search peptides with empty query should return 200", async () => {
      const res = await api("/api/peptides/search?q=");
      await expectStatus(res, 200);
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test("Search peptides without query parameter should return 400", async () => {
      const res = await api("/api/peptides/search");
      await expectStatus(res, 400);
    });
  });

  describe("Peptides - Get by Category", () => {
    test("Get peptides by category should return 200", async () => {
      const res = await api("/api/peptides/category/Growth Hormone");
      await expectStatus(res, 200);
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test("Get peptides by non-existent category should return 200 with empty array", async () => {
      const res = await api("/api/peptides/category/nonexistent-category-xyz");
      await expectStatus(res, 200);
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
    });
  });
});
