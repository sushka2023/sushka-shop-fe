import { createPortal } from 'react-dom'
import { CSSTransition, Transition } from 'react-transition-group'
import IconClose from '../../icons/close.svg?react'
import styles from './modal-portal.module.scss'

const ModalPortal = ({ children, isModalOpen, setIsModalOpen }) => {

  const TIMEOUT_DELAY_MS = 500

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
                  onClick={() => setIsModalOpen(false)}
                />
                {children}
              </div>
            )
          }}
        </Transition>
      </div>
    </CSSTransition>
  )

  return createPortal(modalContent, document.getElementById('modal-root-form'))
}

export default ModalPortal
