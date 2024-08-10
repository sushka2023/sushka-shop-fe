import styles from './crmClientAbout.module.scss'

import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

import { User } from './CrmClientAbout'
import ChangeRole from './ChangeRole'
import { useAuth } from '../../hooks/use-auth'
import { ROLE_TRANSLATIONS } from '../crm-clients-page/CrmTableStickyHead'
import { Role } from '../../types'

type AboutClientProps = {
  user: User
}

const AboutClient: React.FC<AboutClientProps> = ({ user }) => {
  const { user: authUser } = useAuth()

  const [userRole, setUserRole] = useState<Role>(user.role)
  console.log('userRole:', userRole)

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
            className={styles[userRole]}
            sx={{
              fontWeight: '600',
              borderRadius: '10px',
              padding: '5px 10px'
            }}
          >
            {ROLE_TRANSLATIONS[userRole]}
          </Typography>
        </Box>
        {authUser && authUser.role === 'admin' && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <ChangeRole user={user} setUserRole={setUserRole} />
          </Box>
        )}
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
