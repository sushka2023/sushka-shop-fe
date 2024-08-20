import { Fragment, ChangeEvent, useContext } from 'react'
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormHelperText
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { Typography } from '../../components/UI/Typography'
import { useAuth } from '../../hooks/use-auth'
import { AdressesCard } from './AdressesCard'
import { newAdressBtnStyle, radioStyle } from './style'
import { OrderContext } from '../../pages/order-page'
import { NovaPoshtaDataResponse } from '../../types'

const UserAddress = () => {
  const { user } = useAuth()
  const npAddresses = user?.posts.nova_poshta

  const {
    isOpenModal,
    setIsOpenModal,
    setValue,
    control,
    address,
    setAddress,
    errors
  } = useContext(OrderContext)

  const handleChange = (
    _: ChangeEvent<HTMLInputElement>,
    address: NovaPoshtaDataResponse
  ) => {
    setValue('address', address)
    setAddress(address)
  }

  return (
    <Fragment>
      <Box mt={5} mb={4}>
        <Typography
          component="h2"
          fontFamily="Comfortaa"
          fontWeight={500}
          fontSize="32px"
          mb="10px"
        >
          Адреса доставки
        </Typography>
        <Typography fontWeight={400} fontSize="18px">
          Ваші збережені адреси
        </Typography>
      </Box>
      <RadioGroup
        sx={{ marginLeft: '10px', flexDirection: 'row', gap: '25px' }}
      >
        {npAddresses?.map((option) => (
          <Controller
            key={option.id}
            name="address"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={
                  <Radio
                    {...field}
                    checked={option.id === address?.id}
                    onChange={(e) => handleChange(e, option)}
                    sx={radioStyle}
                  />
                }
                label={
                  <AdressesCard
                    option={option}
                    selectedAdressId={address?.id}
                  />
                }
              />
            )}
          />
        ))}
      </RadioGroup>
      <FormHelperText error={!!errors.address}>
        {errors.address?.message}
      </FormHelperText>
      <Button
        onClick={() => setIsOpenModal(!isOpenModal)}
        disabled={npAddresses?.length === 3}
        endIcon={
          npAddresses?.length !== 3 && (
            <Typography
              component="span"
              sx={{ fontSize: '18px', lineHeight: '18px' }}
            >
              +
            </Typography>
          )
        }
        sx={newAdressBtnStyle}
      >
        Ввести нову адресу
      </Button>
    </Fragment>
  )
}

export { UserAddress }
