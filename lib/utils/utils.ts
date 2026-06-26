export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDateTime(dateStr: string) {
  return `${formatDate(dateStr)} ${formatTime(dateStr)}`
}