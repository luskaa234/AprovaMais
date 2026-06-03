import { memo, useCallback } from "react";
import { BarChart3, Edit, Trash2, Users } from "lucide-react";
import { Badge, Button, Card, Tabs } from "../components";
import { DataTable } from "../tables";
import { useAsyncData } from "../hooks";
import { adminService } from "../services";
import { useUser } from "../contexts";

export const AdminLayout = memo(() => {
  const { isAdmin } = useUser();
  const loadStats = useCallback(() => adminService.getStats(), []);
  const loadUsers = useCallback(() => adminService.getUsuarios(), []);
  const { data: stats } = useAsyncData(loadStats, [loadStats]);
  const { data: users } = useAsyncData(loadUsers, [loadUsers]);

  if (!isAdmin) {
    return (
      <Card className="admin-card">
        <h1 className="text-2xl font-black">Acesso restrito</h1>
        <p className="mt-2 text-sm text-slate-500">O painel administrativo exige role admin.</p>
      </Card>
    );
  }

  const statCards = [
    { label: "Usuarios", value: stats.usuarios, icon: Users },
    { label: "Questoes", value: stats.questoes, icon: BarChart3 },
    { label: "Simulados", value: stats.simulados, icon: BarChart3 },
  ];

  return (
    <div className="admin-layout">
      <div className="admin-heading">
        <span>Painel Aprova+</span>
        <h1>Painel administrativo</h1>
        <p>Gestao de materias, questoes, usuarios e estatisticas em uma visao clara.</p>
      </div>

      <div className="admin-stats-grid">
        {statCards.map(({ label, value, icon: Icon }) => (
          <Card className="admin-stat-card" key={label}>
            <div className="admin-stat-icon">
              <Icon size={18} />
            </div>
            <p>{label}</p>
            <strong>{value}</strong>
          </Card>
        ))}
      </div>

      <div className="admin-tabs">
        <Tabs
          items={["Materias", "Questoes", "Temas de Redacao", "Usuarios", "Estatisticas"]}
          activeTab="Usuarios"
          onChange={() => {}}
        />
      </div>

      <Card className="admin-card admin-table-card">
        <DataTable
          columns={[
            { key: "name", label: "Nome" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
          ]}
          rows={users}
          actions={(row) => (
            <div className="flex justify-end gap-2">
              <Badge variant={row.role === "admin" ? "success" : "neutral"}>{row.role}</Badge>
              <Button size="sm" variant="ghost" icon={Edit}>
                Editar
              </Button>
              <Button size="sm" variant="danger" icon={Trash2}>
                Excluir
              </Button>
            </div>
          )}
        />
      </Card>
    </div>
  );
});

AdminLayout.displayName = "AdminLayout";
