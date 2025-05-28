export const buildQuery = (params: Record<string, any>): string => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined && value !== ''
    )
  )
  const queryParams = new URLSearchParams({
    ...filteredParams
  })
  return queryParams.toString()
}
