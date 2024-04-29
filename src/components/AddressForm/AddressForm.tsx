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
import { BpIcon } from './style'
import CustomAutocomplete from '../auth/AutocompleteSelect/AutocompleteSelect'

export type FormValue = {
  value: string
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
}

function BpRadio(props: RadioProps) {
  return <Radio disableRipple color="default" icon={<BpIcon />} {...props} />
}

const allOffice = [{ office: '#1' }, { office: '#2' }, { office: '#3' }]

const allCity = [
  { city: 'Rivne' },
  { city: 'Lviv' },
  { city: 'Kiev' },
  { city: 'Dnipro' }
]

export const AddressForm = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormValue>()
  const [selectedValue, setSelectedValue] = useState('np-office')

  const onSubmit = (data: FormValue) => {
    console.log('Selected Radio Value:', selectedValue)
    console.log('Form Data:', data)
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
            value="np-office"
            control={<BpRadio />}
            label="Нова пошта (відділення)"
          />
          {selectedValue === 'np-office' && (
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
            value="np-parcel-locker"
            control={<BpRadio />}
            label="Нова пошта (поштомат)"
          />
          {selectedValue === 'np-parcel-locker' && (
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
            value="np-address"
            control={<BpRadio />}
            label="Нова пошта (адресна)"
          />
          {selectedValue === 'np-address' && (
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
            value="ukr-post"
            control={<BpRadio />}
            label="Укрпошта"
          />
          {selectedValue === 'ukr-post' && (
            <React.Fragment>
              <input
                defaultValue="test"
                disabled
                {...register('country_urk')}
              />
              <input defaultValue="test" {...register('region_urk')} />
              <input defaultValue="test" {...register('city_urk')} />
              <input defaultValue="test" {...register('postalCode_urk')} />
              <input defaultValue="test" {...register('street_urk')} />

              <Box sx={{ display: 'flex', gap: 3 }}>
                <input defaultValue="test" {...register('house_urk')} />
                <input defaultValue="test" {...register('apartment_urk')} />
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
