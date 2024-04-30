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

type FormValue = {
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

const schema = (selectedValue: string) => {
  return yup.object().shape({
    city_np_office:
      selectedValue === 'np_office'
        ? yup.string().required('оберіть місто')
        : yup.string(),
    separation_np_office:
      selectedValue === 'np_office'
        ? yup.string().required('оберіть поштомат')
        : yup.string(),
    city_np_parcel_locker:
      selectedValue === 'np_parcel_locker'
        ? yup.string().required('оберіть місто')
        : yup.string(),
    box_np_parcel_locker:
      selectedValue === 'np_parcel_locker'
        ? yup.string().required('оберіть поштомат')
        : yup.string(),
    city_np_address: yup.string(),
    street_np_address: yup.string(),
    house_np_address: yup.string(),
    apartment_np_address: yup.string(),
    country_urk: yup.string(),
    region_urk: yup.string(),
    city_urk: yup.string(),
    postalCode_urk: yup.string(),
    street_urk: yup.string(),
    house_urk: yup.string(),
    apartment_urk: yup.string()
  })
}

export const AddressForm = () => {
  const [selectedValue, setSelectedValue] = useState('np_office')
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValue>({
    resolver: yupResolver(schema(selectedValue))
  })

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
              {(errors.city_np_office || errors.separation_np_office) && (
                <p style={{ color: 'red' }}>
                  {`${errors.city_np_office?.message ? errors.city_np_office?.message : ''} ${errors.separation_np_office?.message ? errors.separation_np_office?.message : ''}`}
                </p>
              )}
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
          )}

          <FormControlLabel
            value="np_parcel_locker"
            control={<BpRadio />}
            label="Нова пошта (поштомат)"
          />
          {selectedValue === 'np_parcel_locker' && (
            <React.Fragment>
              {(errors.city_np_parcel_locker ||
                errors.box_np_parcel_locker) && (
                <p style={{ color: 'red' }}>
                  {`${errors.city_np_parcel_locker?.message ? errors.city_np_parcel_locker?.message : ''} ${errors.box_np_parcel_locker?.message ? errors.box_np_parcel_locker?.message : ''}`}
                </p>
              )}
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
