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
      {items.map(
        ({
          id,
          is_deleted,
          user: { first_name },
          created_at,
          ...rest
        }: ReviewResponse) => (
          <ReviewsListItem
            id={id}
            key={id}
            time={created_at}
            name={first_name}
            isActive={is_deleted}
            onStatusChange={onStatusChange}
            {...rest}
          />
        )
      )}
    </ul>
  )
}
