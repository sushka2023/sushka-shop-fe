import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import styles from '../ReviewsListItem/reviews-list-item.module.scss'
import DeleteIcon from '../../../../icons/delete.svg?react'
import { FC } from 'react'

type ArchiveButtonProps = {
  isDeleted: boolean
  onAdd: () => void
}

const ArchiveButton: FC<ArchiveButtonProps> = ({ isDeleted, onAdd }) => {
  return (
    <Tooltip title="Delete">
      <IconButton disabled={!isDeleted} onClick={onAdd}>
        <DeleteIcon
          className={`${!isDeleted ? styles.iconDisabled : styles.iconDelete}`}
        />
      </IconButton>
    </Tooltip>
  )
}

export default ArchiveButton
