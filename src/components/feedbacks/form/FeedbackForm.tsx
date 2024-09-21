import styles from '../Feedbacks.module.scss'
import { Rating } from './Rating'
import { useState, ChangeEvent, FormEvent, useEffect, FC } from 'react'
import { FileInfo } from './FileInfo'
import { CustomTextarea } from './CustomTextarea'
import { useAuth } from '../../../hooks/use-auth'
import { useSearchParams } from 'react-router-dom'
import ModalPortal from '../../modal-portal/ModalPortal'
import Auth from '../../auth/Auth'
import { TextField } from '@mui/material'
import { textFieldStyles } from '../helpers/mui-styles'
import { AppDispatch, RootState } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { submitReview } from '../../../redux/feedbacks/operations'
import { ModalCustom } from '../../Modal-custom-btn/ModalCustomWindow'
import { FeedbackDoneModal } from './FeedbackDoneModal'
import { useSelector } from 'react-redux'
import { CheckOrder } from './CheckOrder/CheckOrder'
import { submitImage } from '../helpers/helpers'

type Props = {
  onSubmitSuccess?: () => void
}

const MAX_LENGTH = 250

const FeedbackForm: FC<Props> = ({ onSubmitSuccess }) => {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [fileSelected, setFileSelected] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [text, setText] = useState('')
  const { isLoggedIn } = useAuth()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [searchParams] = useSearchParams()

  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector((state: RootState) => state.auth)
  const posts = auth.user?.posts
  const searchToken = Object.fromEntries(searchParams.entries())

  useEffect(() => {
    if (Object.keys(searchToken).length > 0) setIsModalOpen(true)
  }, [searchToken])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target
    if (fileInput.files?.length) {
      setFile(fileInput.files[0])
      setFileSelected(true)
    } else {
      handleFileDelete()
    }
  }

  const handleFileDelete = () => {
    setFile(null)
    setFileSelected(false)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!file) {
      console.error('File is required')
      return
    }

    try {
      const reviewData = await dispatch(
        submitReview({
          rating,
          description: text,
          name
        })
      )
      if (reviewData.payload?.id) {
        await submitImage(file, reviewData.payload.id)
        onSubmitSuccess?.()
      } else {
        console.error('No review ID received')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
    }
    setOpenModal(true)
  }

  const renderFormContent = () => (
    <form className={styles.feedbackForm} onSubmit={handleSubmit}>
      <ModalCustom openModal={openModal} setOpenModal={setOpenModal}>
        <FeedbackDoneModal />
      </ModalCustom>
      <TextField
        placeholder="Ваше ім'я"
        onChange={(e) => setName(e.target.value)}
        sx={textFieldStyles}
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
        <Rating onRate={(value) => setRating(value)} />
        <button type="submit" className={styles.feedbackFormBtn}>
          Відправити
        </button>
      </div>
    </form>
  )

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.subtitle}>Залишити відгук</h3>
      {isLoggedIn ? (
        posts?.ukr_poshta?.length || posts?.nova_poshta?.length ? (
          renderFormContent()
        ) : (
          <CheckOrder />
        )
      ) : (
        <div className={styles.feedbackUnauth}>
          Щоб залишити відгук, <br /> вам потрібно
          <span className={styles.authBtn} onClick={() => setIsModalOpen(true)}>
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
