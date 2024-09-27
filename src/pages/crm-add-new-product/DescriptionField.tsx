/* eslint-disable complexity */
import { Ref, forwardRef } from 'react'
import styles from './crmAddNewProduct.module.scss'

type Props = {
  id: string
  label: string
  type: string
  minLength: number
  maxLength: number
  formErrors: Record<string, string>
  className?: string
  disabled?: boolean
  handleChangeFormData: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
}

const DescriptionField = forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  Props
>(
  (
    {
      id,
      label,
      type,
      minLength,
      maxLength,
      formErrors,
      handleChangeFormData,
      className,
      disabled
    },
    ref
  ) => {
    return (
      <label
        htmlFor={id}
        className={`${styles.label} ${formErrors[id] ? styles.error : ''}`}
        style={{ cursor: disabled ? 'auto' : 'pointer' }}
      >
        {label}
        {type === 'textarea' ? (
          <textarea
            ref={ref as Ref<HTMLTextAreaElement>}
            onChange={handleChangeFormData}
            minLength={minLength}
            maxLength={maxLength}
            id={id}
            name={id}
            className={`${styles.nameInput} ${formErrors[id] ? styles.errorInput : ''} ${styles[className!]}`}
            disabled={disabled}
          />
        ) : (
          <input
            ref={ref as Ref<HTMLInputElement>}
            onChange={handleChangeFormData}
            type={type}
            minLength={minLength}
            maxLength={maxLength}
            id={id}
            name={id}
            className={`${styles.nameInput} ${formErrors[id] ? styles.errorInput : ''} ${styles[className!]}`}
            disabled={disabled}
          />
        )}
        {formErrors[id] && (
          <p className={styles.errorMessage}>{formErrors[id]}</p>
        )}
      </label>
    )
  }
)

export default DescriptionField
