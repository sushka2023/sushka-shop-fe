import { FC } from 'react'
import styles from '../Crm-images/crmImages.module.scss'

type FilePreviewProps = {
  imageUrl: string
  fileName: string
}

export const FilePreview: FC<FilePreviewProps> = ({ imageUrl, fileName }) => {
  return <img src={imageUrl} alt={fileName} className={styles.filePreview} />
}
