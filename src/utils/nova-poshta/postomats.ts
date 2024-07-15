import { WarehouseType } from './branches'

const MAX_LENGTH = 50

export const generateOptionsData = (
  warehouses: WarehouseType[]
): { label: string; id: string }[] => {
  return warehouses.map((warehouse) => ({
    label:
      warehouse.address_warehouse
        .replace(/"Нова Пошта"/g, '')
        .replace(/\n/g, '')
        .replace(/№(\d+)\s*:/g, '№$1:')
        .trim()
        .slice(0, MAX_LENGTH) +
      (warehouse.address_warehouse.length > MAX_LENGTH ? '...' : ''),
    id: warehouse.id.toString()
  }))
}
