import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioProps
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { BpCheckedIcon, BpIcon } from './style'
import CustomAutocomplete from '../auth/AutocompleteSelect/AutocompleteSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type FormValue = Partial<{
  city_np_office: string | null
  separation_np_office: string | null
  city_np_parcel_locker: string | null
  box_np_parcel_locker: string | null
  city_np_address: string | null
  street_np_address: string | null
  house_np_address: string | null
  apartment_np_address: string | null
  country_urk: string | null
  region_urk: string | null
  city_urk: string | null
  postalCode_urk: string | null
  street_urk: string | null
  house_urk: string | null
  apartment_urk: string | null
}>

function BpRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      icon={<BpIcon />}
      checkedIcon={<BpCheckedIcon />}
      {...props}
    />
  )
}

const allOffice = [{ office: '#1' }, { office: '#2' }, { office: '#3' }]

const allCity = [
  { city: 'Rivne' },
  { city: 'Lviv' },
  { city: 'Kiev' },
  { city: 'Dnipro' }
]

const schema = yup.object().shape({
  city_np_office: yup.string().nullable(),
  separation_np_office: yup.string().nullable(),
  city_np_parcel_locker: yup.string().nullable(),
  box_np_parcel_locker: yup.string().nullable(),
  city_np_address: yup.string().nullable(),
  street_np_address: yup.string().nullable(),
  house_np_address: yup.string().nullable(),
  apartment_np_address: yup.string().nullable(),
  country_urk: yup.string().nullable(),
  region_urk: yup.string().nullable(),
  city_urk: yup.string().nullable(),
  postalCode_urk: yup.string().nullable(),
  street_urk: yup.string().nullable(),
  house_urk: yup.string().nullable(),
  apartment_urk: yup.string().nullable()
})

export const AddressForm = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormValue>({
    resolver: yupResolver(schema)
  })

  const [selectedValue, setSelectedValue] = useState('np_office')

  const onSubmit = (data: FormValue) => {
    console.log('Selected Radio Value:', selectedValue)
    console.log('Form Data:', data)
    let dataResout
    switch (selectedValue) {
      case 'np_office': {
        dataResout = {
          city: data.city_np_office,
          address_warehouse: data.separation_np_office
        }
        console.log('✌️dataResout --->', dataResout)
        break
      }
      case 'np_parcel_locker': {
        dataResout = {
          city: data.city_np_parcel_locker,
          address_warehouse: data.box_np_parcel_locker
        }
        console.log('✌️dataResoutParcelLocer --->', dataResout)
        break
      }
      case 'np_address': {
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
        break
      }
      case 'ukr_post': {
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
        break
      }
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <RadioGroup
          name="value"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <FormControlLabel
            value="np_office"
            control={<BpRadio />}
            label="Нова пошта (відділення)"
          />
          {selectedValue === 'np_office' && (
            <React.Fragment>
              <CustomAutocomplete
                type="city"
                value={watch('city_np_office')}
                onChange={(newValue) => setValue('city_np_office', newValue)}
                options={allCity} // Передаємо опції для міст
              />

              <CustomAutocomplete
                type="office"
                value={watch('separation_np_office')}
                onChange={(newValue) =>
                  setValue('separation_np_office', newValue)
                }
                options={allOffice}
              />
            </React.Fragment>
          )}

          <FormControlLabel
            value="np_parcel_locker"
            control={<BpRadio />}
            label="Нова пошта (поштомат)"
          />
          {selectedValue === 'np_parcel_locker' && (
            <React.Fragment>
              <CustomAutocomplete
                type="city"
                value={watch('city_np_parcel_locker')}
                onChange={(newValue) =>
                  setValue('city_np_parcel_locker', newValue)
                }
                options={allCity}
              />

              <CustomAutocomplete
                type="office"
                value={watch('box_np_parcel_locker')}
                onChange={(newValue) =>
                  setValue('box_np_parcel_locker', newValue)
                }
                options={allOffice}
              />
            </React.Fragment>
          )}

          <FormControlLabel
            value="np_address"
            control={<BpRadio />}
            label="Нова пошта (адресна)"
          />
          {selectedValue === 'np_address' && (
            <React.Fragment>
              <CustomAutocomplete
                type="city"
                value={watch('city_np_address')}
                onChange={(newValue) => setValue('city_np_address', newValue)}
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
          )}

          <FormControlLabel
            value="ukr_post"
            control={<BpRadio />}
            label="Укрпошта"
          />
          {selectedValue === 'ukr_post' && (
            <React.Fragment>
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
          )}
        </RadioGroup>
        <Button type="submit" variant="contained">
          ЗБЕРЕГТИ
        </Button>
      </FormControl>
    </React.Fragment>
  )
}
