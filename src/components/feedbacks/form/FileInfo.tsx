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
  isVisible: boolean
}

const UNITS = ['KB', 'MB', 'GB']
const SIZE = 1024

export const FileInfo: FC<Props> = ({ file, onDelete, isVisible }) => {
  const formatFileSize = (size: number | null): string => {
    if (size === undefined || size === null) {
      return 'Невідомий розмір'
    }

    const [formattedSize, unit] = UNITS.reduce(
      ([currentSize, currentUnit], nextUnit) => {
        return currentSize >= SIZE
          ? [currentSize / 1024, nextUnit]
          : [currentSize, currentUnit]
      },
      [size, 'KB']
    )

    return `${formattedSize.toFixed(2)} ${unit}`
  }

  return isVisible ? (
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
  ) : null
}
