import IconButton from '@mui/material/IconButton'
import styles from '../ReviewsListItem/reviews-list-item.module.scss'
import Tooltip from '@mui/material/Tooltip'
import IconPlus from '../../../../icons/plus.svg?react'
import { FC } from 'react'
import clsx from 'clsx'

type Props = {
  isDeleted: boolean
  onRemove: () => void
}

const UnArchiveButton: FC<Props> = ({ isDeleted, onRemove }) => {
  return (
    <Tooltip title="Edit">
      <IconButton disabled={isDeleted} onClick={onRemove}>
        <IconPlus
          className={clsx({
            [styles.iconDisabled]: isDeleted,
            [styles.iconChange]: !isDeleted
          })}
        />
      </IconButton>
    </Tooltip>
  )
}

export { UnArchiveButton }
