import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { ModalCustom } from './ModalCustomWindow'
import { Typography } from '@mui/material'
import { Button } from '../UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RadioForm } from '../RadioForm/RadioForm'
import { useAuth } from '../../hooks/use-auth'
import * as Yup from 'yup'
import axiosInstance from '../../axios/settings'
import { useDispatch } from 'react-redux'
import { currentUser } from '../../redux/authentication/operation'
import { getToken } from '../../utils/cookie/token'
import { AppDispatch } from '../../redux/store'

type PropsType = {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}
type User = {
  posts: {
    id: number
  }
}

type FormValues = {
  cityBranches?: string
  branches?: string
  cityPostomats?: string
  postomats?: string
  cityAddress?: string
  address?: string
  house?: string
  floor?: string
  apartment?: string
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
        apartment: Yup.string().notRequired()
      })
    default:
      return Yup.object().shape({})
  }
}

export const ModalCustomFormRadius: FC<PropsType> = ({
  openModal,
  setOpenModal
}) => {
  const { user } = useAuth()
  const accessToken = getToken()
  const dispatch = useDispatch<AppDispatch>()

  const [selectedValue, setSelectedValue] =
    useState<string>('novaPoshtaBranches')

  const [AddressRetention, setAddressRetention] = useState(
    getAddressRetentionSchema(selectedValue)
  )

  useEffect(() => {
    clearErrors()
  }, [selectedValue, openModal])

  useEffect(() => {
    setAddressRetention(getAddressRetentionSchema(selectedValue))
  }, [selectedValue])

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(AddressRetention)
  })

  const getEndpoint = (selectedValue: string) =>
    selectedValue === 'novaPoshtaAddress'
      ? '/api/posts/create_nova_poshta_address_delivery_and_associate_with_post'
      : '/api/posts/add_nova_poshta_warehouse'

  const getData = (
    values: FormValues,
    selectedValue: string,
    user: User | null
  ) =>
    selectedValue === 'novaPoshtaAddress'
      ? {
          street: values.address,
          house_number: values.house,
          apartment_number: values.apartment ?? '',
          floor: values.floor ?? 0,
          city: values.cityAddress
        }
      : {
          post_id: user?.posts.id,
          nova_poshta_id:
            selectedValue === 'novaPoshtaBranches'
              ? values.branches
              : values.postomats
        }

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const endpoint = getEndpoint(selectedValue)
    const data = getData(values, selectedValue, user)

    try {
      const response = await axiosInstance.post(endpoint, data)
      dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
      console.log('✌️response --->', response)
      return response
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setOpenModal(false)
      reset()
    }
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
