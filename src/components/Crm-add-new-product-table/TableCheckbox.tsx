import { FC } from 'react'
import styles from './CrmAddNewProduct.module.scss'

type Props = {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const TableCheckbox: FC<Props> = ({ id, checked, onChange }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.inputTable}
        id={`customCheckboxActive${id}`}
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          return onChange(e.target.checked)
        }}
      />
      <label htmlFor={`customCheckboxActive${id}`}></label>
    </div>
  )
}

export default TableCheckbox
