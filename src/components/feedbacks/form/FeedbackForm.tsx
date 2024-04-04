import styles from '../Feedbacks.module.scss'
import { Rating } from './Rating'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { FileInfo } from './FileInfo'
import { CustomTextarea } from './CustomTextarea'
import { useAuth } from '../../../hooks/use-auth'
import { useSearchParams } from 'react-router-dom'
import ModalPortal from '../../modal-portal/ModalPortal'
import Auth from '../../auth/Auth'
import { HoverPopUp } from './HoverPopUp'
const DEFAULT_VALUE = {
  name: '',
  size: 0
}

const MAX_LENGTH = 250

const FeedbackForm = () => {
  const [rating, setRating] = useState(0)
  const [file, setFile] = useState<typeof DEFAULT_VALUE>(DEFAULT_VALUE)
  const [fileSelected, setFileSelected] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { isLoggedIn } = useAuth()

  const [searchParams] = useSearchParams()

  const searchToken = Object.fromEntries(searchParams.entries())

  useEffect(() => {
    Object.keys(searchToken).length > 0 && setIsModalOpen(true)
  }, [searchToken])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('product_id', '0')
    formData.append('rating', rating.toString())
    formData.append('description', 'string')

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target
    if ((fileInput.files?.length || 0) > 0) {
      setFile({
        name: fileInput.files?.[0].name!,
        size: fileInput.files?.[0].size!
      })
      setFileSelected(true)
    } else {
      handleFileDelete()
    }
  }
  const handleFileDelete = () => {
    setFile(DEFAULT_VALUE)
    setFileSelected(false)
  }

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.subtitle}>Залишити відгук</h3>
      {isLoggedIn ? (
        <form className={styles.feedbackForm} onSubmit={handleSubmit}>
          <input type="text" className={styles.feedbackFormInput} />
          <div className={styles.wrapperTextarea}>
            <CustomTextarea maxLength={MAX_LENGTH} />
            <label
              htmlFor="fileInput"
              className={`${styles.customFileInput} ${fileSelected ? styles.fileSelected : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered && <HoverPopUp />}
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
      ) : (
        <div className={styles.feedbackUnauth}>
          Щоб залишити відгук, <br /> вам потрібно{' '}
          <span
            className={styles.authBtn}
            onClick={() => {
              return setIsModalOpen(true)
            }}
          >
            авторизуватись
          </span>
        </div>
      )}
      <ModalPortal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        searchToken={searchToken}
      >
        <Auth searchToken={searchToken} setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </div>
  )
}

export default FeedbackForm
