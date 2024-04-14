import styles from './ModalProductLimits.module.scss'
import IconArrowClose from '../../icons/closemodal.svg?react'
import IconTriangle from '../../icons/triangle.svg?react'
import { Popover, Typography } from '@mui/material'
import { FC } from 'react'

type ModalProductLimitsProps = {
  open: boolean
  anchorEl: HTMLElement | null
  onClick: () => void
}

export const ModalProductLimits: FC<ModalProductLimitsProps> = ({
  open,
  anchorEl,
  onClick
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClick}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      slotProps={{
        paper: {
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            boxShadow: 'none',
            marginTop: '-15px'
          }
        }
      }}
      classes={{ paper: styles.popover }}
    >
      <div className={styles.modal}>
        <button
          onClick={onClick}
          type="button"
          className={styles.btnCloseModal}
        >
          <IconArrowClose className={styles.iconCloseModal} />
        </button>
        <Typography className={styles.modalText}>
          При замовленні більше, ніж 10 одиниць одного виду товару, термін
          виготовлення замовлення може бути більшим. Менеджер зв’яжеться з Вами
          для уточнення термінів.
        </Typography>
      </div>

      <IconTriangle className={styles.iconTriangle} />
    </Popover>
  )
}
