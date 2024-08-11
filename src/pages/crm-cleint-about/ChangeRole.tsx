import styles from './crmClientAbout.module.scss'

import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Box, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DoneIcon from '@mui/icons-material/Done'

import { ROLE_TRANSLATIONS } from '../crm-clients-page/CrmTableStickyHead'
import { Role } from '../../types'
import axiosInstance from '../../axios/settings'
import { changeRoleStyle, roleList, saveNewRole } from './style'
import ConfirmModal from './ConfirmModal'

const ROLE = ['admin', 'moderator', 'user']

export default function BasicMenu({ user, userRole, setUserRole }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedRole, setSelectedRole] = React.useState<string>(user.role)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (role: string) => {
    // setSelectedRole(ROLE_TRANSLATIONS[role as Role])
    setSelectedRole(role)
    console.log('Selected role:', role)
    // handleClose()
  }

  const fetchChangeRole = async (data: {
    id: number
    role: string
    updated_at: string
  }) => {
    try {
      const res = await axiosInstance.put(`/api/users/change_role`, data)
      console.log('Роль змінено:', res)
      // window.location.reload() // Оновлення сторінки
    } catch (error) {
      console.error('Помилка зміни ролі:', error)
    }
  }

  const changeRole = (role: any) => {
    if (role) {
      const userId = user.id // Замініть на ID користувача, якому хочете змінити роль
      const newRole = role // Замініть на нову роль
      const updatedAt = new Date().toISOString() // Поточний час в форматі ISO
      const changeNewRole = {
        id: userId,
        role: newRole,
        updated_at: updatedAt
      }
      console.log(' changeNewRole:', changeNewRole)
      fetchChangeRole(changeNewRole)
      setUserRole(newRole)
      setOpenModal(false)
    }
    return
  }

  const [openModal, setOpenModal] = React.useState<boolean>(false)

  return (
    <Box className={styles.changeRoleMain}>
      <ConfirmModal
        user={user}
        openModal={openModal}
        setOpenModal={setOpenModal}
        changeRole={changeRole}
        selectedRole={selectedRole}
      />
      <Box sx={changeRoleStyle}>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Typography variant="caption">Змінити роль</Typography>
          <KeyboardArrowDownIcon fontSize="large" />
        </Button>
        <Menu
          sx={roleList}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          {ROLE.map((item) => (
            <MenuItem onClick={() => handleMenuItemClick(item)} key={item}>
              {selectedRole === item && <DoneIcon />}
              <Typography variant="caption" className={styles[item]}>
                {ROLE_TRANSLATIONS[item as Role]}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Button
        disabled={selectedRole === userRole}
        onClick={() => setOpenModal(true)}
        sx={saveNewRole}
      >
        Зберегти
      </Button>
    </Box>
  )
}
