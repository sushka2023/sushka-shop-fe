import { FC } from 'react'
import styles from '../Crm-images/crmImages.module.scss'
import FileIcon from '../../icons/file.svg?react'
import StarIcon from '../../icons/star.svg?react'
import DeleteIcon from '../../icons/delete.svg?react'

type FileItemProps = {
  file: any
  isActive: boolean
  onStarClick: (file: string) => void
  onDeleteClick: (file: string) => void
  onMouseDown: (file: string) => void
  onMouseUp: () => void
  isProduct: boolean
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
  return (
    <li key={file.id}>
      {!isProduct && (
        <StarIcon
          className={`${styles.starIcon} ${isActive && styles.starIconActive}`}
          onClick={() => onStarClick(file.name)}
        />
      )}
      <div className={styles.fileLineWrrap}>
        <div
          className={styles.fileContentWrrap}
          onMouseDown={() => onMouseDown(file.name)}
          onMouseUp={onMouseUp}
        >
          <FileIcon style={{ cursor: 'pointer' }} />
          <span className={styles.fileName}>
            {isProduct ? file.description : file.name}
          </span>
        </div>
        {!isProduct && (
          <DeleteIcon
            className={styles.deleteIcon}
            onClick={() => onDeleteClick(file.name)}
          />
        )}
      </div>
    </li>
  )
}
