import { getProductGrams } from '../../helpers/productGrams'

export const formatProductName = (name: string): string => {
  const indexColon = name.indexOf(':')
  return indexColon !== -1 ? name.substring(0, indexColon + 1) : name
}

export const getNameToShow = (name: string): string => {
  return formatProductName(name)
}

export const getFirstImage = (
  images: { image_url: string }[] | undefined
): string | null => {
  return images && images.length > 0 ? images[0].image_url : null
}

export const getSumProductPrice = (price: number, quantity: number): number => {
  return price * quantity
}

export const getSumProductGrams = (
  gramQuantity: number,
  quantity: number
): number => {
  return gramQuantity * quantity
}

export const getProductQuantityText = (quantity: number): string => {
  return `${quantity} ${getProductGrams(quantity)}`
}
