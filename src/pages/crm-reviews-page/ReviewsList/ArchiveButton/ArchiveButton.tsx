import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import styles from '../ReviewsListItem/reviews-list-item.module.scss'
import DeleteIcon from '../../../../icons/delete.svg?react'
import { FC } from 'react'
import clsx from 'clsx'

type Props = {
  isDeleted: boolean
  onAdd: () => void
}

const ArchiveButton: FC<Props> = ({ isDeleted, onAdd }) => {
  return (
    <Tooltip title="Delete">
      <IconButton disabled={!isDeleted} onClick={onAdd}>
        <DeleteIcon
          className={clsx({
            [styles.iconDisabled]: !isDeleted,
            [styles.iconDelete]: isDeleted
          })}
        />
      </IconButton>
    </Tooltip>
  )
}

export { ArchiveButton }
