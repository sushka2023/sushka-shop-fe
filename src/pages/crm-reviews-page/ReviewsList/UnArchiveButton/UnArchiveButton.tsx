import IconButton from '@mui/material/IconButton'
import styles from '../ReviewsListItem/reviews-list-item.module.scss'
import Tooltip from '@mui/material/Tooltip'
import IconPlus from '../../../../icons/plus.svg?react'
import { FC } from 'react'
import clsx from 'clsx'

type Props = {
  isDisabled: boolean
  onAdd: () => void
}

const UnArchiveButton: FC<Props> = ({ isDisabled, onAdd }) => {
  return (
    <Tooltip title="Edit">
      <IconButton disabled={isDisabled} onClick={onAdd}>
        <IconPlus
          className={clsx({
            [styles.iconDisabled]: isDisabled,
            [styles.iconChange]: !isDisabled
          })}
        />
      </IconButton>
    </Tooltip>
  )
}

export { UnArchiveButton }
