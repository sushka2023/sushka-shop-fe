import * as React from 'react'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import DialogActions from '@mui/joy/DialogActions'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authentication/operation'
import { AppDispatch, RootState } from '../../redux/store'
import { useAuth } from '../../hooks/use-auth'
import styles from './ModalCustomBtn.module.scss'

export default function ModalCustomBtn() {
  const [open, setOpen] = React.useState<boolean>(false)

  const token = useSelector((state: RootState) => state.auth.accessToken)
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useAuth()
  const handleClickLogout = () => {
    return dispatch(logout({ accessToken: token! }))
  }

  console.log('✌️user --->', user)

  const edit = {
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

  const window = {}

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={() => setOpen(true)} sx={edit}>
        Вийти
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={window} variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Ви впевнені, що хочете вийти зі свого профілю?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              className={styles.controlEdit}
              onClick={handleClickLogout}
            >
              Вийти
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Назад
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  )
}
