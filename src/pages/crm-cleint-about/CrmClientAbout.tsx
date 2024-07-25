import { Box, Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import PersonIcon from '@mui/icons-material/Person'

const CrmClientAbout = () => {
  return (
    <Box p="44px 30px 34px 30px" color="illustrations.darker">
      <Box sx={{ display: 'flex', mb: '20px' }}>
        <Typography sx={{ opacity: '0.6', fontWeight: '600' }}>
          Список клієнтів
        </Typography>
        <KeyboardArrowRightIcon />
        <Typography sx={{ fontWeight: '600' }}>Клієнт</Typography>
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
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'inline-block',
                  width: '60px'
                }}
              >
                Ім’я:
              </Typography>
              <Typography variant="caption">Maria Luchenko Yurivna</Typography>
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: 'inline-block',
                  width: '60px'
                }}
              >
                E-mail:
              </Typography>
              <Typography variant="caption">maria23lunc@gmail.com</Typography>
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: 'inline-block',
                  width: '60px'
                }}
              >
                Номер:
              </Typography>
              <Typography variant="caption">+380000000000</Typography>
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
