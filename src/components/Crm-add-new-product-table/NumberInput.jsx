import styles from './CrmAddNewProduct.module.scss'

const NumberInput = ({ value, onChange, className }) => {
  return (
    <input
      className={`${styles.inputTable} ${className}`}
      type="number"
      value={value || ''}
      onChange={(e) => {
        return onChange(e.target.value)
      }}
    />
  )
}

export default NumberInput
