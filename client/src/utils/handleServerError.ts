export function handleServerFormError<T extends Record<string, unknown>>(
  error: unknown,
  setError: (field: keyof T, error: { message: string }) => void,
): boolean {
  const serverErrors = (error as any)?.data?.error
  if (!Array.isArray(serverErrors)) return false

  for (const issue of serverErrors) {
    const field = issue.path?.[0] as keyof T
    if (field) {
      setError(field, { message: issue.message })
    }
  }
  return true
}
