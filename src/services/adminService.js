import { mockQuestoes, mockUsers } from "../data";

/**
 * Future REST contract:
 * GET /admin/stats
 * GET /admin/usuarios?page=&limit=
 * PUT /admin/usuarios/:id
 * DELETE /admin/usuarios/:id
 * POST /admin/questoes
 * PUT /admin/questoes/:id
 * DELETE /admin/questoes/:id
 */
export const adminService = {
  async getStats() {
    return { usuarios: mockUsers.length, questoes: mockQuestoes.length, simulados: 319 };
  },
  async getUsuarios() {
    return mockUsers;
  },
};
