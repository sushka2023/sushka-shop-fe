import { FC } from 'react'
import styles from './CrmAddNewProduct.module.scss'

type Props = {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckboxColumn: FC<Props> = ({ id, checked, onChange }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        id={`customCheckboxSale${id}`}
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked)
        }}
      />
      <label htmlFor={`customCheckboxSale${id}`}></label>
    </div>
  )
}

export default CheckboxColumn
