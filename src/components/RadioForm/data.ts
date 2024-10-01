import { FormValues } from '../Modal-custom-btn/ModalCustomFormRadius'
import { User } from '../Modal-custom-btn/ModalCustomFormRadius'

export const getUrkPoshtaData = (values: FormValues) => ({
  street: values.address,
  house_number: values.house,
  apartment_number: values.apartment ?? '',
  city: values.cityAddress,
  region: values.region,
  country: 'Україна',
  post_code: values.postIndex
})

export const getNovaPoshtaData = (values: FormValues) => ({
  street: values.address,
  house_number: values.house,
  apartment_number: values.apartment ?? '',
  floor: values.floor ?? 0,
  city: values.cityAddress
})

export const getOtherData = (
  values: FormValues,
  selectedValue: string,
  user: User | null
) => ({
  post_id: user?.posts.id,
  nova_poshta_id:
    selectedValue === 'novaPoshtaBranches' ? values.branches : values.postomats
})
