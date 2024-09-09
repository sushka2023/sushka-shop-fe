import FeedbackForm from '../../components/feedbacks/form/FeedbackForm'
import styles from './FeedbackPage.module.scss'
import { useEffect, useState } from 'react'
import { fetchReviews } from '../../redux/feedbacks/operations'
import { useDispatch } from 'react-redux'
import FeedbackItem from '../../components/feedbacks/list/FeedbackItem'
import { ModalCustom } from '../../components/Modal-custom-btn/ModalCustomWindow'
import { useMediaQuery } from '@mui/material'
import { AppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Review } from '../../redux/feedbacks/slice'

const LIMIT = 10
const OFFSET = 0
const FeedbackPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const isDesktop = useMediaQuery('(min-width:768px)')

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchReviews({ limit: LIMIT, offset: OFFSET }))
  }, [dispatch])
  const reviews = useSelector((state: RootState) => state.reviews.items)

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
          <ul className={styles.feedbackList}>
            {reviews.map((review: Review) => (
              <FeedbackItem review={review} key={review.id} />
            ))}
          </ul>
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
