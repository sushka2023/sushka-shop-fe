import { useState, ChangeEvent, FC, Fragment } from 'react'
import styles from '../Feedbacks.module.scss'

type Props = {
  maxLength: number
  onTextChange: (text: string) => void
}

export const CustomTextarea: FC<Props> = ({ maxLength, onTextChange }) => {
  const [text, setText] = useState('')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    if (newText.length <= maxLength) {
      setText(newText)
      onTextChange(newText)
    }
  }

  return (
    <Fragment>
      <textarea
        value={text}
        onChange={handleChange}
        className={styles.feedbackFormTextarea}
        placeholder="Ваш відгук"
      />
      <div className={styles.counter}>
        {text.length}/{maxLength}
      </div>
    </Fragment>
  )
}
