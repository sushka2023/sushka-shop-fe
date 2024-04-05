import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import IconinfoMessage from '../../icons/infoMessage.svg?react'
import {
  BootstrapButton,
  styleBoxModalWindow,
  styleBtnModalWindow
} from '../auth/style'

export default function EmailConfirmationModal({ is_active }: any) {
  console.log('✌️is_active --->', is_active)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      {is_active ? null : (
        <Link
          onClick={handleOpen}
          to="/account"
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#D21C1C',
            marginTop: 40
          }}
        >
          <IconinfoMessage style={{ marginRight: 10 }} />
          <p
            style={{
              fontFamily: 'Open Sans',
              borderBottom: '0.5px solid #D21C1C',
              fontSize: 18
            }}
          >
            Ваша електронна пошта не підтверджена
          </p>
        </Link>
      )}
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
            Підтвердіть вашу електронну пошту
          </Typography>
          <Typography
            id="modal-modal-description"
            component="p"
            style={{
              fontSize: 18,
              fontWeight: 400,
              textAlign: 'center',
              padding: '0 80px'
            }}
          >
            Перейдіть за посилання в листі, який ми відправили на вашу
            електронну пошту, <br /> щоб її підтвердити
          </Typography>
          <Stack spacing={2} direction="row" style={{ marginTop: '40px' }}>
            <BootstrapButton
              onClick={handleClose}
              variant="contained"
              sx={styleBtnModalWindow}
              disableRipple
            >
              Зрозуміло
            </BootstrapButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
