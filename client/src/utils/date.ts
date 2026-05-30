const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatDate(iso: string, uppercase = false) {
  const d = new Date(iso)
  const month = uppercase ? MONTHS[d.getMonth()].toUpperCase() : MONTHS[d.getMonth()]
  return `${month} ${d.getDate()}, ${d.getFullYear()}`
}
