import { Dispatch, SetStateAction } from 'react'
import axiosInstance from '../../../axios/settings'
import { NpPoshtaAddress, UkrPoshtaAddress } from './Delivery-address'

export type PostOfficesData = {
  nova_poshta: NpPoshtaAddress[]
  ukr_poshta: UkrPoshtaAddress[]
}

const fetchDataMyPostOffices = (
  setDeliveryAddresses: Dispatch<SetStateAction<PostOfficesData>>
) => {
  axiosInstance
    .get<PostOfficesData>('/api/posts/my-post-offices')
    .then((response) => {
      setDeliveryAddresses(response.data)
    })
    .catch((error) => {
      console.error('Error', error)
    })
}

export default fetchDataMyPostOffices
