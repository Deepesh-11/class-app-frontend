type Column<T> = {
  label: string
  render: (item: T) => React.ReactNode
  className?: string
}

type Props<T> = {
  data: T[]
  loading: boolean
  columns: Column<T>[]
  onSelect: (item: T) => void
  emptyMessage?: string
}

export default function DataTable<T extends { id: number }>({
  data,
  loading,
  columns,
  onSelect,
  emptyMessage = "No data yet.",
}: Props<T>) {
  if (loading) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-sm text-gray-400">
        Loading...
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-sm text-gray-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map((col) => (
              <th key={col.label} className={`text-left px-5 py-3 text-xs font-medium text-gray-400 ${col.className ?? ""}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onSelect(item)}
              className="hover:bg-gray-50 cursor-pointer transition"
            >
              {columns.map((col) => (
                <td key={col.label} className={`px-5 py-3 ${col.className ?? ""}`}>
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}