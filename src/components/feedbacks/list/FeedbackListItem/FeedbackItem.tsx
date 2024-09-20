import styles from '../../Feedbacks.module.scss'
import { FC, useState } from 'react'
import { Rating } from '../Rating'
import { Review } from '../../../../redux/feedbacks/slice'
import { ModalCustom } from '../../../Modal-custom-btn/ModalCustomWindow'

type Props = {
  review: Review
}

const FeedbackItem: FC<Props> = ({ review }) => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const {
    description,
    created_at,
    rating,
    images,
    user: { first_name }
  } = review

  const date = new Date(created_at)
  const formattedDate = date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return (
    <li className={styles.feedbackItem}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <h3 className={styles.name}>{first_name}</h3>
          <Rating rating={rating} />
        </div>
        <span className={styles.date}>{formattedDate}</span>
      </div>
      <p className={styles.review}>{description}</p>
      <img
        onClick={images[0]?.image_url ? handleOpenModal : undefined}
        className={styles.feedbackPhoto}
        src={images[0]?.image_url}
        alt=""
      />
      <ModalCustom openModal={openModal} setOpenModal={setOpenModal}>
        <div>
          <img
            style={{ width: '100%', height: '100%' }}
            src={images[0]?.image_url}
            alt=""
          />
        </div>
      </ModalCustom>
    </li>
  )
}

export default FeedbackItem
