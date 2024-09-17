import { ProductStatus, ProductStatusDropDown } from '../types'
export const statusMappingEn: {
  [key in ProductStatusDropDown]: ProductStatus
} = {
  Новий: ProductStatus.NEW,
  Активний: ProductStatus.ACTIVATED,
  Архівований: ProductStatus.ARCHIVED
}

export const statusMappingUa: { [key in ProductStatus]: string } = {
  [ProductStatus.NEW]: 'Новий',
  [ProductStatus.ACTIVATED]: 'Активний',
  [ProductStatus.ARCHIVED]: 'Архівований'
}
