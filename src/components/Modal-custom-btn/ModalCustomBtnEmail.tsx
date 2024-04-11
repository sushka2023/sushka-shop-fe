import { Link } from 'react-router-dom'
import IconinfoMessage from '../../icons/infoMessage.svg?react'
import axiosInstance from '../../axios/settings'
import { useState } from 'react'
import { Typography, Stack, Button } from '@mui/material'
import InfoConfirmationModal from './ModalCustomWindow'
import React from 'react'

interface EmailConfirmationModalProps {
  is_active: boolean
  email: string
  error?: unknown
}

export const EmailConfirmationModal = ({
  is_active,
  email
}: EmailConfirmationModalProps) => {
  console.log('✌️email --->', email)
  console.log('✌️is_active --->', is_active)
  const [openModal, setOpenModal] = useState(false)

  const requestEmail = async (email: string) => {
    try {
      const response = await axiosInstance.post('/api/auth/request_email', {
        email
      })
      console.log('✌️response --->', response.data)

      if (response.status === 200) {
        setOpenModal(true)
        setTimeout(() => {
          setOpenModal(false)
        }, 2000)
      } else {
        console.error('Error sending email:', response.data)
      }
    } catch (error) {
      console.error('Non-Axios error:', error)
    }
  }

  return (
    <div>
      {is_active ? null : (
        <Link
          to="/account"
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#D21C1C',
            marginTop: 40
          }}
          onClick={() => {
            setOpenModal(true)
            requestEmail(email)
          }}
        >
          <IconinfoMessage style={{ marginRight: 10 }} />
          <span
            style={{
              fontFamily: 'Open Sans',
              borderBottom: '0.5px solid #D21C1C',
              fontSize: 18
            }}
          >
            Ваша електронна пошта не підтверджена
          </span>
        </Link>
      )}

      <InfoConfirmationModal openModal={openModal} setOpenModal={setOpenModal}>
        <React.Fragment>
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
              // border: '1px solid',
              fontSize: 18,
              fontWeight: 400,
              textAlign: 'center',
              padding: '0 80px'
            }}
          >
            Перейдіть за посиланням в листі, який ми відправили на вашу
            електронну пошту, <br /> щоб її підтвердити
          </Typography>
          <Stack spacing={2} direction="row" style={{ marginTop: '40px' }}>
            <Button
              onClick={() => setOpenModal(false)}
              variant="contained"
              disableRipple
            >
              Зрозуміло
            </Button>
          </Stack>
          <Typography
            component="p"
            style={{ fontSize: 14, fontWeight: 400, marginTop: 40 }}
          >
            Не отримали листа?
            <Link
              to="/resend-email"
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: 600,
                borderBottom: '0.5px solid #567343'
              }}
            >
              Відправити ще раз
            </Link>
          </Typography>
        </React.Fragment>
      </InfoConfirmationModal>
    </div>
  )
}
