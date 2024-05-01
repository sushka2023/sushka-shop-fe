import { Box, Button, Grid, Typography } from '@mui/material'
import { stH3, stP } from '../../auth/style'
import AddIcon from '@mui/icons-material/Add'
import IconNovaPoshta from '../../../icons/novaPoshta.svg?react'
import IconUkrPoshta from '../../../icons/ukrPoshta.svg?react'
import CreateIcon from '@mui/icons-material/Create'
import InfoConfirmationModal from '../../Modal-custom-btn/ModalCustomWindow'
import { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Item, stBtnEdit } from '../../AddressForm/style'

export const DeliveryAddress = () => {
  const [openModal, setOpenModal] = useState(false)

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
        <Grid item xs={12} md={6} lg={3}>
          <Item
            sx={{
              width: 300,
              height: 180,
              boxShadow: 'none',
              borderRadius: 5,
              padding: 0
            }}
          >
            <Box sx={{ position: 'relative', cursor: 'pointer' }}>
              <DeleteOutlineIcon
                sx={{
                  position: 'absolute',
                  top: -14,
                  right: -14,
                  width: 25,
                  height: 25,
                  backgroundColor: '#FED9DD',
                  borderRadius: 20,
                  padding: 1,
                  color: '#D21C1C'
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#567343',
                padding: 2
              }}
            >
              <IconUkrPoshta style={{ margin: '10px 20px 10px 10px' }} />
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: 22,
                    fontWeight: 600,
                    fontFamily: 'Open Sans'
                  }}
                >
                  Нова пошта
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 16,
                    fontFamily: 'Open Sans',
                    textAlign: 'start',
                    fontWeight: 400
                  }}
                >
                  Адресна
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: 16,
                fontWeight: 400,
                fontFamily: 'Open Sans',
                color: '#567343',
                textAlign: 'start',
                margin: '0 15px'
              }}
            >
              Київ, Київська область, Героїв Небесної сотні 25, кв.10
            </Typography>
          </Item>
          <IconNovaPoshta />
          <Button
            variant="outlined"
            type="button"
            endIcon={<CreateIcon />}
            sx={stBtnEdit}
          >
            Редагувати
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Button
            onClick={() => setOpenModal(true)}
            sx={{
              width: 222,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#567343',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              borderRadius: 5,
              boxShadow: 'none',
              fontFamily: 'Open Sans',
              fontWeight: 400,
              fontSize: 18,
              paddingRight: 1,
              [`&:hover`]: {
                backgroundColor: '#FFFFFF',
                color: '#9AAB8E',
                boxShadow: 'none'
              }
            }}
          >
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
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Open Sans',
              fontWeight: 400,
              fontSize: 18,
              margin: '20px 0 45px 0'
            }}
          >
            Ми збережемо введені дані, щоб оформлення <br /> Вашого наступного
            замовлення було швидшим.
          </Typography>
        </InfoConfirmationModal>
      </Grid>
    </Box>
  )
}
