import React, { useState, ChangeEvent } from 'react'
import styles from '../Feedbacks.module.scss'
export const CustomTextarea = ({ maxLength }) => {
  const [text, setText] = useState('')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    if (newText.length <= maxLength) {
      setText(newText)
    }
  }

  return (
    <React.Fragment>
      <textarea
        value={text}
        onChange={handleChange}
        className={styles.feedbackFormTextarea}
        placeholder="Ваш відгук"
      />
      <div className={styles.counter}>
        {text.length}/{maxLength}
      </div>
    </React.Fragment>
  )
}
