import React, { FC, RefObject } from 'react'

type CityDefaultProps = {
  setDefaultCityValue: (city: string) => void
  autocompleteRef: RefObject<HTMLDivElement> | null
  getNovaPoshtaCity: any
  defaultCityValue: any
  setLoading: any
}
const cityDefault = [
  'м. Київ, Київська обл.',
  'м. Львів, Львівська обл.',
  'Одеса',
  'Дніпро',
  'Харків',
  'Рівне'
]

export const CityDefault: FC<CityDefaultProps> = ({
  setDefaultCityValue,
  autocompleteRef,
  getNovaPoshtaCity,
  defaultCityValue,
  setLoading
}) => {
  const handleIndexCity = async (item: string) => {
    if (item !== defaultCityValue) {
      setLoading(true) // Встановлюємо прапорець загрузки
      try {
        // Очікуємо завершення запиту та отримуємо дані
        await getNovaPoshtaCity(item)
        // Після успішного отримання даних встановлюємо значення defaultCityValue
        setDefaultCityValue(item)
        // Завершивши запит та встановивши значення, можемо зняти прапорець загрузки
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    if (autocompleteRef && autocompleteRef.current) {
      autocompleteRef.current.focus()
    }
  }

  return (
    <React.Fragment>
      {cityDefault.map((item, index) => (
        <span
          key={index}
          onClick={() => {
            handleIndexCity(item)
          }}
          style={{
            margin: '15px',
            color: '#5D5FEF',
            borderBottom: '1px solid #5D5FEF',
            cursor: 'pointer'
          }}
        >
          {item}
        </span>
      ))}
    </React.Fragment>
  )
}
