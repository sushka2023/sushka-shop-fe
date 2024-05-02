import { Box, Button, Grid, Typography } from '@mui/material'
import { stH3, stP } from '../../auth/style'
import AddIcon from '@mui/icons-material/Add'
import IconNovaPoshta from '../../../icons/novaPoshta.svg?react'
import IconUkrPoshta from '../../../icons/ukrPoshta.svg?react'
import CreateIcon from '@mui/icons-material/Create'
import InfoConfirmationModal from '../../Modal-custom-btn/ModalCustomWindow'
import { useEffect, useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Item, stBtnEdit } from '../../AddressForm/style'
import AddressForm from '../../AddressForm/AddressForm'
import {
  stBtn,
  stContainerAddress,
  stDeleteIcon,
  stIconM,
  stItem,
  stTypographyBody1,
  stTypographyBody1Address,
  stTypographyBody2,
  stTypographyBody2Address
} from '../style'
import axiosInstance from '../../../axios/settings'

type AddressInfo = {
  icon: JSX.Element | undefined
  text: string | undefined
  addressHeadline: string | undefined
  location?: string
  titleAddress?: string
}

type AddressItem = {
  id: number
  address_warehouse: string | null
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
  const { type, addressType, source } = event
  let icon
  let text
  let addressHeadline
  let location
  let titleAddress

  switch (source) {
    case 'nova_poshta':
      icon = <IconNovaPoshta style={stIconM} />
      text = `${type}`
      addressHeadline = 'Нова пошта'
      break
    case 'ukr_poshta':
      icon = <IconUkrPoshta style={stIconM} />
      text = `${type}`
      addressHeadline = 'Укрпошта'
      location = `Відділення`
      titleAddress = `${event.city}, ${event.street}, ${event.region}, ${event.post_code}, буд.${event.house_number}, кв.${event.apartment_number}`
      break
    default:
      break
  }

  if (addressType === 'адреса') {
    location = 'Адреса'
    titleAddress = `${event.city}, ${event.street}, буд.${event.house_number}, кв.${event.apartment_number}`
  } else if (addressType === 'відділення') {
    location = 'Відділення'
    titleAddress = `Відділення ${event.address_warehouse}, ${event.city}`
  }

  return { icon, text, addressHeadline, location, titleAddress }
}

export const DeliveryAddress = () => {
  const [openModal, setOpenModal] = useState(false)
  const [deliveryAddresses, setDeliveryAddresses] = useState({
    nova_poshta: [],
    ukr_poshta: []
  })

  const handleDeleteClick = (id: number, source: string) => {
    console.log('✌️source --->', source)
    console.log('✌️id --->', id)
    let url = ''
    let dataId = {}

    try {
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
          axiosInstance
            .get('/api/posts/my-post-offices')
            .then((response) => {
              setDeliveryAddresses(response.data)
            })
            .catch((error) => {
              console.error('Error', error)
            })
        })
        .catch((error) => {
          console.error('Error', error)
        })
    } catch (error) {
      console.error('Error', error)
    }
  }

  useEffect(() => {
    axiosInstance
      .get('/api/posts/my-post-offices')
      .then((response) => {
        setDeliveryAddresses(response.data)
      })
      .catch((error) => {
        console.error('Error', error)
      })
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
  console.log('✌️addressData --->', addressData)

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

        <Grid item xs={12} md={6} lg={3}>
          <Button onClick={() => setOpenModal(true)} sx={stBtn}>
            Додати адресу
            <AddIcon sx={{ fontSize: 26 }} />
          </Button>
        </Grid>
        <InfoConfirmationModal
          yourStBoxModalWindow={{ alignItems: 'start', paddingLeft: 6 }}
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <Typography
            variant="h3"
            sx={{ fontFamily: 'Comfortaa', fontWeight: 500, fontSize: 32 }}
          >
            Додати нову адресу
          </Typography>
          <Typography variant="body2" sx={stTypographyBody2}>
            Ми збережемо введені дані, щоб оформлення <br /> Вашого наступного
            замовлення було швидшим.
          </Typography>
          <AddressForm />
        </InfoConfirmationModal>
      </Grid>
    </Box>
  )
}
