export type OrderDetailsType = {
  tag: string
  value: string | undefined
}

export enum OrderDetailsKey {
  CLIENT_INFO = 'CLIENT_INFO',
  DETAILS_INFO = 'DETAILS_INFO',
  DELIVERY_INFO = 'DELIVERY_INFO'
}

export enum PostType {
  nova_poshta_warehouse = 'Відділення',
  nova_poshta_address = 'Адресна',
  ukr_poshta = 'Укр пошта'
}
