import {
  FC,
  useEffect,
  useCallback,
  useMemo,
  useState,
  Fragment,
  SyntheticEvent
} from 'react'
import { ErrorMessage } from '../Error/Error'
import { AutocompleteCustom } from '../Autocomplete/AutocompleteCustom'
import { useNovaPoshtaLocations } from '../../hooks/useNovaPoshtaLocations'
import { useNovaPoshtaCity } from '../../hooks/useNovaPoshtaCity'
import { FormProps } from './RadioForm'
import { generateOptionsData } from '../../utils/nova-poshta/branches'

const url = '/api/nova_poshta/warehouses/branches/'
const numSearch = 1

export const NovaPoshtaBranch: FC<FormProps> = ({
  selectedValue,
  errors,
  register,
  setValue,
  clearErrors
}) => {
  const [valInputWarehouse, setValInputWarehouse] = useState<string>('')
  const [selectedWarehouseValue, setSelectedWarehouseValue] = useState<
    string | null
  >(null)

  const {
    warehouses,
    setSettleRef,
    setNewRequest,
    messageOptionLoc,
    loading: locationLoading
  } = useNovaPoshtaLocations({
    url,
    numSearch,
    valInputWarehouse,
    setValInputWarehouse
  })

  const {
    valInputCity,
    setValInputCity,
    loading: cityLoading,
    options,
    novaPoshtaCity,
    CITY_DEFAULT,
    getDefaultCityRef,
    getCityRef,
    messageOptionCity
  } = useNovaPoshtaCity()

  const [isDisabled, setIsDisabled] = useState(!valInputCity)

  useEffect(() => {
    setIsDisabled(!valInputCity)
    setSelectedWarehouseValue(null)
  }, [valInputCity])

  useEffect(() => {
    setValInputCity('')
  }, [selectedValue])

  useEffect(() => {
    setSelectedWarehouseValue(null)
    setValue('branches', null)
  }, [!valInputWarehouse])

  useEffect(() => {
    if (isDisabled) {
      setValue('cityBranches', null)
      setValue('branches', null)
      setValInputWarehouse('')
      setSelectedWarehouseValue(null)
      setNewRequest(true)
      clearErrors('branches')
    }
  }, [isDisabled])

  const optionsData = useMemo(() => {
    return generateOptionsData(warehouses)
  }, [warehouses])

  const onChangeCity = useCallback(
    (_event: SyntheticEvent<Element, Event>, value: string | null) => {
      setValue('cityBranches', value)
      setValInputCity(value ?? '')
      clearErrors('cityBranches')
      if (CITY_DEFAULT.some((city) => city.name === value)) {
        setSettleRef(getDefaultCityRef(value, CITY_DEFAULT))
        clearErrors('cityBranches')
      } else if (value && novaPoshtaCity.length > 0) {
        setSettleRef(getCityRef(value, novaPoshtaCity))
      } else {
        setSettleRef(null)
      }
    },
    []
  )

  const onChangeWarehouse = (
    _event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    const selectedWarehouse = optionsData.find(
      (option) => option.label === value
    )
    if (selectedWarehouse) {
      setValue('branches', selectedWarehouse.id)
      setValInputWarehouse(value ?? '')
      setSelectedWarehouseValue(value)
      setNewRequest(false)
    }
    clearErrors('branches')
  }

  return (
    selectedValue === 'novaPoshtaBranches' && (
      <Fragment>
        <ErrorMessage
          error={errors.cityBranches || errors.branches}
          styles={{ position: 'relative' }}
        />

        <AutocompleteCustom
          name="cityBranches"
          placeholder="Оберіть населений пункт"
          register={register}
          options={options}
          onChange={onChangeCity}
          loading={cityLoading}
          setValueInput={setValInputCity}
          noOptionsText={messageOptionCity}
        />

        <AutocompleteCustom
          name="branches"
          placeholder="Оберіть відділення"
          register={register}
          options={optionsData.map((option) => option.label)}
          disabled={isDisabled}
          value={isDisabled ? '' : selectedWarehouseValue}
          onChange={onChangeWarehouse}
          loading={locationLoading}
          setValueInput={setValInputWarehouse}
          noOptionsText={messageOptionLoc}
        />
      </Fragment>
    )
  )
}
