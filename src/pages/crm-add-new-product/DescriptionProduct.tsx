import { FC, Ref } from 'react'
import CrmImages from '../../components/Crm-images'
import DescriptionField from './DescriptionField'
import styles from './crmAddNewProduct.module.scss'

type Props = {
  formErrors: Record<string, string>
  nameInputRef: Ref<HTMLInputElement>
  descriptionRef: Ref<HTMLTextAreaElement>
  handleChangeFormData: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
}

const DescriptionProduct: FC<Props> = ({
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
          ref={nameInputRef}
          handleChangeFormData={handleChangeFormData}
        />
        <DescriptionField
          id="description"
          label="Опис*"
          type="textarea"
          minLength={6}
          maxLength={150}
          formErrors={formErrors}
          ref={descriptionRef}
          handleChangeFormData={handleChangeFormData}
          className={'descriptionTextaria'}
        />
      </div>
      <CrmImages />
    </div>
  )
}

export default DescriptionProduct
