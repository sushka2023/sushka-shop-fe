export const gramsToKilograms = (grams: string) => {
  const gramsAsNumber = parseFloat(grams)

  const kilograms =
    gramsAsNumber >= 1000
      ? Math.round(gramsAsNumber / 1000) + 'кг'
      : gramsAsNumber

  return kilograms
}
