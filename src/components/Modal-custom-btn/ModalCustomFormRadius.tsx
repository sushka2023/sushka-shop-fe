import React, { Dispatch, FC, SetStateAction } from 'react'
import InfoConfirmationModal from './ModalCustomWindow'
import { Typography } from '@mui/material'
import { Button } from '../UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import RadioForm from '../RadioForm/RadioForm'
import { useAuth } from '../../hooks/use-auth'
// import axiosInstance from '../../axios/settings'
// import { currentUser } from '../../redux/authentication/operation'
// import { useDispatch } from 'react-redux'
// import { AppDispatch } from '../../redux/store'
// import { getToken } from '../../utils/cookie/token'

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
  const { user } = useAuth()
  console.log('✌️user --->', user)
  // const dispatch = useDispatch<AppDispatch>()
  // const accessToken = getToken()

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

  const onSubmit: SubmitHandler<any> = async (values) => {
    console.log('✌️values --->', values)
    console.log(values.branches)
    const data = {
      post_id: user?.posts.id,
      nova_poshta_id: values.branches
    }
    console.log('✌️data --->', data)
    // try {
    //   const response = await axiosInstance.post('/api/posts/add_nova_poshta_warehouse', data)
    //   dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
    //   console.log('✌️response --->', response);
    //   return response
    // } catch (error) {

    // }
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
