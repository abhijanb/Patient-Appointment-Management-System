export function getImageUrl(imagePath: string | null | undefined): string | undefined {
  if (!imagePath) return undefined
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  const serverOrigin = baseUrl.replace(/\/api\/?$/, '')
  return `${serverOrigin}/${imagePath}`
}
