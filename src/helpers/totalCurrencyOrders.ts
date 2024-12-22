export const formatCurrency = (
  amount: number | null,
  locale: string = 'uk-UA',
  currency: string = 'UAH'
): string => {
  if (amount === null) return '₴0'
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    amount
  )
}
