import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import { logout } from '../../redux/authentication/operation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
interface AuthState {
  accessToken: string
  // інші властивості, які має ваш стан автентифікації
}
interface RootState {
  auth: AuthState
  // інші редюсери та їх стани
}
export default function BasicModal() {
  const dispatch = useDispatch<AppDispatch>()

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const token = useSelector((state: RootState) => state.auth.accessToken)

  const BootstrapButton = styled(Button)({
    'boxShadow': 'none',
    'textTransform': 'none',
    'fontSize': 16,
    'padding': '6px 12px',
    'border': '1px solid',
    'lineHeight': 1.5,
    'fontFamily': [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf'
    }
  })

  const editBtnAccount = {
    '&.MuiButton-root:hover': {
      backgroundColor: '#EDA4A4'
    },
    'borderRadius': '20px',
    'border': 0,
    'cursor': 'pointer',
    'fontFamily': 'Open Sans',
    'fontWeight': 600,
    'fontStyle': '16px',
    'textAlign': 'center',
    'color': '#FFFFFF',
    'padding': '21px 40px',
    'backgroundColor': '#FCA1A9'
  }
  const styleBoxModalWindow = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 580,
    height: '291px',
    bgcolor: 'background.paper',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#567343'
  }
  const styleBtnModalWindow = {
    'width': 250,
    'height': 50,
    'bgcolor': 'background.paper',
    'borderRadius': '10px',
    'color': '#FCC812',
    'border': '2px solid #FCC812',
    'lineHeight': '18.2px',
    '&:hover': {
      backgroundColor: '#FCC812',
      boxShadow: 'none',
      border: '2px solid #FCC812',
      color: '#FFFFFF'
    }
  }
  const styleBtnEditModalWindow = {
    'width': 250,
    'height': 50,
    'bgcolor': '#D21C1C',
    'borderRadius': '10px',
    'color': '#FFFFFF',
    'border': '0',
    'lineHeight': '18.2px',
    '&:hover': {
      backgroundColor: '#DB4949'
    }
  }
  const handleClickLogout = () => {
    return dispatch(logout({ accessToken: token! }))
  }
  return (
    <div>
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
            component="p"
            style={{ fontSize: '22px', fontWeight: 600 }}
          >
            Вийти з аккаунта
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
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
    </div>
  )
}
