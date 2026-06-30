import { memo, useMemo } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#60a5fa", "#f59e0b", "#ef4444"];
const responsiveProps = { width: "100%", height: 288, minWidth: 1 };

export const ChartFrame = memo(({ children }) => <div className="h-72 min-h-72 w-full min-w-0">{children}</div>);
ChartFrame.displayName = "ChartFrame";

export const PerformanceChart = memo(({ data = [] }) => {
  const prepared = useMemo(() => data, [data]);
  return (
    <ChartFrame>
      <ResponsiveContainer {...responsiveProps}>
        <LineChart data={prepared}>
          <CartesianGrid stroke="#1f2937" />
          <XAxis dataKey="label" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          {"minimo" in (prepared[0] || {}) ? <ReferenceLine y={prepared[0].minimo} stroke="#ef4444" strokeDasharray="5 5" /> : null}
          <Line dataKey="acertos" stroke="#6366f1" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
});
PerformanceChart.displayName = "PerformanceChart";

export const StudyTimeChart = memo(({ data = [], layout = "horizontal" }) => (
  <ChartFrame>
    <ResponsiveContainer {...responsiveProps}>
      <BarChart data={data} layout={layout === "vertical" ? "vertical" : "horizontal"}>
        {layout === "vertical" ? (
          <>
            <XAxis type="number" stroke="#9ca3af" />
            <YAxis type="category" dataKey="label" width={130} stroke="#9ca3af" />
          </>
        ) : (
          <>
            <XAxis dataKey="label" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
          </>
        )}
        <CartesianGrid stroke="#1f2937" />
        <Tooltip />
        <Bar dataKey="valor">{data.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}</Bar>
      </BarChart>
    </ResponsiveContainer>
  </ChartFrame>
));
StudyTimeChart.displayName = "StudyTimeChart";

export const DistributionPieChart = memo(({ data = [] }) => (
  <ChartFrame>
    <ResponsiveContainer {...responsiveProps}>
      <PieChart>
        <Pie data={data} dataKey="valor" nameKey="label" outerRadius={90}>{data.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}</Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </ChartFrame>
));
DistributionPieChart.displayName = "DistributionPieChart";

export const RetentionRadarChart = memo(({ data = [] }) => (
  <ChartFrame>
    <ResponsiveContainer {...responsiveProps}>
      <RadarChart data={data}>
        <PolarGrid stroke="#374151" />
        <PolarAngleAxis dataKey="label" stroke="#9ca3af" />
        <Radar name="Atual" dataKey="valor" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.35} />
        {"meta" in (data[0] || {}) ? <Radar name="Meta" dataKey="meta" stroke="#94a3b8" fill="transparent" strokeDasharray="5 5" /> : null}
        <Tooltip />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  </ChartFrame>
));
RetentionRadarChart.displayName = "RetentionRadarChart";

export const EssayAreaChart = memo(({ data = [] }) => (
  <ChartFrame>
    <ResponsiveContainer {...responsiveProps}>
      <AreaChart data={data}>
        <XAxis dataKey="label" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip />
        <Area dataKey="valor" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
      </AreaChart>
    </ResponsiveContainer>
  </ChartFrame>
));
EssayAreaChart.displayName = "EssayAreaChart";

export const HeatmapCalendar = memo(({ days = 56, entries = [] }) => {
  const activityByDay = useMemo(() => entries.reduce((acc, item) => {
    const key = String(item.data || item.created_at || "").slice(0, 10);
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {}), [entries]);
  const palette = ["#e5e7eb", "#c7d2fe", "#818cf8", "#4f46e5", "#312e81"];
  const today = new Date();

  return (
    <div>
      <div className="grid grid-cols-14 gap-1">
        {Array.from({ length: days }, (_, index) => {
          const date = new Date(today);
          date.setDate(today.getDate() - (days - 1 - index));
          const key = date.toISOString().slice(0, 10);
          const total = activityByDay[key] || 0;
          const intensity = Math.min(4, total);
          return <span key={key} title={`${key} - ${total} atividade${total === 1 ? "" : "s"}`} className="h-4 rounded-sm" style={{ backgroundColor: palette[intensity] }} />;
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
        <span>Menos</span>
        {palette.map((color) => <i key={color} className="h-3 w-5 rounded-sm" style={{ backgroundColor: color }} />)}
        <span>Mais</span>
      </div>
    </div>
  );
});
HeatmapCalendar.displayName = "HeatmapCalendar";
