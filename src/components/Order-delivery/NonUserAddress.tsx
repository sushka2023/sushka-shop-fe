import { useContext } from 'react'
import { OrderContext } from '../../pages/order-page'
import { RadioForm } from '../RadioForm/RadioForm'

const NonUserAddress = () => {
  const {
    register,
    setValue,
    errors,
    setError,
    clearErrors,
    selectedValue,
    setSelectedValue
  } = useContext(OrderContext)

  return (
    <RadioForm
      register={register}
      setValue={setValue}
      errors={errors}
      setError={setError}
      clearErrors={clearErrors}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
    />
  )
}

export { NonUserAddress }
