import { FC, Fragment } from 'react'
import styles from '../Feedbacks.module.scss'

type Props = {
  apiError: number | undefined
}

const ErrorDisplay: FC<Props> = ({ apiError }) => {
  switch (apiError) {
    case 403:
      return (
        <div className={styles.error}>
          Ви не можете залишити відгук, поки у вас немає замовлення
        </div>
      )
    default:
      return null
  }
}

const ErrorMessage: FC<{ apiError: number | undefined }> = ({ apiError }) => {
  return <Fragment>{apiError && <ErrorDisplay apiError={apiError} />}</Fragment>
}

export { ErrorMessage }
