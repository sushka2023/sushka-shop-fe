import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Stack } from '@mui/material'
import axiosInstance from '../../axios/settings'
import IconinfoMessage from '../../icons/infoMessage.svg?react'
import { Button } from '../UI/Button'
import { useSnackbar } from '../../hooks/useSnackbar'
import { emailIconLink, emailLinkList } from './style'
import { ModalCustom } from './ModalCustomWindow'

type EmailConfirmationModalProps = {
  is_active: boolean | undefined
  email: string | undefined
  error?: unknown
}

export const EmailConfirmationModal = ({
  is_active,
  email
}: EmailConfirmationModalProps) => {
  const [openModal, setOpenModal] = useState(false)
  const { showSnackbar } = useSnackbar()

  const requestEmail = async (email: string) => {
    const modalTimeout = 2000
    try {
      await axiosInstance.post('/api/auth/request_email', {
        email
      })
      setOpenModal(true)
      setTimeout(() => {
        setOpenModal(false)
      }, modalTimeout)
    } catch (error) {
      console.error('Non-Axios error:', error)
    }
  }

  const handleResendEmail = async () => {
    try {
      if (email) {
        await requestEmail(email)
        setOpenModal(false)
        showSnackbar({
          error: false,
          message: 'Ми відправили ще раз, перевірте пошту'
        })
      } else {
        console.error('Email is undefined')
      }
    } catch (error) {
      console.error('Помилка під час відправлення листа:', error)
      showSnackbar({
        error: true,
        message: 'Сталась помилка при відправленні листа'
      })
    }
  }

  return (
    <Fragment>
      {!is_active ? null : (
        <Link
          to="/account"
          onClick={() => {
            if (email) {
              setOpenModal(true)
              requestEmail(email)
            } else {
              console.error('Email is undefined')
            }
          }}
          style={{ display: 'inline-block', marginTop: 25 }}
        >
          <IconinfoMessage />
          <Typography
            id="modal-modal-title"
            variant="caption"
            sx={emailIconLink}
          >
            Ваша електронна пошта не підтверджена
          </Typography>
        </Link>
      )}

      <ModalCustom openModal={openModal} setOpenModal={setOpenModal}>
        <Typography
          id="modal-modal-title"
          variant="caption"
          sx={{ fontSize: '22px', fontWeight: 600 }}
        >
          Підтвердіть вашу електронну пошту
        </Typography>
        <Typography
          id="modal-modal-description"
          variant="body1"
          sx={{ m: 1, maxWidth: 340 }}
        >
          Перейдіть за посиланням в листі, який ми відправили на вашу електронну
          пошту, щоб її підтвердити
        </Typography>
        <Stack spacing={2} direction="row" style={{ marginTop: '40px' }}>
          <Button
            variant="contained"
            sx={{
              width: 250,
              height: 50,
              textTransform: 'capitalize'
            }}
            onClick={() => setOpenModal(false)}
          >
            Зрозуміло
          </Button>
        </Stack>
        <Typography variant="body1" sx={{ mt: 7 }}>
          Не отримали листа?
          <Typography
            id="modal-modal-description"
            variant="caption"
            onClick={handleResendEmail}
            sx={emailLinkList}
          >
            Відправити ще раз
          </Typography>
        </Typography>
      </ModalCustom>
    </Fragment>
  )
}
