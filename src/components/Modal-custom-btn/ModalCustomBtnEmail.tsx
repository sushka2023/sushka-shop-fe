import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Stack } from '@mui/material'
import axiosInstance from '../../axios/settings'
import IconinfoMessage from '../../icons/infoMessage.svg?react'
import InfoConfirmationModal from './ModalCustomWindow'
import { Button } from '../UI/Button'
import {
  stEmailP2,
  stEmailSpan,
  stIconEmail,
  stIconLinkEmail,
  stLinkEmail,
  stLinkEmailList,
  stLinkEmailP
} from './style'
import { useSnackbar } from '../../hooks/useSnackbar'

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
          style={stLinkEmail}
          onClick={() => {
            setOpenModal(true)
            requestEmail(email)
          }}
        >
          <IconinfoMessage style={stIconEmail} />
          <Typography
            id="modal-modal-title"
            component="span"
            sx={stIconLinkEmail}
          >
            Ваша електронна пошта не підтверджена
          </Typography>
        </Link>
      )}

      <InfoConfirmationModal openModal={openModal} setOpenModal={setOpenModal}>
        <React.Fragment>
          <Typography id="modal-modal-title" component="span" sx={stEmailSpan}>
            Підтвердіть вашу електронну пошту
          </Typography>
          <Typography id="modal-modal-description" component="p" sx={stEmailP2}>
            Перейдіть за посиланням в листі, який ми відправили на вашу
            електронну пошту, <br /> щоб її підтвердити
          </Typography>
          <Stack spacing={2} direction="row" style={{ marginTop: '40px' }}>
            <Button variant="contained" onClick={() => setOpenModal(false)}>
              Зрозуміло
            </Button>
          </Stack>
          <Typography component="p" style={stLinkEmailP}>
            Не отримали листа?
            <span onClick={handleResendEmail} style={stLinkEmailList}>
              Відправити ще раз
            </span>
          </Typography>
        </React.Fragment>
      </InfoConfirmationModal>
    </React.Fragment>
  )
}
