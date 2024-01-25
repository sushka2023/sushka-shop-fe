import { createPortal } from 'react-dom'
import styles from './ModalProductLimits.module.scss'
import IconArrowClose from '../../icons/closemodal.svg?react'
import IconTriangle from '../../icons/triangle.svg?react'
import { FC } from 'react'

const modalRoot = document.querySelector(
  '#modal-root-product-limits'
) as HTMLElement

type Props = {
  onClick: () => void
}

export const ModalProductLimits: FC<Props> = ({ onClick }) => {
  return createPortal(
    <div className={styles.modal}>
      <p className={styles.modalText}>
        При замовленні більше, ніж 10 одиниць одного виду товару, термін
        виготовлення замовлення може бути більшим. Менеджер зв’яжеться з Вами
        для уточнення термінів.
      </p>
      <button onClick={onClick} type="button" className={styles.btnCloseModal}>
        <IconArrowClose />
      </button>
      <IconTriangle className={styles.iconTriangle} />
    </div>,
    modalRoot
  )
}
