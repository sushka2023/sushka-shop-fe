export function formatWeight(weight: string): string {
  const numWeight = parseInt(weight, 10)
  if (!isNaN(numWeight)) {
    if (numWeight >= 1000) {
      return `${numWeight / 1000} кг`
    } else {
      return `${numWeight} г`
    }
  } else {
    return 'Невірне значення'
  }
}
