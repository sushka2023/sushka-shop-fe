import { useState, ChangeEvent, FC, Fragment } from 'react'
import styles from '../Feedbacks.module.scss'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

type Props = {
  maxLength: number
  onTextChange: (text: string) => void
}

export const CustomTextarea: FC<Props> = ({ maxLength, onTextChange }) => {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    if (newText.length <= maxLength) {
      setText(newText)
      onTextChange(newText)
    }
    if (newText.length < 10) {
      setError('Текст має містити хоча б від 10 символів')
    } else {
      setError('')
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
      <Box component="div" className={styles.counter}>
        {text.length}/{maxLength}
      </Box>
      {error && (
        <Typography className={styles.textAreaError}>{error}</Typography>
      )}
    </Fragment>
  )
}
