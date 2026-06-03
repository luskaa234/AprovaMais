import { memo, useMemo } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#60a5fa", "#f59e0b", "#ef4444"];

export const ChartFrame = memo(({ children }) => <div className="h-72 w-full">{children}</div>);
ChartFrame.displayName = "ChartFrame";

export const PerformanceChart = memo(({ data }) => {
  const prepared = useMemo(() => data, [data]);
  return <ChartFrame><ResponsiveContainer><LineChart data={prepared}><CartesianGrid stroke="#1f2937" /><XAxis dataKey="label" stroke="#9ca3af" /><YAxis stroke="#9ca3af" /><Tooltip />{"minimo" in (prepared[0] || {}) ? <ReferenceLine y={prepared[0].minimo} stroke="#ef4444" strokeDasharray="5 5" /> : null}<Line dataKey="acertos" stroke="#6366f1" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartFrame>;
});
PerformanceChart.displayName = "PerformanceChart";

export const StudyTimeChart = memo(({ data, layout = "horizontal" }) => (
  <ChartFrame><ResponsiveContainer><BarChart data={data} layout={layout === "vertical" ? "vertical" : "horizontal"}>{layout === "vertical" ? <><XAxis type="number" stroke="#9ca3af" /><YAxis type="category" dataKey="label" width={130} stroke="#9ca3af" /></> : <><XAxis dataKey="label" stroke="#9ca3af" /><YAxis stroke="#9ca3af" /></>}<CartesianGrid stroke="#1f2937" /><Tooltip /><Bar dataKey="valor">{data.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}</Bar></BarChart></ResponsiveContainer></ChartFrame>
));
StudyTimeChart.displayName = "StudyTimeChart";

export const DistributionPieChart = memo(({ data }) => (
  <ChartFrame><ResponsiveContainer><PieChart><Pie data={data} dataKey="valor" nameKey="label" outerRadius={90}>{data.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartFrame>
));
DistributionPieChart.displayName = "DistributionPieChart";

export const RetentionRadarChart = memo(({ data }) => (
  <ChartFrame><ResponsiveContainer><RadarChart data={data}><PolarGrid stroke="#374151" /><PolarAngleAxis dataKey="label" stroke="#9ca3af" /><Radar name="Atual" dataKey="valor" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.35} />{"meta" in (data[0] || {}) ? <Radar name="Meta" dataKey="meta" stroke="#94a3b8" fill="transparent" strokeDasharray="5 5" /> : null}<Tooltip /><Legend /></RadarChart></ResponsiveContainer></ChartFrame>
));
RetentionRadarChart.displayName = "RetentionRadarChart";

export const EssayAreaChart = memo(({ data }) => (
  <ChartFrame><ResponsiveContainer><AreaChart data={data}><XAxis dataKey="label" stroke="#9ca3af" /><YAxis stroke="#9ca3af" /><Tooltip /><Area dataKey="valor" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} /></AreaChart></ResponsiveContainer></ChartFrame>
));
EssayAreaChart.displayName = "EssayAreaChart";

export const HeatmapCalendar = memo(({ days = 56 }) => (
  <div><div className="grid grid-cols-14 gap-1">{Array.from({ length: days }, (_, index) => { const minutes = [0, 18, 34, 47, 82][index % 5]; return <span key={index} title={`Seg 02/06 · ${minutes} min`} className="h-4 rounded-sm" style={{ backgroundColor: ["#e5e7eb", "#c7d2fe", "#818cf8", "#4f46e5", "#312e81"][index % 5] }} />; })}</div><div className="mt-3 flex items-center gap-2 text-xs text-gray-400"><span>Menos</span>{["#e5e7eb", "#c7d2fe", "#818cf8", "#4f46e5", "#312e81"].map((color) => <i key={color} className="h-3 w-5 rounded-sm" style={{ backgroundColor: color }} />)}<span>Mais</span></div></div>
));
HeatmapCalendar.displayName = "HeatmapCalendar";
