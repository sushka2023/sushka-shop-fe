import { FC } from 'react'
import styles from '../Crm-images/crmImages.module.scss'
import FileIcon from '../../icons/file.svg?react'
import StarIcon from '../../icons/star.svg?react'
import DeleteIcon from '../../icons/delete.svg?react'
import { ImageResponse } from '../../types'
import { FileType } from './FileList'

type FileItemProps = {
  file: FileType
  isActive: boolean
  onStarClick: (fileIdentifier: string) => void
  onDeleteClick: (fileIdentifier: string) => void
  onMouseDown: (fileIdentifier: string) => void
  onMouseUp: () => void
  isProduct: boolean
}

const getFileIdentifier = (file: FileType, isProduct: boolean) => {
  return isProduct ? (file as ImageResponse).id.toString() : (file as File).name
}

const getFileName = (file: FileType, isProduct: boolean) => {
  return isProduct ? (file as ImageResponse).description : (file as File).name
}

export const FileItem: FC<FileItemProps> = ({
  file,
  isActive,
  onStarClick,
  onDeleteClick,
  onMouseDown,
  onMouseUp,
  isProduct
}) => {
  const fileIdentifier = getFileIdentifier(file, isProduct)
  const fileName = getFileName(file, isProduct)

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10
      }}
    >
      {!isProduct && (
        <StarIcon
          className={`${styles.starIcon} ${isActive ? styles.starIconActive : ''}`}
          onClick={() => onStarClick(fileIdentifier)}
        />
      )}
      <div className={styles.fileLineWrrap}>
        <div
          className={styles.fileContentWrrap}
          onMouseDown={() => onMouseDown(fileIdentifier)}
          onMouseUp={onMouseUp}
        >
          <FileIcon style={{ cursor: 'pointer' }} />
          <span className={styles.fileName}>{fileName}</span>
        </div>
        {!isProduct && (
          <DeleteIcon
            className={styles.deleteIcon}
            onClick={() => onDeleteClick(fileIdentifier)}
          />
        )}
      </div>
    </div>
  )
}
