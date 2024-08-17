import styles from './ReviewsListItem/reviews-list-item.module.scss'

import { Review } from '../../../redux/feedbacks/slice'
import { ReviewsListItem } from './ReviewsListItem/ReviewsListItem'

export interface ReviewsListProps {
  items: Review[]
  onStatusChange: () => void
}

export const ReviewsList = ({ items, onStatusChange }: ReviewsListProps) => {
  return (
    <ul className={styles.list}>
      {items.map(
        ({
          id,
          rating,
          is_deleted,
          user: { first_name },
          created_at,
          description,
          images
        }: Review) => (
          <ReviewsListItem
            id={id}
            key={id}
            rating={rating}
            description={description}
            time={created_at}
            name={first_name}
            isActive={is_deleted}
            images={images}
            onStatusChange={onStatusChange}
          />
        )
      )}
    </ul>
  )
}
