import { BarChart3, CalendarCheck, CheckCircle2, Clock3, FileQuestion, Target } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const chartData = [
  { week: "S1", score: 42 },
  { week: "S2", score: 55 },
  { week: "S3", score: 51 },
  { week: "S4", score: 68 },
  { week: "S5", score: 76 },
  { week: "S6", score: 84 },
];

const goals = [
  "Revisar Direito Constitucional",
  "Resolver 40 questões de Português",
  "Simulado geral - bloco 02",
  "Redação: tema de atualidades",
];

const subjects = [
  { name: "Português", value: "78%" },
  { name: "Matemática", value: "64%" },
  { name: "Direito Administrativo", value: "82%" },
  { name: "Legislação", value: "71%" },
];

function DashboardPreview() {
  return (
    <section className="section-shell landing-dashboard-section" id="dashboard">
      <div className="section-heading">
        <span className="eyebrow">Dashboard premium</span>
        <h2>Uma visão clara do que estudar, revisar e melhorar</h2>
        <p>
          O painel reúne metas, simulados, desempenho por matéria e evolução
          semanal para transformar dados em decisões simples.
        </p>
      </div>

      <div className="dashboard-pro-shell">
        <aside className="dashboard-pro-sidebar">
          <strong>VemAprovar</strong>
          <span className="is-active">Visão geral</span>
          <span>Cronograma</span>
          <span>Questões</span>
          <span>Simulados</span>
          <span>Relatórios</span>
        </aside>

        <div className="dashboard-pro-main">
          <div className="dashboard-pro-header">
            <div>
              <span>Plano Concurso 2026</span>
              <h3>Semana 14 de 24</h3>
            </div>
            <div className="dashboard-pro-date">
              <CalendarCheck size={18} />
              Hoje
            </div>
          </div>

          <div className="dashboard-pro-metrics">
            <article>
              <FileQuestion size={19} />
              <strong>312</strong>
              <span>questões</span>
            </article>
            <article>
              <Target size={19} />
              <strong>84%</strong>
              <span>aderência</span>
            </article>
            <article>
              <CheckCircle2 size={19} />
              <strong>9/12</strong>
              <span>metas</span>
            </article>
            <article>
              <BarChart3 size={19} />
              <strong>+18%</strong>
              <span>evolução</span>
            </article>
          </div>

          <div className="dashboard-pro-grid">
            <div className="dashboard-pro-card dashboard-pro-chart">
              <div className="panel-title">
                <div>
                  <span>Desempenho nos simulados</span>
                  <strong>Últimas 6 semanas</strong>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 12, right: 8, left: -28, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1d63c4" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#2e97d4" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "currentColor", fontSize: 12 }} />
                  <YAxis hide domain={[30, 90]} />
                  <Tooltip cursor={{ stroke: "#1d63c4", strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="score" stroke="#1d63c4" strokeWidth={3} fill="url(#scoreGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="dashboard-pro-card">
              <div className="panel-title">
                <div>
                  <span>Metas do dia</span>
                  <strong>4 prioridades</strong>
                </div>
                <Clock3 size={22} />
              </div>
              <ul className="dashboard-goals">
                {goals.map((goal) => (
                  <li key={goal}>
                    <CheckCircle2 size={17} />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="dashboard-pro-card dashboard-subjects-card">
              <div className="panel-title">
                <div>
                  <span>Desempenho por matéria</span>
                  <strong>Mapa de reforço</strong>
                </div>
              </div>
              <div className="performance-list">
                {subjects.map((subject) => (
                  <div className="performance-row" key={subject.name}>
                    <div>
                      <span>{subject.name}</span>
                      <strong>{subject.value}</strong>
                    </div>
                    <div className="performance-bar" aria-label={`${subject.name}: ${subject.value}`}>
                      <span style={{ width: subject.value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPreview;
