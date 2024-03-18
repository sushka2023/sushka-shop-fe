import styles from '../Feedbacks.module.scss'
import { Rating } from './Rating'
import { useState, ChangeEvent, FormEvent } from 'react'
import { FileInfo } from './FileInfo'
import { CustomTextarea } from './CustomTextarea'

const FeedbackForm = () => {
  const MAX_LENGTH = 250
  const [rating, setRating] = useState(0)
  const [file, setFile] = useState('')
  const [fileSelected, setFileSelected] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('product_id', '0')
    formData.append('rating', rating.toString())
    formData.append('description', 'stringstri')

    try {
      const response = await fetch('/api/reviews/create', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        console.log('Review submitted successfully')
      } else {
        console.error('Failed to submit review')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  const handleRatingChange = (value: number) => {
    setRating(value)
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(rating)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target
    if (fileInput.files.length > 0) {
      setFile({
        name: fileInput.files[0].name,
        size: fileInput.files[0].size
      })
      setFileSelected(true)
    } else {
      handleFileDelete()
    }
  }
  const handleFileDelete = () => {
    setFile('')
    setFileSelected(false)
  }

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.subtitle}>Залишити відгук</h3>
      <form className={styles.feedbackForm} onSubmit={handleSubmit}>
        <input type="text" className={styles.feedbackFormInput} />
        <div className={styles.wrapperTextarea}>
          <CustomTextarea maxLength={MAX_LENGTH} />
          <label
            htmlFor="fileInput"
            className={`${styles.customFileInput} ${fileSelected ? styles.fileSelected : ''}`}
          >
            <span>Додати фото</span>
            <span className={styles.plusIcon}>+</span>
            <input
              className={styles.inputFile}
              type="file"
              id="fileInput"
              name="fileInput"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {fileSelected && <FileInfo file={file} onDelete={handleFileDelete} />}
        <div className={styles.submitWrapper}>
          <Rating onRate={handleRatingChange} />
          <button type="submit" className={styles.feedbackFormBtn}>
            Відправити
          </button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
