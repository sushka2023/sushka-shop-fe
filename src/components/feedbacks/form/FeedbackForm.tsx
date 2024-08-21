import styles from '../Feedbacks.module.scss'
import { Rating } from './Rating'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { FileInfo } from './FileInfo'
import { CustomTextarea } from './CustomTextarea'
import { useAuth } from '../../../hooks/use-auth'
import { useSearchParams } from 'react-router-dom'
import ModalPortal from '../../modal-portal/ModalPortal'
import Auth from '../../auth/Auth'
import { AppDispatch } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { submitReview } from '../../../redux/feedbacks/operations'

const DEFAULT_VALUE = {
  name: '',
  size: 0
}

const MAX_LENGTH = 250

const FeedbackForm = () => {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [file, setFile] = useState<typeof DEFAULT_VALUE>(DEFAULT_VALUE)
  const [fileSelected, setFileSelected] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [text, setText] = useState('')
  const { isLoggedIn } = useAuth()

  const [searchParams] = useSearchParams()

  const dispatch = useDispatch<AppDispatch>()

  const searchToken = Object.fromEntries(searchParams.entries())

  useEffect(() => {
    Object.keys(searchToken).length > 0 && setIsModalOpen(true)
  }, [searchToken])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const formData = {
      file,
      rating,
      description: text,
      name
    }

    try {
      dispatch(submitReview(formData))
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
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className={styles.feedbackFormInput}
          />
          <div className={styles.wrapperTextarea}>
            <CustomTextarea maxLength={MAX_LENGTH} onTextChange={setText} />
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
