import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Stack } from '@mui/material'
import axiosInstance from '../../axios/settings'
import IconinfoMessage from '../../icons/infoMessage.svg?react'
import InfoConfirmationModal from './ModalCustomWindow'
import { Button } from '../UI/Button'
import { stBtn } from '../Account-panel/Change-password/Change-password'
import {
  stEmailP2,
  stEmailSpan,
  stIconEmail,
  stIconLinkEmail,
  stLinkEmail,
  stLinkEmailList,
  stLinkEmailP
} from './style'
import { Dispatch, SetStateAction } from 'react'
import { SnackbarData } from '../SnackebarCustom/SnackbarCustom'

type EmailConfirmationModalProps = {
  is_active: boolean
  email: string
  error?: unknown
  setSnackbarData: Dispatch<SetStateAction<SnackbarData>>
}

export const EmailConfirmationModal = ({
  is_active,
  email,
  setSnackbarData
}: EmailConfirmationModalProps) => {
  const [openModal, setOpenModal] = useState(false)

  const requestEmail = async (email: string) => {
    try {
      await axiosInstance.post('/api/auth/request_email', {
        email
      })
      setOpenModal(true)
    } catch (error) {
      console.error('Non-Axios error:', error)
    } finally {
      setTimeout(() => {
        setOpenModal(false)
      }, 5000)
    }
  }
  const handleResendEmail = async () => {
    try {
      await requestEmail(email)
      setOpenModal(false)
      setSnackbarData({
        open: true,
        error: false,
        message: 'Ми відправили ще раз, перевірте пошту'
      })
    } catch (error) {
      console.error('Помилка під час відправлення листа:', error)
      setSnackbarData({
        open: true,
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
            <Button sx={stBtn} onClick={() => setOpenModal(false)}>
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
