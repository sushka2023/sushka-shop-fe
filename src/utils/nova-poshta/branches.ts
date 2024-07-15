export type WarehouseType = {
  id: string
  address_warehouse: string
}

export const generateOptionsData = (
  warehouses: WarehouseType[]
): { label: string; id: string }[] => {
  const MAX_LENGTH = 50
  return warehouses.map((warehouse) => ({
    label:
      warehouse.address_warehouse
        .replace(/\(до 30 кг на одне місце\)/g, '')
        .replace(/\(до 30 кг\)/g, '')
        .replace(/\(до 10 кг\)/g, '')
        .replace(/\(до 5 кг\)/g, '')
        .replace(/\(до 200 кг\)/g, '')
        .replace(/\(до 1100 кг \)/g, '')
        .replace(/\n/g, '')
        .replace(/№(\d+)\s*:/g, '№$1:')
        .trim()
        .slice(0, MAX_LENGTH) +
      (warehouse.address_warehouse.length > MAX_LENGTH ? '...' : ''),
    id: warehouse.id.toString()
  }))
}
