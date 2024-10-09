import styles from '../Feedbacks.module.scss'
import { Rating } from './Rating'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { FileInfo } from './FileInfo'
import { CustomTextarea } from './CustomTextarea'
import { useAuth } from '../../../hooks/use-auth'
import { Link, useSearchParams } from 'react-router-dom'
import ModalPortal from '../../modal-portal/ModalPortal'
import Auth from '../../auth/Auth'
import { TextField, Typography } from '@mui/material'
import { textFieldStyles } from '../helpers/mui-styles'
import { AppDispatch, RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { submitReview } from '../../../redux/feedbacks/operations'
import { ModalCustom } from '../../Modal-custom-btn/ModalCustomWindow'
import { FeedbackDoneModal } from './FeedbackDoneModal'
import { CheckOrder } from './CheckOrder/CheckOrder'
import { submitImage } from '../helpers/helpers'
import Box from '@mui/material/Box'
import { SendButton } from './SendButton'
import { ErrorMessage } from './ErrorMessage'

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
  const [, setAreaText] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector((state: RootState) => state.auth)
  const { error } = useSelector((state: RootState) => state.reviews)
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

    if (error) {
      console.error('Не можна відправити форму через наявну помилку:', error)
      return
    }

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
        setOpenModal(true)
        resetForm()
      } else {
        console.error('Не вдалося отримати ID відгуку')
      }
    } catch (error) {
      console.error('Помилка при відправленні відгуку:', error)
    }
  }
  const resetForm = () => {
    setName('')
    setRating(0)
    setFile(null)
    setFileSelected(false)
    setText('')
    if (formRef.current) {
      formRef.current.reset()
    }
  }
  const handleTextChange = (text: string) => {
    setAreaText(text)
    if (text.length < 10) {
      console.error('Текст має містити щонайменше 10 символів')
    } else {
      setText(text)
    }
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
        <CustomTextarea
          maxLength={MAX_LENGTH}
          onTextChange={handleTextChange}
        />
        <label
          htmlFor="fileInput"
          className={`${styles.customFileInput} ${fileSelected ? styles.fileSelected : ''}`}
        >
          <span style={{ color: 'rgba(86, 115, 67, 0.6)' }}>Додати фото</span>
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

      {fileSelected ? (
        <FileInfo file={file} onDelete={handleFileDelete} />
      ) : (
        <Typography className={styles.waitingForPhoto}>
          Очікуємо на фото вашого замовлення
        </Typography>
      )}

      <div className={styles.submitWrapper}>
        <Rating onRate={(value) => setRating(value)} />
        <SendButton
          isVerified={auth.user?.is_active}
          file={fileSelected}
          rating={rating}
          text={text}
          name={name}
        />
      </div>
      {!auth.user?.is_active && (
        <Typography className={styles.error}>
          <Link to="/account" className={styles.error_accept}>
            Підтвердіть&nbsp;
          </Link>
          пошту, щоб залишити відгук
        </Typography>
      )}
      <ErrorMessage apiError={error} />
    </form>
  )

  return (
    <Box component="div" className={styles.formContainer}>
      <h3 className={styles.subtitle}>Залишити відгук</h3>
      {isLoggedIn ? (
        posts?.ukr_poshta?.length || posts?.nova_poshta?.length ? (
          renderFormContent()
        ) : (
          <CheckOrder />
        )
      ) : (
        <div className={styles.feedbackUnauth}>
          Щоб залишити відгук, <br /> вам потрібно&nbsp;
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
    </Box>
  )
}

export default FeedbackForm
