import styles from './CrmAddNewProduct.module.scss'

const TableCheckbox = ({ id, checked, onChange }) => {
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
