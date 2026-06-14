import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Ban, CheckCircle2, RefreshCw, Search, ShieldCheck, Trash2, UserPlus, Wrench } from "lucide-react";
import { Badge, Button, Card, Input, cx } from "../components";
import { adminService } from "../services";

function formatDate(value) {
  if (!value) return "Sem prazo";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function planBadge(user) {
  if (user.vitalicio) return { label: "Vitalício", variant: "success" };
  if (user.plano_ativo) return { label: user.status_plano || "Ativo", variant: "success" };
  return { label: user.status_plano || "Sem acesso", variant: "neutral" };
}

export const AdminLayout = memo(({ standalone = false }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState("");
  const [maintenance, setMaintenance] = useState({ enabled: false, message: "" });
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [inviteUrl, setInviteUrl] = useState("");
  const [newUser, setNewUser] = useState({ email: "", name: "", vitalicio: false });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const load = useCallback(async (term = "") => {
    setError("");
    setLoading(true);
    try {
      const [usersResult, maintenanceResult] = await Promise.all([
        adminService.getUsuarios({ search: term, limit: 100 }),
        adminService.getMaintenance(),
      ]);
      setUsuarios(usersResult.usuarios || []);
      setCount(usersResult.count || 0);
      setMaintenance(maintenanceResult);
    } catch (err) {
      setError(err.message || "Acesso administrativo recusado.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load("");
  }, [load]);

  const stats = useMemo(() => ({
    total: count || usuarios.length,
    ativos: usuarios.filter((user) => user.plano_ativo).length,
    vitalicios: usuarios.filter((user) => user.vitalicio).length,
  }), [count, usuarios]);

  const runAction = useCallback(async (id, action) => {
    setActionId(`${action}-${id}`);
    setError("");
    try {
      if (action === "vitalicio") await adminService.tornarVitalicio(id);
      if (action === "cancelar") await adminService.cancelarAcesso(id);
      await load(search);
    } catch (err) {
      setError(err.message || "Não foi possível executar a ação.");
    } finally {
      setActionId("");
    }
  }, [load, search]);

  const createUser = useCallback(async (event) => {
    event.preventDefault();
    setActionId("create-user");
    setError("");
    setInviteUrl("");
    try {
      const result = await adminService.criarUsuario(newUser);
      setInviteUrl(result.invite_url || "");
      setNewUser({ email: "", name: "", vitalicio: false });
      await load(search);
    } catch (err) {
      setError(err.message || "Não foi possível criar o usuário.");
    } finally {
      setActionId("");
    }
  }, [load, newUser, search]);

  const deleteUser = useCallback(async () => {
    if (!deleteTarget) return;
    setActionId(`delete-${deleteTarget.id}`);
    setError("");
    try {
      await adminService.deletarUsuario(deleteTarget.id, deleteConfirmation);
      setDeleteTarget(null);
      setDeleteConfirmation("");
      await load(search);
    } catch (err) {
      setError(err.message || "Não foi possível deletar o usuário.");
    } finally {
      setActionId("");
    }
  }, [deleteConfirmation, deleteTarget, load, search]);

  const saveMaintenance = useCallback(async () => {
    setActionId("maintenance");
    setError("");
    try {
      const next = await adminService.setMaintenance(maintenance);
      setMaintenance(next);
    } catch (err) {
      setError(err.message || "Não foi possível alterar a manutenção.");
    } finally {
      setActionId("");
    }
  }, [maintenance]);

  if (error && !usuarios.length && !loading) {
    return (
      <main className={cx("admin-layout", standalone && "mx-auto max-w-5xl p-4 sm:p-6")}>
        <Card className="border-red-100 bg-white shadow-sm">
          <div className="flex items-start gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-red-50 text-red-600">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-950">Acesso restrito</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                O backend recusou a abertura do painel. Entre com um email presente no secret <code>ADMIN_EMAILS</code>.
              </p>
              <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>
            </div>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className={cx("admin-layout grid gap-5", standalone && "mx-auto max-w-7xl p-4 sm:p-6")}>
      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wide text-blue-600">Painel seguro</span>
            <h1 className="mt-1 text-3xl font-black text-slate-950">Administração VemAprovar</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Ações sensíveis exigem verificação de admin e ficam registradas em auditoria.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button icon={UserPlus} onClick={() => setCreateModalOpen(true)}>Criar usuário</Button>
            <Button icon={RefreshCw} variant="secondary" loading={loading} onClick={() => load(search)}>
              Atualizar
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <Card className="border-blue-100 bg-white shadow-sm">
          <p className="text-xs font-black uppercase text-slate-500">Usuários</p>
          <strong className="mt-2 block text-3xl font-black text-slate-950">{stats.total}</strong>
        </Card>
        <Card className="border-blue-100 bg-white shadow-sm">
          <p className="text-xs font-black uppercase text-slate-500">Acessos ativos</p>
          <strong className="mt-2 block text-3xl font-black text-slate-950">{stats.ativos}</strong>
        </Card>
        <Card className="border-blue-100 bg-white shadow-sm">
          <p className="text-xs font-black uppercase text-slate-500">Vitalícios</p>
          <strong className="mt-2 block text-3xl font-black text-slate-950">{stats.vitalicios}</strong>
        </Card>
      </section>

      <Card className="border-blue-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Wrench size={18} className="text-blue-600" />
              <h2 className="text-xl font-black text-slate-950">Modo manutenção</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">Quando ativo, usuários comuns veem a mensagem de manutenção.</p>
          </div>
          <div className="grid flex-1 gap-2 lg:max-w-2xl lg:grid-cols-[auto_1fr_auto]">
            <label className="flex items-center gap-2 rounded-xl border border-blue-100 px-3 py-2 text-sm font-bold">
              <input
                checked={maintenance.enabled}
                className="size-4 accent-blue-600"
                onChange={(event) => setMaintenance((current) => ({ ...current, enabled: event.target.checked }))}
                type="checkbox"
              />
              Ativo
            </label>
            <Input
              onChange={(event) => setMaintenance((current) => ({ ...current, message: event.target.value }))}
              placeholder="Mensagem para os alunos"
              value={maintenance.message}
            />
            <Button loading={actionId === "maintenance"} onClick={saveMaintenance}>
              Salvar
            </Button>
          </div>
        </div>
      </Card>

      <Card className="border-blue-100 bg-white shadow-sm">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950">Usuários</h2>
            <p className="mt-1 text-sm text-slate-500">O admin nunca vê nem altera senha. Controle apenas o status da conta.</p>
          </div>
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              load(search);
            }}
          >
            <Input icon={Search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar email ou nome" value={search} />
            <Button type="submit" variant="secondary">Buscar</Button>
          </form>
        </div>

        {error ? <p className="mb-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr className="text-xs font-black uppercase text-slate-500">
                <th className="px-3 py-2">Usuário</th>
                <th className="px-3 py-2">Plano</th>
                <th className="px-3 py-2">Expira</th>
                <th className="px-3 py-2">Criado em</th>
                <th className="px-3 py-2">Última atividade</th>
                <th className="px-3 py-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => {
                const badge = planBadge(user);
                return (
                  <tr className="rounded-xl bg-slate-50 align-middle" key={user.id}>
                    <td className="rounded-l-xl px-3 py-3">
                      <strong className="block text-slate-950">{user.name || "Aluno"}</strong>
                      <span className="text-slate-500">{user.email}</span>
                    </td>
                    <td className="px-3 py-3">
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                      <span className="ml-2 text-xs font-semibold text-slate-500">{user.plano || "gratuito"}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{formatDate(user.plano_expira_em)}</td>
                    <td className="px-3 py-3 text-slate-600">{formatDate(user.created_at)}</td>
                    <td className="px-3 py-3 text-slate-600">{formatDate(user.updated_at)}</td>
                    <td className="rounded-r-xl px-3 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          icon={CheckCircle2}
                          loading={actionId === `vitalicio-${user.id}`}
                          onClick={() => runAction(user.id, "vitalicio")}
                          size="sm"
                        >
                          Tornar vitalício
                        </Button>
                        <Button
                          icon={Ban}
                          loading={actionId === `cancelar-${user.id}`}
                          onClick={() => runAction(user.id, "cancelar")}
                          size="sm"
                          variant="danger"
                        >
                          Cancelar
                        </Button>
                        <Button
                          icon={Trash2}
                          loading={actionId === `delete-${user.id}`}
                          onClick={() => {
                            setDeleteTarget(user);
                            setDeleteConfirmation("");
                          }}
                          size="sm"
                          variant="danger"
                        >
                          Deletar
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!loading && !usuarios.length ? (
          <div className="rounded-xl border border-dashed border-blue-200 p-8 text-center">
            <p className="font-bold text-slate-950">Nenhum usuário encontrado.</p>
            <p className="mt-1 text-sm text-slate-500">Revise a busca ou atualize a lista.</p>
          </div>
        ) : null}
      </Card>

      {createModalOpen ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/50 p-4">
          <Card hover={false} className="w-full max-w-lg border-blue-100 bg-white shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-950">Criar usuário</h2>
                <p className="mt-1 text-sm text-slate-500">O usuário recebe um convite e define a própria senha.</p>
              </div>
              <Button variant="ghost" onClick={() => setCreateModalOpen(false)}>Fechar</Button>
            </div>
            <form className="grid gap-3" onSubmit={createUser}>
              <Input label="Email" type="email" value={newUser.email} onChange={(event) => setNewUser((current) => ({ ...current, email: event.target.value }))} required />
              <Input label="Nome" value={newUser.name} onChange={(event) => setNewUser((current) => ({ ...current, name: event.target.value }))} />
              <label className="flex items-center gap-2 rounded-xl border border-blue-100 px-3 py-2 text-sm font-bold text-slate-700">
                <input
                  checked={newUser.vitalicio}
                  className="size-4 accent-blue-600"
                  onChange={(event) => setNewUser((current) => ({ ...current, vitalicio: event.target.checked }))}
                  type="checkbox"
                />
                Criar já como vitalício
              </label>
              {inviteUrl ? (
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-800">
                  <strong className="block">Convite criado</strong>
                  <p className="mt-1 break-all">{inviteUrl}</p>
                </div>
              ) : null}
              <Button loading={actionId === "create-user"} type="submit">Criar e gerar convite</Button>
            </form>
          </Card>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/50 p-4">
          <Card hover={false} className="w-full max-w-lg border-red-100 bg-white shadow-xl">
            <h2 className="text-xl font-black text-slate-950">Deletar usuário</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Esta ação remove o usuário do Supabase Auth e apaga o profile vinculado. Digite o email abaixo para confirmar.
            </p>
            <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{deleteTarget.email}</p>
            <div className="mt-4 grid gap-3">
              <Input label="Confirme o email" value={deleteConfirmation} onChange={(event) => setDeleteConfirmation(event.target.value)} />
              <div className="flex flex-wrap justify-end gap-2">
                <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancelar</Button>
                <Button
                  icon={Trash2}
                  loading={actionId === `delete-${deleteTarget.id}`}
                  disabled={deleteConfirmation.trim().toLowerCase() !== String(deleteTarget.email || "").toLowerCase()}
                  variant="danger"
                  onClick={deleteUser}
                >
                  Deletar definitivamente
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </main>
  );
});

AdminLayout.displayName = "AdminLayout";
