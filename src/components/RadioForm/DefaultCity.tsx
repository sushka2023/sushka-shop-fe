import { Box, Typography } from '@mui/material'
import { FC } from 'react'

type DefaultCityProps = {
  setDefaultCity: (city: string) => void
}
export const cityStaticArray = [
  'Київ',
  'Львів',
  'Одеса',
  'Дніпро',
  'Харків',
  'Рівне'
]

export const DefaultCity: FC<DefaultCityProps> = ({ setDefaultCity }) => {
  const handleCity = (cityName: string) => {
    setDefaultCity(cityName)
  }

  return (
    <Box>
      {cityStaticArray.map((cityName, index) => (
        <Typography
          onClick={() => handleCity(cityName)}
          component="span"
          key={index}
          sx={{
            m: 2,
            color: '#5D5FEF',
            borderBottom: '1px solid #5D5FEF',
            cursor: 'pointer'
          }}
        >
          {cityName}
        </Typography>
      ))}
    </Box>
  )
}
