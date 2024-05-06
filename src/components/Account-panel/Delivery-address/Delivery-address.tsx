import { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Item, stBtnEdit } from '../../AddressForm/style'
import AddIcon from '@mui/icons-material/Add'
import {
  stBtn,
  stContainerAddress,
  stDeleteIcon,
  stItem,
  stTypographyBody1,
  stTypographyBody1Address,
  stTypographyBody2Address
} from '../style'
import { stH3, stP } from '../../auth/style'
import axiosInstance from '../../../axios/settings'
import fetchDataMyPostOffices from './fatchDataPostOffices'
import {
  CustomSnackbar,
  ISnackbarData
} from '../../SnackebarCustom/SnackbarCustom'
import { ModalCustomBtnAddAddress } from '../../Modal-custom-btn/ModalCustomBtnAddAddress'
import { getAddressTextAndIcon } from './getAddressTextAndIcon'

export type AddressItem = {
  id: number
  address_warehouse: string
  serviceType: string
  type: string
  addressType: string
  source: string
  city: string
  street: string
  post_code: string
  house_number: string
  region: string
  apartment_number: string
}

type AddressArray = AddressItem[]

export const DeliveryAddress = () => {
  const [deliveryAddresses, setDeliveryAddresses] = useState({
    nova_poshta: [],
    ukr_poshta: []
  })
  const [snackbarData, setSnackbarData] = useState<ISnackbarData>({
    open: false,
    error: false
  })

  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleCloseSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: false })
  }
  const handleDeleteClick = (id: number, source: string) => {
    const url =
      source === 'nova_poshta'
        ? '/api/posts/remove_nova_poshta_data'
        : source === 'ukr_poshta'
          ? '/api/posts/remove_ukr_postal_office'
          : ''

    const dataId =
      source === 'nova_poshta'
        ? { nova_poshta_id: id }
        : source === 'ukr_poshta'
          ? { ukr_poshta_id: id }
          : {}

    axiosInstance
      .delete(url, { data: dataId })
      .then(() => {
        fetchDataMyPostOffices(setDeliveryAddresses)
        setSnackbarData({
          open: true,
          error: false,
          message: 'Ваші зміни видалено!'
        })
      })
      .catch((error) => {
        console.error('Error', error)
        setSnackbarData({ open: true, error: true, message: 'Сталась помилка' })
      })
  }

  useEffect(() => {
    fetchDataMyPostOffices(setDeliveryAddresses)
  }, [])

  const novaPoshtaArray: AddressArray =
    deliveryAddresses.nova_poshta.map((item: AddressItem) => ({
      ...item,
      source: 'nova_poshta',
      addressType: item.address_warehouse ? 'відділення' : 'адреса'
    })) || []
  const ukrPoshtaArray: AddressArray =
    deliveryAddresses.ukr_poshta.map((item: AddressItem) => ({
      ...item,
      source: 'ukr_poshta'
    })) || []
  const addressData = [...novaPoshtaArray, ...ukrPoshtaArray]

  const limitedItems = () => {
    return addressData.length === 3 ? true : false
  }

  return (
    <Box>
      <Box>
        <Typography variant="h3" sx={stH3}>
          Ваші адреси доставки
        </Typography>
        <Typography variant="body1" sx={stP}>
          Тут ви можете змінити ваші дані
        </Typography>
      </Box>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        {addressData.map((event, index) => {
          const { icon, addressHeadline, location, titleAddress } =
            getAddressTextAndIcon(event)
          const uniqueKey =
            event.serviceType === 'нова пошта'
              ? `np_${event.id}_${index}`
              : `up_${event.id}_${index}`

          return (
            <Grid key={uniqueKey} item xs={12} md={6} lg={3}>
              <Item sx={stItem}>
                <Box
                  sx={{ position: 'relative', cursor: 'pointer' }}
                  onClick={() => handleDeleteClick(event.id, event.source)}
                >
                  <DeleteOutlineIcon sx={stDeleteIcon} />
                </Box>
                <Box sx={stContainerAddress}>
                  {icon}
                  <Box>
                    <Typography variant="body1" sx={stTypographyBody1Address}>
                      {addressHeadline}
                    </Typography>
                    <Typography variant="body2" sx={stTypographyBody2Address}>
                      {location}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={stTypographyBody1}>
                  {titleAddress}
                </Typography>
              </Item>
              <Button
                variant="outlined"
                type="button"
                onClick={() => setOpenModal(true)}
                endIcon={<CreateIcon />}
                sx={stBtnEdit}
              >
                Редагувати
              </Button>
            </Grid>
          )
        })}
        <Grid item xs={12} md={6} lg={3}>
          <Button
            onClick={() => setOpenModal(true)}
            sx={stBtn}
            disabled={limitedItems()}
          >
            Додати адресу
            <AddIcon sx={{ fontSize: 26 }} />
          </Button>
          {limitedItems() && (
            <Typography variant="body1">
              *Максимальна кількість адрес.
              <br />
              Видаліть непотрібну адресу,
              <br />
              щоб додати нову
            </Typography>
          )}
        </Grid>
        <ModalCustomBtnAddAddress
          setDeliveryAddresses={setDeliveryAddresses}
          setSnackbarData={setSnackbarData}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </Grid>
      <Box>
        <CustomSnackbar
          handleClose={handleCloseSnackbar}
          snackbarData={snackbarData}
        />
      </Box>
    </Box>
  )
}
