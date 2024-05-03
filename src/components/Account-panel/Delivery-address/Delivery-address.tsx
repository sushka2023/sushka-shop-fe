import { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Item, stBtnEdit } from '../../AddressForm/style'
import {
  stContainerAddress,
  stDeleteIcon,
  stIconM,
  stItem,
  stTypographyBody1,
  stTypographyBody1Address,
  stTypographyBody2Address
} from '../style'
import { stH3, stP } from '../../auth/style'
import IconNovaPoshta from '../../../icons/novaPoshta.svg?react'
import IconUkrPoshta from '../../../icons/ukrPoshta.svg?react'
import axiosInstance from '../../../axios/settings'
import fetchDataMyPostOffices from './fatchDataPostOffices'
import {
  CustomSnackbar,
  ISnackbarData
} from '../../SnackebarCustom/SnackbarCustom'
import { ModalCustomBtnAddAddress } from '../../Modal-custom-btn/ModalCustomBtnAddAddress'

type AddressInfo = {
  icon: JSX.Element | undefined
  text: string | undefined
  addressHeadline: string | undefined
  location?: string
  titleAddress?: string
  address_warehouse: string | null | undefined
}

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

const getAddressTextAndIcon = (event: AddressItem): AddressInfo => {
  const {
    type,
    addressType,
    source,
    address_warehouse: addressWarehouse = undefined
  } = event
  let icon
  let addressHeadline
  let location
  let titleAddress

  const setIconAndHeadline = (source: string) => {
    switch (source) {
      case 'nova_poshta':
        icon = <IconNovaPoshta style={stIconM} />
        addressHeadline = 'Нова пошта'
        break
      case 'ukr_poshta':
        icon = <IconUkrPoshta style={stIconM} />
        addressHeadline = 'Укрпошта'
        location = 'Відділення'
        titleAddress = `${event.city}, ${event.street}, ${event.region}, ${event.post_code}, буд.${event.house_number}, кв.${event.apartment_number}`
        break
      default:
        break
    }
  }

  const setLocationAndAddress = () => {
    if (addressType === 'адреса') {
      location = 'Адреса'
      titleAddress = `${event.city}, ${event.street}, буд.${event.house_number}, кв.${event.apartment_number}`
    } else if (addressType === 'відділення') {
      location = determineLocation(addressWarehouse ?? undefined)
      titleAddress = `${location} ${event.address_warehouse}, ${event.city}`
    }
  }

  setIconAndHeadline(source)
  setLocationAndAddress()

  return {
    icon,
    text: type,
    addressHeadline,
    location,
    titleAddress,
    address_warehouse: addressWarehouse
  }
}

const determineLocation = (addressWarehouse?: string): string => {
  if (!addressWarehouse) return ''
  return addressWarehouse.startsWith('#') ? 'Поштомат' : 'Відділення'
}

export const DeliveryAddress = () => {
  const [deliveryAddresses, setDeliveryAddresses] = useState({
    nova_poshta: [],
    ukr_poshta: []
  })
  const [snackbarData, setSnackbarData] = useState<ISnackbarData>({
    open: false,
    error: false
  })
  const handleCloseSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: false })
  }
  const handleDeleteClick = (id: number, source: string) => {
    let url = ''
    let dataId = {}
    if (source === 'nova_poshta') {
      dataId = { nova_poshta_id: id }
      url = '/api/posts/remove_nova_poshta_data'
    } else if (source === 'ukr_poshta') {
      dataId = { ukr_poshta_id: id }
      url = '/api/posts/remove_ukr_postal_office'
    }

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
  }, [setDeliveryAddresses])

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
                endIcon={<CreateIcon sx={{ transform: 'scaleX(-1)' }} />}
                sx={stBtnEdit}
              >
                Редагувати
              </Button>
            </Grid>
          )
        })}

        <ModalCustomBtnAddAddress
          setDeliveryAddresses={setDeliveryAddresses}
          setSnackbarData={setSnackbarData}
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
