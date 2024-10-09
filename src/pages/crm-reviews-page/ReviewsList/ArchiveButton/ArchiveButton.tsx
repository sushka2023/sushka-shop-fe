import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import styles from '../ReviewsListItem/reviews-list-item.module.scss'
import DeleteIcon from '../../../../icons/delete.svg?react'
import { FC } from 'react'
import clsx from 'clsx'

type Props = {
  onRemove: () => void
  isDisabled: boolean
}
const ArchiveButton: FC<Props> = ({ isDisabled, onRemove }) => {
  return (
    <Tooltip title="Delete">
      <IconButton onClick={onRemove} disabled={isDisabled}>
        <DeleteIcon
          className={clsx({
            [styles.iconDisabled]: isDisabled,
            [styles.iconDelete]: true
          })}
        />
      </IconButton>
    </Tooltip>
  )
}
export { ArchiveButton }
