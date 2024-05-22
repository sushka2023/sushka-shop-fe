import React from 'react'
import InfoConfirmationModal from './ModalCustomWindow'
import { Typography } from '@mui/material'
import { RadioForm } from '../RadioForm/RadioForm'

interface ModalCustomFormRadiusProps {
  openModal?: boolean
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCustomFormRadius: React.FC<ModalCustomFormRadiusProps> = ({
  openModal = false,
  setOpenModal = () => {}
}) => {
  return (
    <InfoConfirmationModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      yourStBoxModalWindow={{
        alignItems: 'start'
      }}
    >
      <React.Fragment>
        <Typography id="modal-modal-title" variant="h3">
          Ваша збережена адреса №3
        </Typography>
        <Typography id="modal-modal-description" component="p">
          Ми збережемо введені дані, щоб оформлення <br />
          Вашого наступного замовлення було швидшим.
        </Typography>
        <RadioForm />
      </React.Fragment>
    </InfoConfirmationModal>
  )
}
