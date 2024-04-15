import { Link } from 'react-router-dom'
import IconinfoMessage from '../../icons/infoMessage.svg?react'
import axiosInstance from '../../axios/settings'
import { useState } from 'react'
import { Typography, Stack, Button } from '@mui/material'
import InfoConfirmationModal from './ModalCustomWindow'
import React from 'react'
import {
  stBtnEmail,
  stEmailP2,
  stEmailSpan,
  stIconEmail,
  stIconLinkEmail,
  stLinkEmail,
  stLinkEmailList,
  stLinkEmailP
} from './style'

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
      }, 2000)
    }
  }

  return (
    <React.Fragment>
      {is_active ? (
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
      ) : (
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
            <Button
              sx={stBtnEmail}
              onClick={() => setOpenModal(false)}
              variant="contained"
            >
              Зрозуміло
            </Button>
          </Stack>
          <Typography component="p" style={stLinkEmailP}>
            Не отримали листа?
            <Link to="/resend-email" style={stLinkEmailList}>
              Відправити ще раз
            </Link>
          </Typography>
        </React.Fragment>
      </InfoConfirmationModal>
    </React.Fragment>
  )
}
