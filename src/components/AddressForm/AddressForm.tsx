import React, { useState } from 'react'
import { Box, Button, FormControl } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddAddressSchema } from '../auth/validation'
import FormRadioGroup from './FormRadioGroup'
import { ErrorMessages } from './ErrorMessage'
import CustomAutocomplete from '../auth/AutocompleteSelect/AutocompleteSelect'
import axiosInstance from '../../axios/settings'

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

const allOffice = [{ office: '#1' }, { office: '#2' }, { office: '#3' }]
const allCity = [
  { city: 'Rivne' },
  { city: 'Lviv' },
  { city: 'Kiev' },
  { city: 'Dnipro' }
]

export const AddressForm: React.FC = () => {
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
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const renderFormFields = () => {
    switch (selectedValue) {
      case 'np_office':
        return (
          <React.Fragment>
            <ErrorMessages
              errors={errors}
              fields={['city_np_office', 'separation_np_office']}
            />
            <CustomAutocomplete
              type="city"
              value={watch('city_np_office')}
              onChange={(newValue) =>
                setValue('city_np_office', newValue || undefined)
              }
              options={allCity}
            />
            <CustomAutocomplete
              type="office"
              value={watch('separation_np_office')}
              onChange={(newValue) =>
                setValue('separation_np_office', newValue || undefined)
              }
              options={allOffice}
            />
          </React.Fragment>
        )
      case 'np_parcel_locker':
        return (
          <React.Fragment>
            <ErrorMessages
              errors={errors}
              fields={['city_np_parcel_locker', 'box_np_parcel_locker']}
            />

            <CustomAutocomplete
              type="city"
              value={watch('city_np_parcel_locker')}
              onChange={(newValue) =>
                setValue('city_np_parcel_locker', newValue || undefined)
              }
              options={allCity}
            />
            <CustomAutocomplete
              type="office"
              value={watch('box_np_parcel_locker')}
              onChange={(newValue) =>
                setValue('box_np_parcel_locker', newValue || undefined)
              }
              options={allOffice}
            />
          </React.Fragment>
        )
      case 'np_address':
        return (
          <React.Fragment>
            <ErrorMessages
              errors={errors}
              fields={[
                'city_np_address',
                'street_np_address',
                'house_np_address'
              ]}
            />

            <CustomAutocomplete
              type="city"
              value={watch('city_np_address')}
              onChange={(newValue) =>
                setValue('city_np_address', newValue || undefined)
              }
              options={allCity}
            />
            <input defaultValue="test" {...register('street_np_address')} />
            <Box sx={{ display: 'flex', gap: 3 }}>
              <input defaultValue="test" {...register('house_np_address')} />
              <input
                defaultValue="test"
                {...register('apartment_np_address')}
              />
            </Box>
          </React.Fragment>
        )
      case 'ukr_post':
        return (
          <React.Fragment>
            <ErrorMessages
              errors={errors}
              fields={[
                'region_urk',
                'city_urk',
                'postalCode_urk',
                'street_urk',
                'house_urk'
              ]}
            />

            <input
              defaultValue="Ukraine"
              disabled
              {...register('country_urk')}
            />
            <input placeholder="region_urk" {...register('region_urk')} />
            <input placeholder="city_urk" {...register('city_urk')} />
            <input
              placeholder="postalCode_urk"
              {...register('postalCode_urk')}
            />
            <input placeholder="street_urk" {...register('street_urk')} />
            <Box sx={{ display: 'flex', gap: 3 }}>
              <input placeholder="house_urk" {...register('house_urk')} />
              <input
                placeholder="apartment_urk"
                {...register('apartment_urk')}
              />
            </Box>
          </React.Fragment>
        )
      default:
        return null
    }
  }

  return (
    <React.Fragment>
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormRadioGroup
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          renderFormFields={renderFormFields}
        />
        <Button type="submit" variant="contained">
          ЗБЕРЕГТИ
        </Button>
      </FormControl>
    </React.Fragment>
  )
}

export default AddressForm
