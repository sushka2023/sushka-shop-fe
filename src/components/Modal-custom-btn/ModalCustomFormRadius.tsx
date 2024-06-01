import React from 'react'
import InfoConfirmationModal from './ModalCustomWindow'
import { Typography } from '@mui/material'
import { RadioForm } from '../RadioForm/RadioForm'
import { Button } from '../UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

interface ModalCustomFormRadiusProps {
  openModal?: boolean
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddressRetention = Yup.object().shape({
  pickupNP: Yup.string().required('Заповніть поле')
})

export const ModalCustomFormRadius: React.FC<ModalCustomFormRadiusProps> = ({
  openModal = false,
  setOpenModal = () => {}
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(AddressRetention)
  })

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <RadioForm register={register} setValue={setValue} errors={errors}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </RadioForm>
        </form>
      </React.Fragment>
    </InfoConfirmationModal>
  )
}
