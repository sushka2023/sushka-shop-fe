import CrmImages from '../../components/Crm-images/crmImages'
import DescriptionField from './DescriptionField'
import styles from './crmAddNewProduct.module.scss'

const DescriptionProduct = ({
  formErrors,
  nameInputRef,
  descriptionRef,
  handleChangeFormData
}) => {
  return (
    <div className={styles.inputsWrapp}>
      <div className={styles.descriptionWrapp}>
        <DescriptionField
          id="name"
          label="Назва товару*"
          type="text"
          minLength={6}
          maxLength={50}
          formErrors={formErrors}
          inputRef={nameInputRef}
          handleChangeFormData={handleChangeFormData}
        />
        <DescriptionField
          id="description"
          label="Опис*"
          type="textarea"
          minLength={6}
          maxLength={150}
          formErrors={formErrors}
          inputRef={descriptionRef}
          handleChangeFormData={handleChangeFormData}
          className={'descriptionTextaria'}
        />
      </div>
      <CrmImages />
    </div>
  )
}

export default DescriptionProduct
