import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Stack } from '@mui/material'
import axiosInstance from '../../axios/settings'
import IconinfoMessage from '../../icons/infoMessage.svg?react'
import { Button } from '../UI/Button'

import { useSnackbar } from '../../hooks/useSnackbar'
import { btn, emailP2, iconLinkEmail, linkEmailList } from './style'
import Modalka from './ModalCustomWindow'

type EmailConfirmationModalProps = {
  is_active: boolean
  email: string
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
      await requestEmail(email)
      setOpenModal(false)
      showSnackbar({
        error: false,
        message: 'Ми відправили ще раз, перевірте пошту'
      })
    } catch (error) {
      console.error('Помилка під час відправлення листа:', error)
      showSnackbar({
        error: true,
        message: 'Сталась помилка при відправленні листа'
      })
    }
  }

  return (
    <React.Fragment>
      {is_active ? null : (
        <Link
          to="/account"
          onClick={() => {
            setOpenModal(true)
            requestEmail(email)
          }}
        >
          <IconinfoMessage />
          <Typography
            id="modal-modal-title"
            variant="caption"
            sx={iconLinkEmail}
          >
            Ваша електронна пошта не підтверджена
          </Typography>
        </Link>
      )}

      <Modalka openModal={openModal} setOpenModal={setOpenModal}>
        <Typography
          id="modal-modal-title"
          variant="caption"
          sx={{ fontSize: '22px', fontWeight: 600 }}
        >
          Підтвердіть вашу електронну пошту
        </Typography>
        <Typography
          id="modal-modal-description"
          variant="caption"
          sx={{ ...emailP2, mb: 2, maxWidth: 400 }}
        >
          Перейдіть за посиланням в листі, який ми відправили на вашу електронну
          пошту, <br /> щоб її підтвердити
        </Typography>
        <Stack spacing={2} direction="row" style={{ marginTop: '40px' }}>
          <Button
            variant="contained"
            sx={btn}
            onClick={() => setOpenModal(false)}
          >
            Зрозуміло
          </Button>
        </Stack>
        <Typography variant="caption" sx={{ ...emailP2, mt: 7 }}>
          Не отримали листа?
          <Typography
            id="modal-modal-description"
            variant="caption"
            onClick={handleResendEmail}
            sx={linkEmailList}
          >
            Відправити ще раз
          </Typography>
        </Typography>
      </Modalka>
    </React.Fragment>
  )
}
