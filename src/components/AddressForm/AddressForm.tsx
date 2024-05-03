import React, { useState } from 'react'
import { Button, FormControl } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddAddressSchema } from '../auth/validation'
import FormRadioGroup from './FormRadioGroup'
import axiosInstance from '../../axios/settings'
import { renderFormFields } from './renderFormFields'
import fetchDataMyPostOffices from '../Account-panel/Delivery-address/fatchDataPostOffices'
import { ISnackbarData } from '../SnackebarCustom/SnackbarCustom'

export type FormValue = {
  city_np_office?: string
  separation_np_office?: string
  city_np_parcel_locker?: string
  box_np_parcel_locker?: string
  city_np_address?: string
  street_np_address?: string
  house_np_address?: string
  apartment_np_address?: string
  country_urk?: string
  region_urk?: string
  city_urk?: string
  postalCode_urk?: string
  street_urk?: string
  house_urk?: string
  apartment_urk?: string
}
type AddressFormProps = {
  setOpenModal: (value: boolean) => void
  setDeliveryAddresses: React.Dispatch<
    React.SetStateAction<{ nova_poshta: never[]; ukr_poshta: never[] }>
  >
  setSnackbarData: React.Dispatch<React.SetStateAction<ISnackbarData>>
}

const AddressForm: React.FC<AddressFormProps> = ({
  setOpenModal,
  setDeliveryAddresses,
  setSnackbarData
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('np_office')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValue>({
    resolver: yupResolver(AddAddressSchema(selectedValue))
  })

  const onSubmit = (data: FormValue) => {
    let dataResout
    let url = ''
    switch (selectedValue) {
      case 'np_office':
        dataResout = {
          city: data.city_np_office,
          address_warehouse: data.separation_np_office
        }
        console.log('✌️dataResout --->', dataResout)
        url = '/api/posts/create_nova_poshta_warehouse_and_associate_with_post'

        break
      case 'np_parcel_locker':
        dataResout = {
          city: data.city_np_parcel_locker,
          address_warehouse: data.box_np_parcel_locker
        }
        console.log('✌️dataResoutParcelLocer --->', dataResout)
        url = '/api/posts/create_nova_poshta_warehouse_and_associate_with_post'
        break
      case 'np_address':
        dataResout = {
          street: data.street_np_address,
          house_number: data.house_np_address,
          apartment_number: data.apartment_np_address,
          floor: 0,
          city: data.city_np_address,
          region: '',
          area: ''
        }
        console.log('✌️dataResoutAddress --->', dataResout)
        url =
          '/api/posts/create_nova_poshta_address_delivery_and_associate_with_post'

        break
      case 'ukr_post':
        dataResout = {
          street: data.street_urk,
          house_number: data.house_urk,
          apartment_number: data.apartment_urk,
          city: data.city_urk,
          region: data.region_urk,
          country: data.country_urk,
          post_code: data.postalCode_urk
        }
        console.log('✌️dataResoutUkrPost --->', dataResout)
        url = '/api/posts/create_ukr_poshta_and_associate_with_post'

        break
      default:
        break
    }
    axiosInstance
      .post(url, dataResout)
      .then((response) => {
        console.log('Server response:', response)
        setOpenModal(false)
        fetchDataMyPostOffices(setDeliveryAddresses)
        setSnackbarData({
          open: true,
          error: false,
          message: 'Вашу адресу успішно додано!'
        })
      })
      .catch((error) => {
        setSnackbarData({ open: true, error: true, message: 'Сталась помилка' })
        console.error('Error:', error)
      })
  }

  return (
    <React.Fragment>
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormRadioGroup
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          renderFormFields={() =>
            renderFormFields({
              errors,
              selectedValue,
              watch,
              register,
              setValue
            })
          }
        />

        <Button type="submit" variant="contained">
          ЗБЕРЕГТИ
        </Button>
      </FormControl>
    </React.Fragment>
  )
}

export default AddressForm
