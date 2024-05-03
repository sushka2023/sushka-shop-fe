import React from 'react'
import { Box } from '@mui/material'
import CustomAutocomplete from '../auth/AutocompleteSelect/AutocompleteSelect'
import { ErrorMessages } from './ErrorMessage'
import { RenderFormFieldsProps } from './FormRadioGroup'

const allOffice = [{ office: '1' }, { office: '2' }, { office: '3' }]
const allCity = [{ city: 'Rivne' }, { city: 'Lviv' }, { city: 'Kiev' }]
const allParcelLocker = [
  { parcelLocker: '#1' },
  { parcelLocker: '#2' },
  { parcelLocker: '#3' }
]

export const renderFormFields: React.FC<RenderFormFieldsProps> = ({
  errors,
  selectedValue,
  watch,
  setValue,
  register
}) => {
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
            type="parcelLocker"
            value={watch('box_np_parcel_locker')}
            onChange={(newValue) =>
              setValue('box_np_parcel_locker', newValue || undefined)
            }
            options={allParcelLocker}
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
            <input defaultValue="test" {...register('apartment_np_address')} />
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

          <input defaultValue="Ukraine" disabled {...register('country_urk')} />
          <input placeholder="region_urk" {...register('region_urk')} />
          <input placeholder="city_urk" {...register('city_urk')} />
          <input placeholder="postalCode_urk" {...register('postalCode_urk')} />
          <input placeholder="street_urk" {...register('street_urk')} />
          <Box sx={{ display: 'flex', gap: 3 }}>
            <input placeholder="house_urk" {...register('house_urk')} />
            <input placeholder="apartment_urk" {...register('apartment_urk')} />
          </Box>
        </React.Fragment>
      )
    default:
      return null
  }
}
