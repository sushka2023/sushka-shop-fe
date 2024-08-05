import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Box } from '@mui/material'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedRole, setSelectedRole] = React.useState<string>('Змінити роль')
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (role: string) => {
    setSelectedRole(role)
    console.log('Selected role:', role)
    handleClose()
  }

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {selectedRole}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick('Адміністратор')}>
          Адміністратор
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Модератор')}>
          Модератор
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Користувач')}>
          Користувач
        </MenuItem>
      </Menu>
    </Box>
  )
}
