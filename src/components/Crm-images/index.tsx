import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import PlusIcon from '../../icons/plus.svg?react'
import DeleteIcon from '../../icons/delete.svg?react'
import FileIcon from '../../icons/file.svg?react'
import StarIcon from '../../icons/star.svg?react'
import Notiflix from 'notiflix'
import styles from './crmImages.module.scss'
import {
  ProductState,
  addData,
  incrementImagesUploadCount,
  resetImagesUploadCount,
  setFormErrors
} from '../../redux/crm-add-new-product/slice/product'
import { newProductImagesSchema } from '../../helpers/validateNewProduct'
import { addImages } from '../../redux/crm-add-new-product/operation'
import { AppDispatch } from '../../redux/store'

const CrmImages = () => {
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({})
  const [filesArr, setFilesArr] = useState<File[]>([])
  const [fileIsOpen, setFileIsOpen] = useState('')
  const [attemptedUpload, setAttemptedUpload] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const productId = useSelector((state: ProductState) => state.productId)
  const formErrors = useSelector((state: ProductState) => state.formErrors)

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
          dispatch(
            setFormErrors({ ...formErrors, images: (error as any).message })
          )
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
        formData.append(
          'main_image',
          image.name === activeFile ? 'true' : 'false'
        )
        formData.append('product_id', productId)

        const requestBody = {
          image_file: formData.get('image_file')! as Blob,
          description: (formData.get('description') ?? '') as string,
          main_image: Boolean(formData.get('main_image')),
          product_id: +formData.get('product_id')!
        }

        return dispatch(addImages(requestBody)).then(() => {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttemptedUpload(true)

    const files = Array.from(e.target.files || []) as File[]

    if (fileInputRef.current) {
      cleaningInput()
    }

    const newFilePreviews: { [key: string]: string } = {}

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

  const handleClickDelete = (file: string) => {
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

  const toggleActiveStar = (file: string) => {
    setActiveFile(activeFile === file ? null : file)
  }

  const handleMouseDown = (file: string) => {
    setFileIsOpen(file)
  }

  const handleMouseUp = () => {
    setFileIsOpen('')
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
                    toggleActiveStar(file.name)
                  }}
                />
                <div className={styles.fileLineWrrap}>
                  <div
                    className={styles.fileContentWrrap}
                    onMouseDown={() => {
                      handleMouseDown(file.name)
                    }}
                    onMouseUp={handleMouseUp}
                  >
                    <FileIcon className={styles.fileIcon} />
                    <span className={styles.fileName}>{file.name}</span>
                  </div>
                  <DeleteIcon
                    className={styles.deleteIcon}
                    onClick={() => {
                      handleClickDelete(file.name)
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
