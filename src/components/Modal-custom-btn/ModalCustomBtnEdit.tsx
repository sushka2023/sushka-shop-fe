import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { logout } from '../../redux/authentication/operation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import {
  BootstrapButton,
  editBtnAccount,
  styleBoxModalWindow,
  styleBtnEditModalWindow,
  styleBtnModalWindow
} from './style'
interface AuthState {
  accessToken: string
}
interface RootState {
  auth: AuthState
}
export const BasicModal = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const token = useSelector((state: RootState) => state.auth.accessToken)

  const handleClickLogout = () => {
    dispatch(logout({ accessToken: token! }))
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen} sx={editBtnAccount}>
        Вийти
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBoxModalWindow}>
          <Typography
            id="modal-modal-title"
            variant="body1"
            style={{ fontSize: 22, fontWeight: 600 }}
          >
            Вийти з аккаунта
          </Typography>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, fontWeight: 400, fontSize: 18 }}
          >
            Ви точно бажаєте вийти зі свого аккаунта?
          </Typography>
          <Stack spacing={2} direction="row" style={{ marginTop: '40px' }}>
            <BootstrapButton
              onClick={handleClose}
              variant="contained"
              sx={styleBtnModalWindow}
              disableRipple
            >
              Скасувати
            </BootstrapButton>
            <BootstrapButton
              onClick={handleClickLogout}
              variant="contained"
              sx={styleBtnEditModalWindow}
              disableRipple
            >
              Вийти
            </BootstrapButton>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  )
}
