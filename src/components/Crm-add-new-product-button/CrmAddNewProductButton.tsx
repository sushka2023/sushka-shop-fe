import * as yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch, useSelector } from 'react-redux'
import {
  newProductSchema,
  newProductImagesSchema,
  newProductPriceSchema
} from '../../helpers/validateNewProduct'
import styles from './crmAddNewProductButton.module.scss'
import { useEffect, useState } from 'react'
import { addPrice, createNewProduct } from '../../redux/crm-product/operation'
import { AppDispatch } from '../../redux/store'
import { setFormErrors } from '../../redux/crm-product/createSlice/product'
import { ProductStatus } from '../../types'
import { RootState } from '../../redux/store/index'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axios/settings'
import { Report } from 'notiflix/build/notiflix-report-aio'
import { AxiosError } from 'axios'
import { PriceEditResponse } from '../../redux/crm-product/editSlice/editPrice'
import { statusMappingEn } from '../../helpers/statusMapping'

const CrmAddNewProductButton = () => {
  const statusProduct = useSelector(
    (state: RootState) => state.editProduct.status
  )

  const internalStatus =
    statusMappingEn[statusProduct as keyof typeof statusMappingEn]

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { params: productIdParam } = useParams()
  const parsedIndex = Number(productIdParam)
  const productData = useSelector((state: RootState) => state.newProduct)

  const pricesData = useSelector(
    (state: RootState) => state.editProduct.products
  )

  const productId = useSelector(
    (state: RootState) => state.newProduct.productId
  )

  const popular = useSelector((state: RootState) => state.editProduct.popular)
  const dispatch = useDispatch<AppDispatch>()

  const sendPricesSequentially = async (productId: string) => {
    if (productId) {
      productData.price.forEach((price) => {
        dispatch(addPrice({ price, productId: productId! }))
          .unwrap()
          .catch((error) => {
            console.error(error)
          })
      })
    }
  }

  useEffect(() => {
    dispatch(setFormErrors({}))
  }, [parsedIndex])

  useEffect(() => {
    if (productId) {
      sendPricesSequentially(productId)
    }
  }, [productId])

  const updateProductStatus = async (
    product_id: number,
    internalStatus: string
  ) => {
    if (internalStatus) {
      await axiosInstance.put(
        `api/product/${product_id}/change_status?pr_status=${internalStatus}`
      )
    }
  }

  const changePrices = async (pricesData: PriceEditResponse[]) => {
    if (pricesData) {
      await Promise.all(
        pricesData.map((price) =>
          axiosInstance.patch(
            `/api/price/change_status?price_id=${price.id}&is_active=${price.is_active}&quantity=${price.quantity}`
          )
        )
      )
    }
  }

  const changePopular = async (product_id: number) => {
    if (popular) {
      await axiosInstance.put(
        `api/product/select_popular?product_id=${product_id}`
      )
    }
  }

  const handleClickSaveProduct = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      if (isNaN(parsedIndex)) {
        await newProductSchema.validate(productData, { abortEarly: false })
        await newProductImagesSchema.validate(
          { images: productData.images },
          { abortEarly: false }
        )
        await newProductPriceSchema.validate(productData.price, {
          abortEarly: false
        })

        dispatch(setFormErrors({}))
        await dispatch(
          createNewProduct({
            description: productData.description!,
            main_category: +productData.main_category!,
            name: productData.name!,
            product_status: productData.product_status as ProductStatus,
            sub_categories: productData.sub_categories
              ? productData.sub_categories
              : []
          })
        ).unwrap()
      } else {
        const product_id = parsedIndex
        await changePrices(pricesData)
        await updateProductStatus(product_id, internalStatus)
        await changePopular(product_id)

        Report.success('Товар успішно відредаговано', '', 'Добре')
        navigate('/crm/products')
      }
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        const newErrors = {} as Record<string, string>
        e.inner.forEach((err) => {
          return !newErrors[err.path!] && (newErrors[err.path!] = err.message)
        })
        dispatch(setFormErrors(newErrors))
      }
      const error = e as AxiosError

      Report.failure('Упс... сталася помилка', `${error.message}`, 'Добре')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.saveBtnWrapp}>
      <button
        className={styles.saveBtns}
        onClick={handleClickSaveProduct}
        disabled={isLoading}
      >
        {isLoading && (
          <span>
            <ClipLoader size={15} color={'#FFFFFF'} />
          </span>
        )}
        Зберегти
      </button>
      {isLoading && (
        <p className={styles.isLoadingText}>
          Збереження! Не закривайте сторінку.
        </p>
      )}
    </div>
  )
}

export default CrmAddNewProductButton
