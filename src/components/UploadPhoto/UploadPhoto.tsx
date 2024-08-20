import { FC, Fragment } from 'react'
import styles from '../Crm-images/crmImages.module.scss'
import PlusIcon from '../../icons/plus.svg?react'

type Props = {
  product: any
  formErrors: any
  filesArr: any
}

export const UploadPhoto: FC<Props> = ({ product, formErrors, filesArr }) => {
  return (
    !product && (
      <Fragment>
        <label
          htmlFor="file"
          className={`${styles.fileLabel} ${filesArr.length >= 4 && styles.fileLabelDisabled}`}
        >
          Завантажити фото
          <PlusIcon
            className={`${styles.plusIcon} ${filesArr.length >= 4 && styles.plusIconDisabled}`}
          />
        </label>
        {formErrors.images && (
          <p className={styles.imagesError}>{formErrors.images}</p>
        )}
      </Fragment>
    )
  )
}
