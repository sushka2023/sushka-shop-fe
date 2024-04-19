import { Box, Button, Grid, Paper, Typography, styled } from '@mui/material'
import { stH3, stP } from '../../auth/style'
import AddIcon from '@mui/icons-material/Add'
import IconNovaPoshta from '../../../icons/novaPoshta.svg?react'
import IconUkrPoshta from '../../../icons/ukrPoshta.svg?react'
// import IconPen from '../../../icons/pen.svg?react'
import CreateIcon from '@mui/icons-material/Create'
export const DeliveryAddress = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))
  return (
    <Box>
      {/* <Box>
            <CustomSnackbar
               handleClose={handleCloseSnackbar}
               snackbarData={snackbarData}
            />
         </Box> */}
      <Box>
        <Typography variant="h3" sx={stH3}>
          Ваші адреси доставки
        </Typography>
        <Typography variant="body1" sx={stP}>
          Тут ви можете змінити ваші дані
        </Typography>
      </Box>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid sx={{ width: '100%' }} item xs={12} md={6} lg={3}>
          <Item
            sx={{
              width: 300,
              height: 180,
              boxShadow: 'none',
              borderRadius: 5,
              padding: 0
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#567343',
                padding: 2
              }}
            >
              <IconNovaPoshta style={{ margin: '10px 20px 10px 10px' }} />
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
          <Button
            variant="outlined"
            type="button"
            endIcon={<CreateIcon />}
            sx={{
              width: 300,
              height: 50,
              borderRadius: 2.5,
              color: '#FFFFFF',
              backgroundColor: '#FCC812',
              border: 'transparent',
              cursor: 'pointer',
              marginTop: 2.5,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Open Sans',
              boxShadow: 'none',
              [`&:hover`]: {
                backgroundColor: '#FFFFFF',
                color: '#FCC812',
                border: '2px solid rgba(252, 200, 18, 0.8)',
                boxShadow: 'none'
              }
            }}
          >
            Редагувати
          </Button>
        </Grid>

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
          <Button
            variant="outlined"
            type="button"
            endIcon={<CreateIcon />}
            sx={{
              width: 300,
              height: 50,
              borderRadius: 2.5,
              color: '#FFFFFF',
              backgroundColor: '#FCC812',
              border: 'transparent',
              cursor: 'pointer',
              marginTop: 2.5,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Open Sans',
              boxShadow: 'none',
              [`&:hover`]: {
                backgroundColor: '#FFFFFF',
                color: '#FCC812',
                border: '2px solid rgba(252, 200, 18, 0.8)',
                boxShadow: 'none'
              }
            }}
          >
            Редагувати
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Item
            sx={{
              width: 222,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#567343',
              cursor: 'pointer',
              borderRadius: 7,
              boxShadow: 'none'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Open Sans',
                fontWeight: 500,
                fontSize: 20,
                paddingBottom: 0.5,
                paddingRight: 1
              }}
            >
              Додати адресу
            </Typography>
            <AddIcon sx={{ fontSize: 26 }} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
