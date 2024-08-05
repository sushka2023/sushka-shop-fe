import styles from './crmClientAbout.module.scss'
import { Box, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { User } from './CrmClientAbout'
import ChangeRole from './ChangeRole'

type AboutClientProps = {
  user: User
}

const AboutClient: React.FC<AboutClientProps> = ({ user }) => {
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
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '40px',
          mb: '40px'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Typography variant="h3">Клієнт #{user.id}</Typography>
          <Typography
            className={styles[user.role]}
            sx={{
              fontWeight: '600',
              borderRadius: '10px',
              padding: '5px 10px'
            }}
          >
            {user.role}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <ChangeRole />
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
              {user.first_name} {user.last_name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '15px', mb: '10px' }}>
            <Typography variant="body1" width="60px">
              E-mail:
            </Typography>
            <Typography variant="body1" color="black.darker">
              {user.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '15px', mb: '10px' }}>
            <Typography variant="body1" width="60px">
              Номер:
            </Typography>
            <Typography variant="body1" color="black.darker">
              {user.phone_number ? user.phone_number : 'номер не вказано'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AboutClient
