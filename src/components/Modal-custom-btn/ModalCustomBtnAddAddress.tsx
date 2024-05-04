import { Typography } from '@mui/material'
import InfoConfirmationModal from './ModalCustomWindow'
import { stTypographyBody2 } from '../Account-panel/style'
import AddressForm from '../AddressForm/AddressForm'
import React from 'react'
import { ISnackbarData } from '../SnackebarCustom/SnackbarCustom'

type ModalCustomBtnAddAddressProps = {
  setDeliveryAddresses: React.Dispatch<
    React.SetStateAction<{ nova_poshta: never[]; ukr_poshta: never[] }>
  >
  setSnackbarData: React.Dispatch<React.SetStateAction<ISnackbarData>>
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCustomBtnAddAddress: React.FC<
  ModalCustomBtnAddAddressProps
> = ({ setDeliveryAddresses, setSnackbarData, openModal, setOpenModal }) => {
  return (
    <React.Fragment>
      <InfoConfirmationModal
        yourStBoxModalWindow={{ alignItems: 'start', paddingLeft: 6 }}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <Typography
          variant="h3"
          sx={{ fontFamily: 'Comfortaa', fontWeight: 500, fontSize: 32 }}
        >
          Додати нову адресу
        </Typography>
        <Typography variant="body2" sx={stTypographyBody2}>
          Ми збережемо введені дані, щоб оформлення <br /> Вашого наступного
          замовлення було швидшим.
        </Typography>
        <AddressForm
          setOpenModal={setOpenModal}
          setDeliveryAddresses={setDeliveryAddresses}
          setSnackbarData={setSnackbarData}
        />
      </InfoConfirmationModal>
    </React.Fragment>
  )
}
