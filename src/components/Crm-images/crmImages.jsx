import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addData,
  incrementImagesUploadCount,
  resetImagesUploadCount,
  setFormErrors
} from '../../Redax/Crm-add-new-product/slices/product-slice'
import * as yup from 'yup'
import {
  selectProductId,
  selectFormErrors
} from '../../Redax/Crm-add-new-product/selectors/Selectors'
import { addImages } from '../../Redax/Crm-add-new-product/operation/Operation'
import { newProductImagesSchema } from '../../Halpers/validateNewProduct'
import PlusIcon from '../../icons/plus.svg?react'
import DeleteIcon from '../../icons/delete.svg?react'
import FileIcon from '../../icons/file.svg?react'
import StarIcon from '../../icons/star.svg?react'
import Notiflix from 'notiflix'
import styles from './crmImages.module.scss'

const CrmImages = () => {
  const [activeFile, setActiveFile] = useState(null)
  const [filePreviews, setFilePreviews] = useState({})
  const [filesArr, setFilesArr] = useState([])
  const [fileIsOpen, setFileIsOpen] = useState('')
  const [attemptedUpload, setAttemptedUpload] = useState(false)
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const productId = useSelector(selectProductId)
  const formErrors = useSelector(selectFormErrors)

  useEffect(() => {
    if (filesArr.length > 4) {
      Notiflix.Notify.info('Максимальна кількість зображень 4')
      return setFilesArr(filesArr.splice(0, 4))
    }

    dispatch(addData({ type: 'images', value: filesArr.length > 0 }))
    const validateFiles = async () => {
      try {
        if (filesArr.length > 0) {
          await newProductImagesSchema.validate(
            { images: true },
            { abortEarly: false }
          )
          dispatch(setFormErrors({ ...formErrors, images: '' }))
        } else if (attemptedUpload) {
          throw new yup.ValidationError(
            'Мінімальна кількість зображень 1',
            null,
            'images'
          )
        }
      } catch (error) {
        if (attemptedUpload) {
          dispatch(setFormErrors({ ...formErrors, images: error.message }))
        }
      }
    }

    if (attemptedUpload) {
      validateFiles()
    }
  }, [filesArr, attemptedUpload, dispatch])

  useEffect(() => {
    if (productId && filesArr.length > 0) {
      dispatch(resetImagesUploadCount())

      filesArr.map((image) => {
        const formData = new FormData()
        formData.append('image_file', image)
        formData.append('description', image.name)
        formData.append('main_image', image.name === activeFile)
        formData.append('product_id', productId)

        return dispatch(addImages(formData)).then(() => {
          dispatch(incrementImagesUploadCount())
        })
      })

      setActiveFile(null)
      setFilePreviews({})
      setFilesArr([])
      setAttemptedUpload(false)
    }
  }, [productId, filesArr])

  const cleaningInput = () => {
    fileInputRef.current.value = ''
  }

  const handleFileChange = (e) => {
    setAttemptedUpload(true)

    const files = Array.from(e.target.files)

    if (fileInputRef.current) {
      cleaningInput()
    }

    const newFilePreviews = {}

    files.forEach((file) => {
      if (
        !filesArr.some((f) => {
          return f.name === file.name
        })
      ) {
        newFilePreviews[file.name] = URL.createObjectURL(file)
        setFilesArr((prev) => {
          return [...prev, file]
        })
      } else {
        return Notiflix.Notify.warning('Файл з такою назвою вже завантажений')
      }
    })

    setFilePreviews((prev) => {
      return { ...prev, ...newFilePreviews }
    })
  }

  const handleClickDelete = (file) => {
    const delletedFiles = filesArr.filter((item) => {
      return item.name !== file
    })
    const newFilePreviews = { ...filePreviews }
    URL.revokeObjectURL(newFilePreviews[file])

    if (fileInputRef.current) {
      cleaningInput()
    }

    !delletedFiles.some((file) => {
      return file.name === activeFile
    }) && setActiveFile('')
    delete newFilePreviews[file]
    setFilePreviews(newFilePreviews)
    setFilesArr(delletedFiles)
  }

  const toggleActiveStar = (file) => {
    setActiveFile(activeFile === file ? null : file)
  }

  const handleMouseDown = (e, file) => {
    return setFileIsOpen(file)
  }

  const handleMouseUp = () => {
    return setFileIsOpen('')
  }

  return (
    <div className={styles.fileWrapper}>
      <input
        ref={fileInputRef}
        accept="image/jpeg, image/png, image/webp, image/heic"
        name="images"
        type="file"
        id="file"
        multiple
        className={styles.fileInput}
        onChange={handleFileChange}
      />
      <div>
        <h3 className={styles.fileTitle}>
          Завантажені фото
          <span className={styles.fileMax}> (макс 4 по 10 МВ)</span>
        </h3>
        <ul className={styles.fileList}>
          {filesArr.map((file) => {
            return (
              <li key={file.name} className={styles.fileLine}>
                <StarIcon
                  className={`${styles.starIcon} ${
                    activeFile === file.name && styles.starIconActive
                  }`}
                  onClick={() => {
                    return toggleActiveStar(file.name)
                  }}
                />
                <div className={styles.fileLineWrrap}>
                  <div
                    className={styles.fileContentWrrap}
                    onMouseDown={(e) => {
                      return handleMouseDown(e, file.name)
                    }}
                    onMouseUp={(e) => {
                      return handleMouseUp(e, file.name)
                    }}
                  >
                    <FileIcon className={styles.fileIcon} />
                    <span className={styles.fileName}>{file.name}</span>
                  </div>
                  <DeleteIcon
                    className={styles.deleteIcon}
                    onClick={() => {
                      return handleClickDelete(file.name)
                    }}
                  />
                </div>
                {fileIsOpen === file.name && (
                  <img
                    src={filePreviews[file.name]}
                    alt={file.name}
                    className={styles.filePreview}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <label
        htmlFor="file"
        className={`${styles.fileLabel} ${
          filesArr.length >= 4 && styles.fileLabelDisabled
        }`}
      >
        Завантажити фото
        <PlusIcon
          className={`${styles.plusIcon} ${
            filesArr.length >= 4 && styles.plusIconDisabled
          }`}
        />
      </label>
      {formErrors.images && (
        <p className={styles.imagesError}>{formErrors.images}</p>
      )}
    </div>
  )
}

export default CrmImages
