import { Box, Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import PersonIcon from '@mui/icons-material/Person'
// import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axiosInstance from '../../axios/settings'

const CrmClientAbout = () => {
  // const { params: clientId } = useParams()
  // console.log(clientId)

  useEffect(() => {
    const fetchCrmClients = async () => {
      try {
        // const { data } = await axiosInstance.get<any>(`api/users/me`)
        const { data } = await axiosInstance.get<any>(
          `api/users/all_for_crm?limit=1&offset=1`
        )

        console.log('fetchCrmClients  data:', data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCrmClients()
  }, [])

  return (
    <Box p="44px 30px 34px 30px" color="illustrations.darker">
      <Box sx={{ display: 'flex', mb: '20px' }}>
        <Typography variant="body2" sx={{ opacity: '0.6', fontWeight: '600' }}>
          Список клієнтів
        </Typography>
        <KeyboardArrowRightIcon />
        <Typography variant="body2" sx={{ fontWeight: '600' }}>
          Клієнт
        </Typography>
        <KeyboardArrowRightIcon />
      </Box>

      <Box
        sx={{
          backgroundColor: 'background.default',
          borderRadius: '10px',
          p: '30px 20px',
          mb: '30px'
        }}
      >
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px' }}
        >
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Typography variant="h3">Клієнт #999</Typography>
            <Typography>Користувач</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Typography>Змінити роль</Typography>
            <Typography>Зберегти</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px'
            // border: '1px solid black'
          }}
        >
          <Box>
            <PersonIcon
              fontSize="large"
              sx={{ padding: '25px', color: 'accent.darker' }}
            />
          </Box>
          {/* border="1px solid red" */}
          <Box>
            <Box sx={{ display: 'flex', gap: '15px', mb: '10px' }}>
              <Typography variant="body1" width="60px">
                Ім’я:
              </Typography>
              <Typography variant="body1" color="black.darker">
                Maria Luchenko Yurivna
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '15px', mb: '10px' }}>
              <Typography variant="body1" width="60px">
                E-mail:
              </Typography>
              <Typography variant="body1" color="black.darker">
                maria23lunc@gmail.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '15px', mb: '10px' }}>
              <Typography variant="body1" width="60px">
                Номер:
              </Typography>
              <Typography variant="body1" color="black.darker">
                +380000000000
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: 'background.default',
          borderRadius: '10px',
          p: '30px 20px'
        }}
      >
        <Typography variant="h4">Історія замовлень</Typography>
      </Box>
    </Box>
  )
}

export default CrmClientAbout
