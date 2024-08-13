import styles from './crmClientAbout.module.scss'

import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

import { User } from './CrmClientAbout'
import ChangeRole from './ChangeRole'
import { useAuth } from '../../hooks/use-auth'
import { ROLE_TRANSLATIONS } from '../crm-clients-page/CrmTableStickyHead'
import { Role } from '../../types'
import { aboutRole } from './style'
import InfoClient from './InfoClient'

type AboutClientProps = {
  user: User
}

const AboutClient: React.FC<AboutClientProps> = ({ user }) => {
  const { user: authUser } = useAuth()

  const [userRole, setUserRole] = useState<Role>(user.role)

  return (
    <Box sx={aboutRole}>
      <Box className={styles.changeRoleBlock}>
        <Box className={styles.aboutClientBlock}>
          <Typography variant="h3">Клієнт #{user.id}</Typography>
          <Typography variant="body1" className={styles[userRole]}>
            {ROLE_TRANSLATIONS[userRole]}
          </Typography>
        </Box>
        {authUser && authUser.role === 'admin' && (
          <Box className={styles.aboutClientBlock}>
            <ChangeRole
              user={user}
              userRole={userRole}
              setUserRole={setUserRole}
            />
          </Box>
        )}
      </Box>
      <Box className={styles.clientInfoBlock}>
        <Box>
          <PersonIcon
            fontSize="large"
            sx={{ padding: '25px', color: 'accent.darker' }}
          />
        </Box>
        <Box>
          <InfoClient
            label="Ім’я"
            value={`${user.first_name} ${user.last_name}`}
          />
          <InfoClient label="E-mail" value={user.email} />
          <InfoClient label="Номер" value={user.phone_number} />
        </Box>
      </Box>
    </Box>
  )
}

export default AboutClient
