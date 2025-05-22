import { FC } from 'react'
import styles from './CrmAddNewProduct.module.scss'

type Props = {
  value: string | null
  onChange: (value: string) => void
  className?: string
}

const NumericTextInput: FC<Props> = ({ value, onChange, className }) => {
  return (
    <input
      className={`${styles.inputTable} ${value ? styles.inputTableTextEmpty : ''} ${className}`}
      type="text"
      value={value || ''}
      onChange={(e) => {
        onChange(e.target.value)
      }}
    />
  )
}

export default NumericTextInput
