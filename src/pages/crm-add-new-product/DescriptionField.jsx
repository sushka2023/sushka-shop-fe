import styles from './crmAddNewProduct.module.scss'

const DescriptionField = ({
  id,
  label,
  type,
  minLength,
  maxLength,
  formErrors,
  inputRef,
  handleChangeFormData,
  className
}) => {
  const InputComponent = type === 'textarea' ? 'textarea' : 'input'

  return (
    <label
      htmlFor={id}
      className={`${styles.label} ${formErrors[id] ? styles.error : ''}`}
    >
      {label}
      <InputComponent
        ref={inputRef}
        onChange={handleChangeFormData}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        id={id}
        name={id}
        className={`${styles.nameInput} ${formErrors[id] ? styles.errorInput : ''} ${styles[className]}`}
      />
      {formErrors[id] && (
        <p className={styles.errorMessage}>{formErrors[id]}</p>
      )}
    </label>
  )
}

export default DescriptionField
