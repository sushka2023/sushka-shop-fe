import React, { Dispatch, FC, SetStateAction } from 'react'
import InfoConfirmationModal from './ModalCustomWindow'
import { Typography } from '@mui/material'
import { Button } from '../UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import RadioForm from '../RadioForm/RadioForm'

interface ModalCustomFormRadiusProps {
  openModal?: boolean
  setOpenModal?: Dispatch<SetStateAction<boolean>>
}

export const AddressRetention = Yup.object().shape({
  // city: Yup.string().required('Виберіть населений пункт'),
  // warehouse: Yup.string().required('Виберіть відділення')
})

export const ModalCustomFormRadius: FC<ModalCustomFormRadiusProps> = ({
  openModal = false,
  setOpenModal = () => {}
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    getValues,
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
          <RadioForm
            register={register}
            setValue={setValue}
            errors={errors}
            setError={setError}
            clearErrors={clearErrors}
            getValues={getValues}
          >
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </RadioForm>
        </form>
      </React.Fragment>
    </InfoConfirmationModal>
  )
}
