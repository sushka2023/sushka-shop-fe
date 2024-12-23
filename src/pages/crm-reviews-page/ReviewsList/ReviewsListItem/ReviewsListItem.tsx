import styles from './reviews-list-item.module.scss'
import { ReviewsRating } from '../ReviewsRating/ReviewsRating'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ChangeIcon from '../../../../icons/crm-file.svg?react'
import { ModalCustom } from '../../../../components/Modal-custom-btn/ModalCustomWindow'
import { useState } from 'react'
import axiosInstance from '../../../../axios/settings'
import { ReviewResponse } from '../../../../types'
import { ArchiveButton } from '../ArchiveButton/ArchiveButton'
import { UnArchiveButton } from '../UnArchiveButton/UnArchiveButton'

type ReviewsListItemProps = {
  item: ReviewResponse
  onStatusChange: () => void
}

const handleAddToArchive = async (
  id: number,
  is_deleted: boolean,
  onStatusChange: () => void
): Promise<void> => {
  try {
    const endpoint = is_deleted
      ? '/api/reviews/unarchive'
      : '/api/reviews/archive'
    await axiosInstance.put(endpoint, { id })
    onStatusChange()
  } catch (err) {
    console.error('Failed to update archive status:', err)
  }
}

const handleRemoveFromArchive = async (
  id: number,
  onStatusChange: () => void
): Promise<void> => {
  try {
    await axiosInstance.put('/api/reviews/check_review', { id })
    onStatusChange()
  } catch (err) {
    console.error('Failed to update review status:', err)
  }
}

export const ReviewsListItem = ({
  item,
  onStatusChange
}: ReviewsListItemProps) => {
  const [openModal, setOpenModal] = useState(false)

  const {
    id,
    rating,
    description,
    images,
    created_at,
    is_checked,
    is_deleted,
    user: { first_name }
  } = item

  const handleOpenModal = () => setOpenModal(true)

  const formattedDate = formatDate(created_at)

  const renderImageModal = () => {
    if (!images || images.length === 0 || !images[0]?.image_url) return null

    return (
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
    )
  }

  return (
    <div className={styles.item}>
      <span
        className={`${styles.span} ${!is_deleted && is_checked ? styles.spanActive : ''}`}
      ></span>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <p className={styles.name}>{first_name}</p>
          <ReviewsRating rating={rating} />
          <p className={styles.date}>{formattedDate}</p>
        </div>
        <p className={styles.description}>{description}</p>

        <div className={styles.buttonsWrapper}>
          {renderImageModal()}
          <ArchiveButton
            isDisabled={!is_checked}
            onRemove={() => handleAddToArchive(id, is_deleted, onStatusChange)}
          />
          <UnArchiveButton
            isDisabled={is_checked}
            onAdd={() => handleRemoveFromArchive(id, onStatusChange)}
          />
        </div>
      </div>
    </div>
  )
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
