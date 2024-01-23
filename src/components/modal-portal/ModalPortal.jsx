import { createPortal } from 'react-dom'
import { CSSTransition, Transition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModal } from '../../Redax/Auth/slices/auth-slice'
import { selectModal } from '../../Redax/Auth/selectors/Selectors'
import IconClose from '../../icons/close.svg'
import styles from './modal-portal.module.scss'

const ModalPortal = ({ children }) => {
  const isOpen = useSelector(selectModal)
  const dispatch = useDispatch()

  const modalContent = (
    <CSSTransition
      in={isOpen}
      timeout={500}
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
        <Transition in={isOpen} timeout={500} unmountOnExit mountOnEnter>
          {(state) => {
            return (
              <div className={`${styles.modal} ${styles[state]}`}>
                <IconClose
                  className={styles.closeIcon}
                  onClick={() => {
                    dispatch(toggleModal(false))
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

  return createPortal(modalContent, document.getElementById('modal-root-form'))
}

export default ModalPortal
