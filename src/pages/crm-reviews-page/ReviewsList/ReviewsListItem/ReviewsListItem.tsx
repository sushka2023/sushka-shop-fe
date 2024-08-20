// import styles from './reviews-list-item.module.scss'
import styles from './reviews-list-item.module.scss'
import IconPlus from '../../../../icons/plus.svg?react'
import { ReviewsRating } from '../ReviewsRating/ReviewsRating'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '../../../../icons/delete.svg?react'
import Tooltip from '@mui/material/Tooltip'
import ChangeIcon from '../../../../icons/crm-file.svg?react'
import { ModalCustom } from '../../../../components/Modal-custom-btn/ModalCustomWindow'
import { useState } from 'react'
import axiosInstance from '../../../../axios/settings'
import { ReviewResponse } from '../../../../types'

type ReviewsListItemProps = {
  item: ReviewResponse
  onStatusChange: () => void
}

export const ReviewsListItem = ({
  item,
  onStatusChange
}: ReviewsListItemProps) => {
  const {
    is_deleted,
    id,
    rating,
    description,
    images,
    created_at,
    user: { first_name }
  } = item

  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const isDeleteDisabled = !is_deleted
  const date = new Date(created_at)
  const formattedDate = date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const handleAddToArchive = async () => {
    try {
      await axiosInstance.put('/api/reviews/archive', { id })
      onStatusChange()
    } catch (err) {
      console.error(err)
    }
  }

  const handleRemoveFromArchive = async () => {
    try {
      await axiosInstance.put('/api/reviews/unarchive', { id })
      onStatusChange()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.item}>
      <span
        className={`${styles.span} ${is_deleted ? styles.spanActive : ''}`}
      ></span>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <p className={styles.name}>{first_name}</p>
          <ReviewsRating rating={rating} />
          <p className={styles.date}>{formattedDate}</p>
        </div>
        <p className={styles.description}>{description}</p>
        <IconPlus className={styles.icon} />

        <div className={styles.buttonsWrapper}>
          {images.length > 0 && (
            <Tooltip title="File">
              <IconButton onClick={handleOpenModal}>
                <ChangeIcon className={styles.iconFile} />
              </IconButton>
            </Tooltip>
          )}
          <ModalCustom openModal={openModal} setOpenModal={setOpenModal}>
            <div>
              <img
                style={{ width: '100%', height: '100%' }}
                src={images[0].image_url}
                alt=""
              />
            </div>
          </ModalCustom>
          <Tooltip title="Delete">
            <IconButton
              disabled={isDeleteDisabled}
              onClick={handleRemoveFromArchive}
            >
              <DeleteIcon
                className={`${isDeleteDisabled ? styles.iconDisabled : styles.iconDelete}`}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              disabled={!isDeleteDisabled}
              onClick={handleAddToArchive}
            >
              <IconPlus
                className={`${!isDeleteDisabled ? styles.iconDisabled : styles.iconChange}`}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
