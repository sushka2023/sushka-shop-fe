import IconButton from '@mui/material/IconButton'
import styles from '../ReviewsListItem/reviews-list-item.module.scss'
import Tooltip from '@mui/material/Tooltip'
import IconPlus from '../../../../icons/plus.svg?react'
import { FC } from 'react'

type UnArchiveButton = {
  isDeleted: boolean
  onRemove: () => void
}

const UnArchiveButton: FC<UnArchiveButton> = ({ isDeleted, onRemove }) => {
  return (
    <Tooltip title="Edit">
      <IconButton disabled={isDeleted} onClick={onRemove}>
        <IconPlus
          className={`${isDeleted ? styles.iconDisabled : styles.iconChange}`}
        />
      </IconButton>
    </Tooltip>
  )
}

export default UnArchiveButton
