import styles from './crmClientAbout.module.scss'
import { Box, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

const AboutClient = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        borderRadius: '10px',
        p: '30px 20px',
        mb: '30px'
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mb: '40px' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Typography variant="h3">Клієнт #999</Typography>
          <Typography className={styles.user}>Користувач</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
  )
}

export default AboutClient
