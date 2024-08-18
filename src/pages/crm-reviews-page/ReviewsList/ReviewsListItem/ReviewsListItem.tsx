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
import { ImageResponseReview } from '../../../../types'

export interface ReviewsListItemProps {
  id: number
  rating: number
  name: string
  time: string
  description: string
  isActive: boolean
  images: ImageResponseReview[]
  onStatusChange: () => void
}

export const ReviewsListItem = ({
  id,
  rating,
  name,
  time,
  description,
  isActive,
  images,
  onStatusChange
}: ReviewsListItemProps) => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const isDeleteDisabled = !isActive
  const date = new Date(time)
  const formattedDate = date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const handleAddToArchive = () => {
    const fetchAdd = async () => {
      try {
        await axiosInstance.put('/api/reviews/archive', { id })
      } catch (err) {
        console.error(err)
      }
    }
    onStatusChange()
    fetchAdd()
  }

  const handleRemoveFromArchive = () => {
    const fetchRemove = async () => {
      try {
        await axiosInstance.put('/api/reviews/unarchive', { id })
      } catch (err) {
        console.error(err)
      }
    }
    onStatusChange()
    fetchRemove()
  }
  return (
    <li className={styles.item}>
      <span
        className={`${styles.span} ${isActive ? styles.spanActive : ''}`}
      ></span>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <p className={styles.name}>{name}</p>
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
    </li>
  )
}
