import { FC, Fragment, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { Button } from '../../UI/Button'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { stCard, stDeleteBtn } from './style'
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

const accessToken = getToken()
export const CardRenderer: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [openModal, setOpenModal] = useState(false)
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
      dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
    } catch (error) {
      console.error('Помилка видалення адреси:', error)
    }
  }

  const handleDelCard = async (index: number) => {
    const { id, post_code } = addressUser[index]
    const postsId = user?.posts.id

    try {
      await deleteAddress({ id, postCode: post_code, postsId })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Fragment>
      <Box sx={{ width: { xs: '100%', sm: '60%', md: '100%' } }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {addressUser.map((elem, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Box sx={stCard}>
                <Button
                  onClick={() => handleDelCard(index)}
                  sx={stDeleteBtn}
                  endIcon={<DeleteOutlineIcon sx={{ mr: '11px' }} />}
                />
                <AddressDetails
                  address={elem as AddressDetailsType}
                  cleanedAddress={getCleanedAddress(
                    'address_warehouse' in elem ? elem.address_warehouse : ''
                  )}
                />
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
              endIcon={<AddIcon sx={{ width: 25, height: 25 }} />}
              sx={{
                'padding': '10px 30px',
                'backgroundColor': '#FFFFFF',
                'borderRadius': 20,
                'fontWeight': 500,
                'fontSize': 18,
                'mt': 2,
                '&:hover': {
                  backgroundColor: '#FFFFFF',
                  color: '#9AAB8E'
                },
                '&.Mui-disabled': {
                  backgroundColor: '#E8E8E8',
                  color: '#FFFFFF'
                }
              }}
              fullWidth
              variant="text"
              disabled={isAddButtonDisabled()}
            >
              Додати адресу
            </Button>
            {isAddButtonDisabled() && (
              <Typography variant="body1" sx={{ mt: 1 }}>
                *Максимальна кількість адрес. Видаліть непотрібну адресу,
                <br /> щоб додати нову
              </Typography>
            )}
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
