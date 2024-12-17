export const getProductGrams = (count: number) => {
  if (count === 1) return 'штука'
  if (count >= 2 && count <= 4) return 'штуки'
  return 'штук'
}
