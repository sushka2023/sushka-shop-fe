import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { ModalCustom } from './ModalCustomWindow'
import { Typography } from '@mui/material'
import { Button } from '../UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RadioForm } from '../RadioForm/RadioForm'
// import { useAuth } from '../../hooks/use-auth'
import * as Yup from 'yup'

type PropsType = {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}
const getAddressRetentionSchema = (selectedValue: string) => {
  switch (selectedValue) {
    case 'novaPoshtaBranches':
      return Yup.object().shape({
        cityBranches: Yup.string().required('Виберіть населений пункт'),
        branches: Yup.string().required('Виберіть відділення')
      })
    case 'novaPoshtaPostomats':
      return Yup.object().shape({
        cityPostomats: Yup.string().required('Виберіть населений пункт'),
        postomats: Yup.string().required('Виберіть відділення')
      })
    case 'novaPoshtaAddress':
      return Yup.object().shape({
        cityAddress: Yup.string().required('Виберіть населений пункт'),
        address: Yup.string().required('Введіть вулицю'),
        house: Yup.string().required('Введіть будинок'),
        floor: Yup.string().notRequired(),
        apartament: Yup.string().notRequired()
      })
    default:
      return Yup.object().shape({})
  }
}

export const ModalCustomFormRadius: FC<PropsType> = ({
  openModal,
  setOpenModal
}) => {
  // const { user } = useAuth()

  const [selectedValue, setSelectedValue] =
    useState<string>('novaPoshtaBranches')

  const [AddressRetention, setAddressRetention] = useState(
    getAddressRetentionSchema(selectedValue)
  )

  useEffect(() => {
    clearErrors()
  }, [selectedValue])

  useEffect(() => {
    setAddressRetention(getAddressRetentionSchema(selectedValue))
  }, [selectedValue])

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    setError,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(AddressRetention)
  })

  const onSubmit: SubmitHandler<any> = async (values) => {
    console.log('✌️values --->', values)
    // const data = {
    //   post_id: user?.posts.id,
    //   nova_poshta_id: values.branches
    // }
    // try {
    //   const response = await axiosInstance.post('/api/posts/add_nova_poshta_warehouse', data)
    //   dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
    //   console.log('✌️response --->', response);
    //   return response
    // } catch (error) {

    // }
  }

  return (
    <ModalCustom
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
            setError={setError}
            setValue={setValue}
            setSelectedValue={setSelectedValue}
            selectedValue={selectedValue}
            errors={errors}
            clearErrors={clearErrors}
          >
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </RadioForm>
        </form>
      </React.Fragment>
    </ModalCustom>
  )
}
