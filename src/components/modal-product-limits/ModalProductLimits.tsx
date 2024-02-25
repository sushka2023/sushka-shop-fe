import styles from './ModalProductLimits.module.scss'
import IconArrowClose from '../../icons/closemodal.svg?react'
import IconTriangle from '../../icons/triangle.svg?react'
import { FC } from 'react'

type Props = {
  onClick: () => void
  customStyles: string
}

export const ModalProductLimits: FC<Props> = ({ onClick, customStyles }) => {
  return (
    <div className={`${styles.modal} ${customStyles}`}>
      <p className={styles.modalText}>
        При замовленні більше, ніж 10 одиниць одного виду товару, термін
        виготовлення замовлення може бути більшим. Менеджер зв’яжеться з Вами
        для уточнення термінів.
      </p>
      <button onClick={onClick} type="button" className={styles.btnCloseModal}>
        <IconArrowClose className={styles.iconCloseModal} />
      </button>
      <IconTriangle className={styles.iconTriangle} />
    </div>
  )
}
