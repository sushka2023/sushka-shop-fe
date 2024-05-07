import { Typography } from '@mui/material'
import InfoConfirmationModal from './ModalCustomWindow'
import { stTypographyBody2 } from '../Account-panel/style'
import AddressForm from '../AddressForm/AddressForm'
import { Dispatch, SetStateAction, FC } from 'react'
import { SnackbarData } from '../SnackebarCustom/SnackbarCustom'
import { PostOfficesData } from '../Account-panel/Delivery-address/fatchDataPostOffices'

type ModalCustomBtnAddAddressProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setDeliveryAddresses: Dispatch<SetStateAction<PostOfficesData>>
  setSnackbarData: Dispatch<SetStateAction<SnackbarData>>
  openModal: boolean
}

export const ModalCustomBtnAddAddress: FC<ModalCustomBtnAddAddressProps> = ({
  setDeliveryAddresses,
  setSnackbarData,
  openModal,
  setOpenModal
}) => {
  return (
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
  )
}
