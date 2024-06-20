import { FC, useEffect, useCallback, useMemo, useState, Fragment } from 'react'
import { ErrorMessage } from '../Error/Error'
import { AutocompleteCustom } from '../Autocomplete/AutocompleteCustom'
import { useNovaPoshtaLocations } from '../../hooks/useNovaPoshtaLocations'
import { useNovaPoshtaCity } from '../../hooks/useNovaPoshtaCity'

type PropsType = {
  selectedValue: any
  errors: any
  register: (name: string) => any
  setValue: (name: string, value: any) => void
  clearErrors: (name: string) => void
  getValues: (name: string) => any
}

const MAX_LENGTH = 50

export const NovaPoshtaBranch: FC<PropsType> = ({
  selectedValue,
  errors,
  register,
  setValue,
  clearErrors
}) => {
  const {
    setValInputWarehouse,
    warehouses,
    setSettleRef,
    setNewRequest,
    messageOptionLoc,
    loading: locationLoading
  } = useNovaPoshtaLocations()

  const {
    valInputCity,
    setValInputCity,
    loading: cityLoading,
    options,
    novaPoshtaCity,
    cityDefault,
    getDefaultCityRef,
    getCityRef,
    messageOptionCity
  } = useNovaPoshtaCity({
    setValue,
    clearErrors,
    setSettleRef
  })

  const [isDisabled, setIsDisabled] = useState(!valInputCity)

  useEffect(() => {
    setIsDisabled(!valInputCity)
  }, [valInputCity])

  useEffect(() => {
    if (isDisabled) {
      setValue('branches', '')
      setValInputWarehouse('')
      setSelectedWarehouseValue(null)
      setNewRequest(true)
    }
  }, [isDisabled, setValue, setValInputWarehouse, setNewRequest])
  const [selectedWarehouseValue, setSelectedWarehouseValue] = useState<
    string | null
  >(null)

  const optionsDataCity = useMemo(() => {
    return warehouses.map((warehouse) => ({
      label:
        warehouse.address_warehouse
          .replace(/\(до 30 кг на одне місце\)/g, '')
          .replace(/\(до 30 кг\)/g, '')
          .replace(/\(до 10 кг\)/g, '')
          .replace(/\(до 5 кг\)/g, '')
          .replace(/\(до 200 кг\)/g, '')
          .replace(/\(до 1100 кг \)/g, '')
          .replace(/\n/g, '')
          .replace(/№(\d+)\s*:/g, '№$1:')
          .trim()
          .slice(0, MAX_LENGTH) +
        (warehouse.address_warehouse.length > MAX_LENGTH ? '...' : ''),
      id: warehouse.id
    }))
  }, [warehouses])

  const onChangeCity = useCallback(
    (_event: any, value: string) => {
      setValue('city', value)
      setValInputCity(value)
      clearErrors('city')
      if (cityDefault.some((city) => city.name === value)) {
        setSettleRef(getDefaultCityRef(value, cityDefault))
        clearErrors('city')
      } else if (value && novaPoshtaCity.length > 0) {
        setSettleRef(getCityRef(value, novaPoshtaCity))
      } else {
        setSettleRef(null)
      }
    },
    [
      setValue,
      setValInputCity,
      novaPoshtaCity,
      cityDefault,
      clearErrors,
      getDefaultCityRef,
      getCityRef,
      setSettleRef
    ]
  )

  const onChangeWarehouse = useCallback(
    (_event: any, value: string) => {
      const selectedWarehouse = optionsDataCity.find(
        (option) => option.label === value
      )
      if (selectedWarehouse) {
        setValue('branches', selectedWarehouse.id) // Зберегти ідентифікатор у useForm
        setValInputWarehouse(value)
        setSelectedWarehouseValue(value)
        setNewRequest(false)
      }
      clearErrors('branches')
    },
    [
      setValue,
      setValInputWarehouse,
      clearErrors,
      setNewRequest,
      optionsDataCity
    ]
  )

  return (
    selectedValue === 'novaPoshtaBranches' && (
      <Fragment>
        <ErrorMessage
          error={errors.city || errors.branches}
          styles={{ position: 'relative' }}
        />

        <AutocompleteCustom
          name="city"
          placeholder="Оберіть населений пункт"
          register={register}
          options={options}
          errors={errors}
          onChange={onChangeCity}
          loading={cityLoading}
          setValueInput={setValInputCity}
          optionsText={messageOptionCity}
        />

        <AutocompleteCustom
          name="branches"
          placeholder="Оберіть відділення"
          register={register}
          options={optionsDataCity.map((option) => option.label)}
          errors={errors}
          disabled={isDisabled}
          val={isDisabled ? '' : selectedWarehouseValue}
          onChange={onChangeWarehouse}
          loading={locationLoading}
          setValueInput={setValInputWarehouse}
          optionsText={messageOptionLoc}
        />
      </Fragment>
    )
  )
}
