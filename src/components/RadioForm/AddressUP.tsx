import { FC } from 'react'
import { OutlinedInput } from '@mui/material'
import Box from '@mui/material/Box'
import { FormProps } from './RadioForm'
import { ErrorType } from '../Error/Error'
import { ErrorMessage } from '../Error/Error'

const getErrorMessage = (errors: Record<string, ErrorType>): ErrorType => {
  const fields = [
    'region',
    'cityAddress',
    'postIndex',
    'address',
    'house',
    'floor'
  ]
  return fields.map((field) => errors[field]).find(Boolean) || undefined
}

const AddressUP: FC<FormProps> = ({ register, errors }) => {
  const errorMessage = getErrorMessage(errors)

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <ErrorMessage error={errorMessage} styles={{ position: 'relative' }} />
      <OutlinedInput
        sx={{
          'width': '100%',
          'color': 'grey',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
          }
        }}
        placeholder={'Україна'}
        readOnly={true}
      />
      <OutlinedInput
        {...register('region')}
        sx={{
          width: '100%'
        }}
        placeholder={'Введіть область*'}
      />
      <OutlinedInput
        {...register('cityAddress')}
        sx={{
          width: '100%'
        }}
        placeholder={'Введіть місто*'}
      />
      <OutlinedInput
        {...register('postIndex')}
        sx={{
          width: '100%'
        }}
        placeholder={'Введіть індекс*'}
      />
      <OutlinedInput
        {...register('address')}
        sx={{
          width: '100%'
        }}
        placeholder={'Вулиця*'}
      />
      <Box component="div" sx={{ display: 'flex', gap: '15px' }}>
        <OutlinedInput
          {...register('house')}
          sx={{
            width: '100%'
          }}
          placeholder={'Будинок*'}
        />
        <OutlinedInput
          {...register('floor')}
          sx={{
            width: '100%'
          }}
          placeholder={'Квартира'}
        />
      </Box>
    </Box>
  )
}

export default AddressUP
