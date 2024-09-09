import styles from './reviews-list-item.module.scss'
import { ReviewsRating } from '../ReviewsRating/ReviewsRating'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ChangeIcon from '../../../../icons/crm-file.svg?react'
import { ModalCustom } from '../../../../components/Modal-custom-btn/ModalCustomWindow'
import { useState } from 'react'
import axiosInstance from '../../../../axios/settings'
import { ReviewResponse } from '../../../../types'
import ArchiveButton from '../ArchiveButton/ArchiveButton'
import UnArchiveButton from '../UnArchiveButton/UnArchiveButton'

type ReviewsListItemProps = {
  item: ReviewResponse
  onStatusChange: () => void
}

const handleRemoveFromArchive = async (
  id: number,
  is_checked: boolean,
  onStatusChange: () => void
) => {
  try {
    await axiosInstance.put('/api/reviews/unarchive', { id })
    if (!is_checked) {
      await axiosInstance.put('/api/reviews/check_review', { id })
    }
    onStatusChange()
  } catch (err) {
    console.error(err)
  }
}

const handleAddToArchive = async (id: number, onStatusChange: () => void) => {
  try {
    await axiosInstance.put('/api/reviews/archive', { id })
    onStatusChange()
  } catch (err) {
    console.error(err)
  }
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
    is_checked,
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

  return (
    <div className={styles.item}>
      <span
        className={`${styles.span} ${!is_deleted ? styles.spanActive : ''}`}
      ></span>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <p className={styles.name}>{first_name}</p>
          <ReviewsRating rating={rating} />
          <p className={styles.date}>{formattedDate}</p>
        </div>
        <p className={styles.description}>{description}</p>

        <div className={styles.buttonsWrapper}>
          {images && images.length > 0 && images[0]?.image_url && (
            <div>
              <Tooltip title="File">
                <IconButton onClick={handleOpenModal}>
                  <ChangeIcon className={styles.iconFile} />
                </IconButton>
              </Tooltip>
              <ModalCustom openModal={openModal} setOpenModal={setOpenModal}>
                <div>
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={images[0].image_url}
                    alt=""
                  />
                </div>
              </ModalCustom>
            </div>
          )}
          <ArchiveButton
            isDeleted={isDeleteDisabled}
            onAdd={() => handleAddToArchive(id, onStatusChange)}
          />
          <UnArchiveButton
            isDeleted={isDeleteDisabled}
            onRemove={() =>
              handleRemoveFromArchive(id, is_checked, onStatusChange)
            }
          />
        </div>
      </div>
    </div>
  )
}
