import { FC, Fragment, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { Button } from '../../UI/Button'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { stCard, stDeleteBtn } from './style'
import { ModalCustomFormRadius } from '../../Modal-custom-btn/ModalCustomFormRadius'
import { useAuth } from '../../../hooks/use-auth'
import { AddressDetails } from './AddressDetails'

export type AddressDetailsType = {
  id: number
  address_warehouse?: string
  area?: string
  region: string
  city: string
  post_code?: string
  street?: string
  house_number?: string
  floor?: number
  apartment_number?: string
}

interface NovaPoshtaDataResponse
  extends Pick<
    AddressDetailsType,
    | 'id'
    | 'address_warehouse'
    | 'city'
    | 'post_code'
    | 'street'
    | 'house_number'
    | 'floor'
    | 'apartment_number'
  > {}

interface UkrPoshtaResponse
  extends Pick<
    AddressDetailsType,
    | 'id'
    | 'apartment_number'
    | 'city'
    | 'post_code'
    | 'street'
    | 'region'
    | 'house_number'
  > {}

export const CardRenderer: FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const { user } = useAuth()

  const addressUser: (NovaPoshtaDataResponse | UkrPoshtaResponse)[] = [
    ...(user?.posts?.nova_poshta ?? []),
    ...(user?.posts?.ukr_poshta ?? [])
  ]

  const getCleanedAddress = (addressWarehouse?: string) =>
    addressWarehouse ? addressWarehouse.replace(/"Нова Пошта"/g, '') : ''

  return (
    <Fragment>
      <Box sx={{ width: { xs: '100%', sm: '60%', md: '100%' } }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {addressUser.map((elem, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Box sx={stCard}>
                <Button sx={stDeleteBtn}>
                  <DeleteOutlineIcon sx={{ width: '20px', height: '20px' }} />
                </Button>
                <Box>
                  <AddressDetails
                    address={elem as AddressDetailsType}
                    cleanedAddress={getCleanedAddress(
                      'address_warehouse' in elem ? elem.address_warehouse : ''
                    )}
                  />
                </Box>
              </Box>
              <Button
                sx={{ padding: '10px 30px' }}
                fullWidth
                variant="contained"
                onClick={() => setOpenModal(true)}
              >
                редагувати
              </Button>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={3}>
            <Button
              onClick={() => setOpenModal(true)}
              sx={{ padding: '10px 30px', backgroundColor: '#FFFFFF', mt: 2 }}
              fullWidth
              variant="text"
            >
              додати адресу
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ModalCustomFormRadius
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </Fragment>
  )
}
