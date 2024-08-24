import styles from './ReviewsListItem/reviews-list-item.module.scss'
import { ReviewsListItem } from './ReviewsListItem/ReviewsListItem'
import { ReviewResponse } from '../../../types'

export const ReviewsList = ({
  items,
  onStatusChange
}: {
  items: ReviewResponse[]
  onStatusChange: () => void
}) => {
  return (
    <ul className={styles.list}>
      {items.map((item: ReviewResponse) => (
        <ReviewsListItem
          key={item.id}
          item={item}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  )
}
