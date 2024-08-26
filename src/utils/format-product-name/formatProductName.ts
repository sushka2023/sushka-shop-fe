export const formatProductName = (name: string): string => {
  const indexColon = name.indexOf(':')
  return indexColon !== -1 ? name.substring(0, indexColon + 1) : name
}
