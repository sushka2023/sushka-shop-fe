import { FC } from 'react'
import styles from './CrmAddNewProduct.module.scss'

type Props = {
  value: number
  onChange: (value: string) => void
  className?: string
}

const NumberInput: FC<Props> = ({ value, onChange, className }) => {
  return (
    <input
      className={`${styles.inputTable} ${value ? styles.inputTableTextEmpty : ''} ${className}`}
      type="number"
      value={value || ''}
      onChange={(e) => {
        onChange(e.target.value)
      }}
    />
  )
}

export default NumberInput
