import { FC } from 'react'
import clsx from 'clsx'
import styles from '../Feedbacks.module.scss'

type Props = {
  file: boolean
  rating: number
  text: string
  name: string
  isVerified: boolean | undefined
}

const SendButton: FC<Props> = ({ file, rating, text, name, isVerified }) => {
  const isDisabled =
    !file || rating === 0 || name === '' || text.length < 10 || !isVerified

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={clsx(styles.feedbackFormBtn, {
        [styles.disabled]: isDisabled
      })}
    >
      Відправити
    </button>
  )
}

export { SendButton }
