import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined'
import styles from '../Feedbacks.module.scss'
import { FC } from 'react'

type File = {
  name: string
  size: number | null
}

type Props = {
  file: File
  onDelete: () => void
}

const units = ['KB', 'MB', 'GB']

export const FileInfo: FC<Props> = ({ file, onDelete }) => {
  const formatFileSize = (size: number | null): string => {
    if (size === undefined || size === null) {
      return 'Невідомий розмір'
    }

    const [formattedSize, unit] = units.reduce(
      ([currentSize, currentUnit], nextUnit) => {
        return currentSize >= 1024
          ? [currentSize / 1024, nextUnit]
          : [currentSize, currentUnit]
      },
      [size, 'KB']
    )

    return `${formattedSize.toFixed(2)} ${unit}`
  }

  return (
    <div className={styles.fileInfo}>
      <div>
        <PermMediaOutlinedIcon />
        <div className={styles.fileInfoWrapper}>
          <span>{file.name}</span>
          <span>{formatFileSize(file.size)}</span>
        </div>
      </div>
      <button type="button" className={styles.deleteBtn} onClick={onDelete}>
        <DeleteOutlineOutlinedIcon />
      </button>
    </div>
  )
}
