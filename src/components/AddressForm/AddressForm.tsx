import { Dispatch, SetStateAction, FC } from 'react'
import { Button, FormControl } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddAddressSchema } from '../auth/validation'
import FormRadioGroup from './FormRadioGroup'
import axiosInstance from '../../axios/settings'
import { renderFormFields } from './renderFormFields'
import fetchDataMyPostOffices, {
  PostOfficesData
} from '../Account-panel/Delivery-address/fatchDataPostOffices'
import { SnackbarData } from '../SnackebarCustom/SnackbarCustom'
import { useSelector } from 'react-redux'
import { selectPostValue } from '../../redux/account-panel/slice'

export type FormValue = {
  city_np_office?: string
  separation_np_office?: string
  city_np_parcel_locker?: string
  box_np_parcel_locker?: string
  city_np_address?: string
  street_np_address?: string
  house_np_address?: string
  apartment_np_address?: string
  country_urk?: string
  region_urk?: string
  city_urk?: string
  postalCode_urk?: string
  street_urk?: string
  house_urk?: string
  apartment_urk?: string
}
type AddressFormProps = {
  setOpenModal: (value: boolean) => void
  setDeliveryAddresses: Dispatch<SetStateAction<PostOfficesData>>
  setSnackbarData: Dispatch<SetStateAction<SnackbarData>>
}

const AddressForm: FC<AddressFormProps> = ({
  setOpenModal,
  setDeliveryAddresses,
  setSnackbarData
}) => {
  // const [selectedValue, setSelectedValue] = useState<string>('ukr_post')

  const selectedValue = useSelector(selectPostValue)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValue>({
    resolver: yupResolver(AddAddressSchema(selectedValue))
  })

  const onSubmit = (data: FormValue) => {
    const dataResout: any = {}

    const url = (() => {
      switch (selectedValue) {
        case 'np_office':
        case 'np_parcel_locker':
          return '/api/posts/create_nova_poshta_warehouse_and_associate_with_post'
        case 'np_address':
          return '/api/posts/create_nova_poshta_address_delivery_and_associate_with_post'
        case 'ukr_post':
          return '/api/posts/create_ukr_poshta_and_associate_with_post'
        default:
          return ''
      }
    })()

    switch (selectedValue) {
      case 'np_office':
        dataResout.city = data.city_np_office
        dataResout.address_warehouse = data.separation_np_office
        break
      case 'np_parcel_locker':
        dataResout.city = data.city_np_parcel_locker
        dataResout.address_warehouse = data.box_np_parcel_locker
        break
      case 'np_address':
        Object.assign(dataResout, {
          street: data.street_np_address,
          house_number: data.house_np_address,
          apartment_number: data.apartment_np_address,
          floor: 0,
          city: data.city_np_address,
          region: '',
          area: ''
        })
        break
      case 'ukr_post':
        Object.assign(dataResout, {
          street: data.street_urk,
          house_number: data.house_urk,
          apartment_number: data.apartment_urk,
          city: data.city_urk,
          region: data.region_urk,
          country: data.country_urk,
          post_code: data.postalCode_urk
        })
        break
      default:
        break
    }

    axiosInstance
      .post(url, dataResout)
      .then((response) => {
        console.log('Server response:', response)
        setOpenModal(false)
        fetchDataMyPostOffices(setDeliveryAddresses)
        setSnackbarData({
          open: true,
          error: false,
          message: 'Вашу адресу успішно додано!'
        })
      })
      .catch((error) => {
        setSnackbarData({ open: true, error: true, message: 'Сталась помилка' })
        console.error('Error:', error)
      })
  }

  return (
    <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormRadioGroup
        selectedValue={selectedValue}
        renderFormFields={() =>
          renderFormFields({
            errors,
            selectedValue,
            watch,
            register,
            setValue
          })
        }
      />

      <Button type="submit" variant="contained">
        ЗБЕРЕГТИ
      </Button>
    </FormControl>
  )
}

export default AddressForm
