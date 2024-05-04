import { Button, Grid, Typography } from '@mui/material'
import InfoConfirmationModal from './ModalCustomWindow'
import { stBtn, stTypographyBody2 } from '../Account-panel/style'
import AddressForm from '../AddressForm/AddressForm'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { ISnackbarData } from '../SnackebarCustom/SnackbarCustom'

type ModalCustomBtnAddAddressProps = {
  setDeliveryAddresses: React.Dispatch<
    React.SetStateAction<{ nova_poshta: never[]; ukr_poshta: never[] }>
  >
  setSnackbarData: React.Dispatch<React.SetStateAction<ISnackbarData>>
  addressData: any
}

export const ModalCustomBtnAddAddress: React.FC<
  ModalCustomBtnAddAddressProps
> = ({ setDeliveryAddresses, setSnackbarData, addressData }) => {
  console.log('✌️addressData --->', addressData)
  const [openModal, setOpenModal] = useState(false)

  const limitedItems = () => {
    if (addressData.length === 3) {
      return true
    }
    return false
  }

  return (
    <React.Fragment>
      <Grid item xs={12} md={6} lg={3}>
        <Button
          onClick={() => setOpenModal(true)}
          sx={stBtn}
          disabled={limitedItems()}
        >
          Додати адресу
          <AddIcon sx={{ fontSize: 26 }} />
        </Button>
        {limitedItems() && (
          <Typography variant="body1">
            *Максимальна кількість адрес.
            <br />
            Видаліть непотрібну адресу,
            <br />
            щоб додати нову
          </Typography>
        )}
      </Grid>

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
