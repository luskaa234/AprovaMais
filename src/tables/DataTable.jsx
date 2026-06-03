import { memo, useMemo, useState } from "react";
import { Button, Pagination } from "../components";

export const DataTable = memo(({ columns, rows, pageSize = 6, actions }) => {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(columns[0]?.key);
  const sortedRows = useMemo(() => [...rows].sort((a, b) => String(a[sortKey] || "").localeCompare(String(b[sortKey] || ""))), [rows, sortKey]);
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const visibleRows = useMemo(() => sortedRows.slice((page - 1) * pageSize, page * pageSize), [sortedRows, page, pageSize]);
  return (
    <div className="overflow-hidden rounded-lg border border-gray-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-900 text-gray-400">{columns.map((column) => <th key={column.key} className="px-3 py-3"><button onClick={() => setSortKey(column.key)}>{column.label}</button></th>)}{actions ? <th className="px-3 py-3 text-right">Acoes</th> : null}</thead>
        <tbody>{visibleRows.map((row) => <tr key={row.id || row.email || row.titulo} className="border-t border-gray-800 text-gray-300">{columns.map((column) => <td key={column.key} className="px-3 py-3">{row[column.key]}</td>)}{actions ? <td className="px-3 py-3 text-right">{actions(row)}</td> : null}</tr>)}</tbody>
      </table>
      <div className="p-3"><Pagination page={page} totalPages={totalPages} onPageChange={setPage} /></div>
    </div>
  );
});
DataTable.displayName = "DataTable";

export const TableActions = memo(() => <div className="flex justify-end gap-2"><Button size="sm" variant="ghost">Editar</Button><Button size="sm" variant="danger">Excluir</Button></div>);
TableActions.displayName = "TableActions";
