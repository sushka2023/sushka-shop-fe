import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { ModalCustom } from './ModalCustomWindow'
import { Box, Typography, Button, useTheme } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RadioForm } from '../RadioForm/RadioForm'
import { useAuth } from '../../hooks/use-auth'
import axiosInstance from '../../axios/settings'
import { useDispatch } from 'react-redux'
import { currentUser } from '../../redux/authentication/operation'
import { getToken } from '../../utils/cookie/token'
import { AppDispatch } from '../../redux/store'
import { AddressAddSchema } from '../auth/validation'
import { useSnackbar } from '../../hooks/useSnackbar'

type PropsType = {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

type User = {
  posts: {
    id: number
  }
}

export type FormValues = {
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

export const ModalCustomFormRadius: FC<PropsType> = ({
  openModal,
  setOpenModal
}) => {
  const theme = useTheme()
  const { user } = useAuth()
  const accessToken = getToken()
  const { showSnackbar } = useSnackbar()
  const dispatch = useDispatch<AppDispatch>()
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] =
    useState<string>('novaPoshtaBranches')
  const [AddressRetention, setAddressRetention] = useState(
    AddressAddSchema(selectedValue)
  )

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

  useEffect(() => {
    setSelectedValue('novaPoshtaBranches')
  }, [openModal])

  useEffect(() => {
    clearErrors()
  }, [selectedValue, openModal])

  useEffect(() => {
    setAddressRetention(AddressAddSchema(selectedValue))
  }, [selectedValue])

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
    console.log('✌️values --->', values)
    const endpoint = getEndpoint(selectedValue)
    const data = getData(values, selectedValue, user)

    try {
      const response = await axiosInstance.post(endpoint, data)
      dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
      showSnackbar({ error: false, message: 'Ваші зміни успішно збережені!' })
      setIsLoadingBtn(true)
      setOpenModal(false)
      return response
    } catch (error) {
      showSnackbar({ error: false, message: 'Сталась помилка' })
      console.error('Error submitting form:', error)
    } finally {
      setIsLoadingBtn(false)
      reset()
    }
  }

  return (
    <ModalCustom
      openModal={openModal}
      setOpenModal={setOpenModal}
      sx={{
        [theme.breakpoints.down('sm')]: {
          maxHeight: '100%',

          maxWidth: 'none',
          transform: 'none',
          borderRadius: 0,
          top: 'auto',
          left: 0,
          bottom: 0,
          p: 1
        }
      }}
    >
      <Box
        sx={{
          [theme.breakpoints.down('sm')]: {
            width: '100%'
          }
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h3"
          sx={{
            [theme.breakpoints.down('sm')]: {
              fontFamily: 'Nunito',
              fontSize: 21,
              fontWeight: 700
            }
          }}
        >
          Додати нову адресу
        </Typography>
        <Typography
          sx={{
            fontSize: 18,
            m: '10px 0 20px 0',
            [theme.breakpoints.down('sm')]: {
              fontSize: 15
            }
          }}
          id="modal-modal-description"
          component="p"
        >
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
          />
          <Box sx={{ m: '10px 0', display: 'flex', gap: 2 }}>
            <Button
              sx={{
                height: 50,
                width: 200,
                [theme.breakpoints.down('sm')]: {
                  width: '50%'
                }
              }}
              onClick={() => setOpenModal(false)}
              variant="outlined"
            >
              Скасувати
            </Button>
            <Button
              sx={{
                height: 50,
                width: 200,
                [theme.breakpoints.down('sm')]: {
                  width: '50%'
                }
              }}
              type="submit"
              variant="contained"
              disabled={isLoadingBtn}
            >
              {isLoadingBtn ? 'Завантаження...' : 'Зберегти'}
            </Button>
          </Box>
        </form>
      </Box>
    </ModalCustom>
  )
}
