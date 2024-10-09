import FeedbackForm from '../../components/feedbacks/form/FeedbackForm'
import styles from './FeedbackPage.module.scss'
import { useState } from 'react'
import { ModalCustom } from '../../components/Modal-custom-btn/ModalCustomWindow'
import { useMediaQuery } from '@mui/material'
import { FeedbackList } from '../../components/feedbacks/list/FeedbackList'

const FeedbackPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const isDesktop = useMediaQuery('(min-width:768px)')

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperTitleButton}>
          <h2 className={styles.title}>Відгуки</h2>
          <button
            type="button"
            className={styles.button}
            onClick={handleOpenModal}
          >
            Залишити відгук
          </button>
        </div>
        <div className={styles.feedbacksWrapper}>
          <FeedbackList />
          <ModalCustom openModal={openModal} setOpenModal={setOpenModal}>
            <FeedbackForm onSubmitSuccess={() => setOpenModal(true)} />
          </ModalCustom>
          {isDesktop && (
            <FeedbackForm onSubmitSuccess={() => setOpenModal(false)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
