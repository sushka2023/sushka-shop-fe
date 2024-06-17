/* eslint-disable */
import React, { FC, useState } from 'react'
import { ErrorMessage } from '../Error/Error'
import { AutocompleteCustom } from '../Autocomplete/AutocompleteCustom'
import { useNovaPoshtaCity } from '../../hooks/useNovaPoshtaCity'

type PropsType = {
  selectedValue: any
  errors: any
  setError: (name: string, error: { type: string; message: string }) => void
  register: (name: string) => any
  setValue: (name: string, value: any) => void
  clearErrors: (name: string) => void
}

export const AddressNP: FC<PropsType> = ({
  selectedValue,
  errors,
  register,
  setValue,
  clearErrors,
  setError
}) => {
  const {
    setValueInput: setValueInputCity,
    loading: loadingCity,
    options: optionsCity,
    cityDefault
  } = useNovaPoshtaCity(clearErrors, setError)
  const [settlementRef, setSettlementRef] = useState<string>(
    'e71d9e4a-4b33-11e4-ab6d-005056801329'
  )
  const [street, setStreet] = useState<string>('Соборна')

  const onChangeCity = (_: any, value: string) => {
    setValue('address_np_city', value)
    if (cityDefault.includes(value)) {
      clearErrors('address_np_city')
    }
  }

  const onChangeStreet = (_: any, value: string) => {
    setValue('address_np_street', value)
    if (streets.some((street) => street.Present === value)) {
      clearErrors('address_np_street')
    }
  }

  return (
    selectedValue === 'male' && (
      <>
        <ErrorMessage
          error={errors.address_np_city}
          styles={{ position: 'relative' }}
        />
        <AutocompleteCustom
          name="address_np_city"
          register={register}
          options={optionsCity}
          onChange={onChangeCity}
          loading={loadingCity}
          setValueInput={setValueInputCity}
        />
      </>
    )
  )
}
/* eslint-enable */
