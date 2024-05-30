import React, { FC, RefObject } from 'react'

type CityDefaultProps = {
  setDefaultCityValue: (city: string) => void
  autocompleteRef: RefObject<HTMLDivElement> | null
}
const cityDefault = ['Київ', 'Львів', 'Одеса', 'Дніпро', 'Харків', 'Рівне']

export const CityDefault: FC<CityDefaultProps> = ({
  setDefaultCityValue,
  autocompleteRef
}) => {
  const handleIndexCity = (item: string) => {
    setDefaultCityValue(item)
    if (autocompleteRef && autocompleteRef.current) {
      autocompleteRef.current.focus()
    }
  }

  return (
    <React.Fragment>
      {cityDefault.map((item, index) => (
        <span
          key={index}
          onClick={() => handleIndexCity(item)}
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
