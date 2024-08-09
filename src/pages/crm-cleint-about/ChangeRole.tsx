import styles from './crmClientAbout.module.scss'

import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Box } from '@mui/material'
import { ROLE_TRANSLATIONS } from '../crm-clients-page/CrmTableStickyHead'
import { Role } from '../../types'

const ROLE = ['admin', 'moderator', 'user']

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  // const [selectedRole, setSelectedRole] = React.useState<string>('Змінити роль')
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (role: string) => {
    // setSelectedRole(role)
    console.log('Selected role:', role)
    handleClose()
  }

  return (
    <Box className={styles.changeRole}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Змінити роль
      </Button>
      <Menu
        className={styles.roleMenu}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {ROLE.map((item) => (
          <MenuItem
            onClick={() => handleMenuItemClick(item)}
            key={item}
            className={styles[item]}
          >
            {ROLE_TRANSLATIONS[item as Role]}
          </MenuItem>
        ))}
        {/* <MenuItem onClick={() => handleMenuItemClick('admin')}>
          Адміністратор
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('moderator')}>
          Модератор
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('user')}>
          Користувач
        </MenuItem> */}
      </Menu>
    </Box>
  )
}
