import { FC, Fragment, useState } from 'react'
import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useMediaQuery
} from '@mui/material'
import { Button } from '../../UI/Button'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { ModalCustomFormRadius } from '../../Modal-custom-btn/ModalCustomFormRadius'
import { useAuth } from '../../../hooks/use-auth'
import { AddressDetails } from './AddressDetails'
import AddIcon from '@mui/icons-material/Add'
import { Typography } from '../../UI/Typography'
import { stAddBtn, stCard, stDeleteBtn } from './style'
import { useTheme } from '@mui/material'
import { ModalCustomDelete } from '../../Modal-custom-btn/ModalCustomDelete'
import { NovaPoshtaDataResponse, UkrPoshtaResponse } from '../../../types'

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

export const DeliveryAddress: FC = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [openModal, setOpenModal] = useState(false)
  const [openModalDel, setOpenModalDel] = useState(false)
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null)
  const [disabled, setDisabled] = useState(false)
  const { user } = useAuth()

  const handledeleteCard = (index: number) => {
    setOpenModalDel(true)
    setIndexToDelete(index)
  }

  const addressUser: (NovaPoshtaDataResponse | UkrPoshtaResponse)[] = [
    ...(user?.posts?.nova_poshta ?? []),
    ...(user?.posts?.ukr_poshta ?? [])
  ]

  const isAddButtonDisabled = () => {
    return addressUser.length >= 3
  }

  const getCleanedAddress = (addressWarehouse?: string) =>
    addressWarehouse ? addressWarehouse.replace(/"Нова Пошта"/g, '').trim() : ''

  return (
    <Fragment>
      <Container sx={{ pb: 3 }}>
        {!isSmallScreen && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3">Ваші адреси доставки</Typography>
            <Typography variant="body2" sx={{ fontSize: 18 }}>
              Тут ви можете змінити ваші дані
            </Typography>
          </Box>
        )}
        <Box sx={{ width: { xs: '100%', sm: '95%', md: '100%' }, mt: 3 }}>
          <Grid
            container
            rowSpacing={{ xs: 3, md: 4 }}
            columnSpacing={{ xs: 3, md: 4 }}
          >
            {addressUser.map((elem, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'grid', height: '100%' }}>
                  <Box sx={stCard(theme)}>
                    <Tooltip
                      title="Delete"
                      sx={stDeleteBtn(theme)}
                      onClick={() => handledeleteCard(index)}
                    >
                      <IconButton disabled={disabled}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                    <AddressDetails
                      address={elem as AddressDetailsType}
                      cleanedAddress={getCleanedAddress(
                        'address_warehouse' in elem
                          ? elem.address_warehouse
                          : ''
                      )}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={3}>
              <Button
                onClick={() => {
                  setOpenModal(true)
                }}
                endIcon={<AddIcon sx={{ width: 25, height: 25 }} />}
                sx={stAddBtn(theme)}
                fullWidth
                variant="text"
                disabled={isAddButtonDisabled()}
              >
                Додати адресу
              </Button>
              {isAddButtonDisabled() && (
                <Typography variant="body1" sx={{ mt: 1 }}>
                  *Максимальна кількість адрес. <br /> Видаліть непотрібну
                  адресу, щоб додати нову
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ModalCustomFormRadius
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <ModalCustomDelete
        indexToDelete={indexToDelete}
        addressUser={addressUser}
        setDisabled={setDisabled}
        openModalDel={openModalDel}
        setOpenModalDel={setOpenModalDel}
      />
    </Fragment>
  )
}
