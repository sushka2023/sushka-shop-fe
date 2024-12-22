import { useState, useRef, useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import Notiflix from 'notiflix'
import styles from './crmImages.module.scss'
import {
  addData,
  incrementImagesUploadCount,
  resetImagesUploadCount,
  setFormErrors
} from '../../redux/crm-product/createSlice/product'
import { newProductImagesSchema } from '../../helpers/validateNewProduct'
import { addImages } from '../../redux/crm-product/operation'
import { AppDispatch } from '../../redux/store'
import { RootState } from '../../redux/store/index'
import { FileList } from '../FileList/FileList'
import { ProductResponse } from '../../types'

type Props = {
  product: ProductResponse | undefined
}

export const CrmImages: FC<Props> = ({ product }) => {
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({})
  const [filesArr, setFilesArr] = useState<File[]>([])
  const [attemptedUpload, setAttemptedUpload] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const productId = useSelector(
    (state: RootState) => state.newProduct.productId
  )
  const formErrors = useSelector(
    (state: RootState) => state.newProduct.formErrors
  )

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
      if (!filesArr.some((f) => f.name === file.name)) {
        newFilePreviews[file.name] = URL.createObjectURL(file)
        setFilesArr((prev) => [...prev, file])
      } else {
        return Notiflix.Notify.warning('Файл з такою назвою вже завантажений')
      }
    })

    setFilePreviews((prev) => ({ ...prev, ...newFilePreviews }))
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
          {!product && (
            <span className={styles.fileMax}> (макс 4 по 10 МВ)</span>
          )}
        </h3>
        <FileList
          product={product}
          filesArr={filesArr}
          filePreviews={filePreviews}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          fileInputRef={fileInputRef}
          cleaningInput={cleaningInput}
          setFilePreviews={setFilePreviews}
          setFilesArr={setFilesArr}
        />
      </div>
    </div>
  )
}
