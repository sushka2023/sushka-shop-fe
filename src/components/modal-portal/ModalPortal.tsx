import { createPortal } from 'react-dom'
import { CSSTransition, Transition } from 'react-transition-group'
import IconClose from '../../icons/close.svg?react'
import styles from './modal-portal.module.scss'
import { FC, ReactNode } from 'react'

const TIMEOUT_DELAY_MS = 500

type Props = {
  children: ReactNode
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

const ModalPortal: FC<Props> = ({ children, isModalOpen, setIsModalOpen }) => {
  const modalContent = (
    <CSSTransition
      in={isModalOpen}
      timeout={TIMEOUT_DELAY_MS}
      classNames={{
        enter: styles.overlayEnter,
        enterActive: styles.overlayEnterActive,
        exit: styles.overlayExit,
        exitActive: styles.overlayExitActive
      }}
      unmountOnExit
      mountOnEnter
    >
      <div className={styles.overlay}>
        <Transition
          in={isModalOpen}
          timeout={TIMEOUT_DELAY_MS}
          unmountOnExit
          mountOnEnter
        >
          {(state) => {
            return (
              <div className={`${styles.modal} ${styles[state]}`}>
                <IconClose
                  className={styles.closeIcon}
                  onClick={() => {
                    return setIsModalOpen(false)
                  }}
                />
                {children}
              </div>
            )
          }}
        </Transition>
      </div>
    </CSSTransition>
  )

  return createPortal(
    modalContent,
    document.getElementById('modal-root-form') as HTMLElement
  )
}

export default ModalPortal
