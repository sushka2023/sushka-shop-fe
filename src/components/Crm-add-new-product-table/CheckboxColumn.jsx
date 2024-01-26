import styles from './CrmAddNewProduct.module.scss'

const CheckboxColumn = ({ id, checked, onChange }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        id={`customCheckboxSale${id}`}
        checked={checked}
        onChange={(e) => {
          return onChange(e.target.checked)
        }}
      />
      <label htmlFor={`customCheckboxSale${id}`}></label>
    </div>
  )
}

export default CheckboxColumn
