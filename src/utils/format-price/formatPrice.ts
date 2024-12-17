export const formatPrice = (cost: number): string => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
