export const formatPercent = (value) => `${Math.round(value)}%`;
export const formatMinutes = (minutes) => `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
export const normalize = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
export const groupCount = (items, key) => items.reduce((acc, item) => ({ ...acc, [item[key]]: (acc[item[key]] || 0) + 1 }), {});
