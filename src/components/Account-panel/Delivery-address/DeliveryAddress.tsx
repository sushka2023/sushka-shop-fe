import { FC, useState } from 'react'
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
import axiosInstance from '../../../axios/settings'
import { currentUser } from '../../../redux/authentication/operation'
import { getToken } from '../../../utils/cookie/token'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { useSnackbar } from '../../../hooks/useSnackbar'
import { stAddBtn, stCard, stDeleteBtn } from './style'
import { useTheme } from '@mui/material'
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

const deleteAddress = async ({
  id,
  postCode,
  postsId
}: {
  id: number
  postCode?: string
  postsId?: number
}) => {
  const endpoint = postCode
    ? '/api/posts/remove_ukr_postal_office'
    : '/api/posts/remove_nova_poshta_data'

  const requestData = postCode
    ? { ukr_poshta_id: id }
    : { post_id: postsId, nova_poshta_id: id }

  try {
    await axiosInstance.delete(endpoint, { data: requestData })
  } catch (error) {
    console.error('Помилка видалення адреси:', error)
  }
}

const accessToken = getToken()

export const DeliveryAddress: FC = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { showSnackbar } = useSnackbar()
  const dispatch = useDispatch<AppDispatch>()
  const [openModal, setOpenModal] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { user } = useAuth()

  const addressUser: (NovaPoshtaDataResponse | UkrPoshtaResponse)[] = [
    ...(user?.posts?.nova_poshta ?? []),
    ...(user?.posts?.ukr_poshta ?? [])
  ]

  const isAddButtonDisabled = () => {
    return addressUser.length >= 3
  }

  const getCleanedAddress = (addressWarehouse?: string) =>
    addressWarehouse ? addressWarehouse.replace(/"Нова Пошта"/g, '').trim() : ''

  const handleDelCard = async (index: number) => {
    const { id, post_code } = addressUser[index]
    const postsId = user?.posts.id
    setDisabled(true)
    try {
      await deleteAddress({ id, postCode: post_code, postsId })
      showSnackbar({ error: false, message: 'Адреса видалена...' })
      dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
    } catch (error) {
      showSnackbar({ error: false, message: 'Сталась помилка' })
      console.error(error)
    } finally {
      setDisabled(false)
    }
  }

  return (
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
                    onClick={() => handleDelCard(index)}
                  >
                    <IconButton disabled={disabled}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                  <AddressDetails
                    address={elem as AddressDetailsType}
                    cleanedAddress={getCleanedAddress(
                      'address_warehouse' in elem ? elem.address_warehouse : ''
                    )}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={3}>
            <Button
              onClick={() => setOpenModal(true)}
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
                *Максимальна кількість адрес. <br /> Видаліть непотрібну адресу,
                щоб додати нову
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
      <ModalCustomFormRadius
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </Container>
  )
}
