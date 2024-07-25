import FeedbackForm from '../../components/feedbacks/form/FeedbackForm'
import styles from './FeedbackPage.module.scss'
import { useEffect, useState } from 'react'
import { fetchReviews } from '../../redux/feedbacks/operations'
import { useDispatch } from 'react-redux'
import FeedbackItem from '../../components/feedbacks/list/FeedbackItem'
import { ModalCustom } from '../../components/Modal-custom-btn/ModalCustomWindow'

const LIMIT = 5
const OFFSET = 0
const FeedbackPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReviews({ limit: LIMIT, offset: OFFSET }))
  }, [])
  // const reviews = useSelector((state: RootState) => state.reviews.items)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Відгуки</h2>
        <button
          type="button"
          className={styles.button}
          onClick={handleOpenModal}
        >
          Залишити відгук
        </button>
        <div className={styles.feedbacksWrapper}>
          <ul className={styles.feedbackList}>
            <FeedbackItem reviews={[]} />
          </ul>
          <ModalCustom openModal={openModal} setOpenModal={setOpenModal}>
            <FeedbackForm />
          </ModalCustom>
          <FeedbackForm />
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
