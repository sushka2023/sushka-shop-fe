import { useSearchParams, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { CSSTransition, Transition } from 'react-transition-group'
import IconClose from '../../icons/close.svg?react'
import styles from './modal-portal.module.scss'
import { FC, ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { resetAuth } from '../../redux/authentication/slice'

const TIMEOUT_DELAY_MS = 500

type Props = {
  children: ReactNode
  isModalOpen: boolean
  searchToken?: string | null
  setIsModalOpen: (isModalOpen: boolean) => void
}

const ModalPortal: FC<Props> = ({
  children,
  isModalOpen,
  setIsModalOpen,
  searchToken
}) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    isModalOpen
      ? document.body.classList.add(styles.modalOpen)
      : document.body.classList.remove(styles.modalOpen)
  }, [isModalOpen])

  const closeModal = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (e.target !== e.currentTarget) return

    dispatch(resetAuth())
    if (searchToken) {
      const searchKey = Object.keys(searchToken)[0]
      searchParams.delete(searchKey)
      navigate({ search: searchParams.toString() })
      setIsModalOpen(false)
      return
    }
    setIsModalOpen(false)
  }

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
      <div className={styles.overlay} onClick={(e) => closeModal(e)}>
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
                  onClick={(e) => closeModal(e)}
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
