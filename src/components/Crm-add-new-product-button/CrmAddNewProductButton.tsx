import * as yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch, useSelector } from 'react-redux'
import {
  newProductSchema,
  newProductImagesSchema,
  newProductPriceSchema
} from '../../helpers/validateNewProduct'
import styles from './crmAddNewProductButton.module.scss'
import { FC, useEffect, useState } from 'react'
import { addPrice, createNewProduct } from '../../redux/crm-product/operation'
import { AppDispatch } from '../../redux/store'
import { setFormErrors } from '../../redux/crm-product/createSlice/product'
import { ProductResponse, ProductStatus } from '../../types'
import { RootState } from '../../redux/store/index'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axios/settings'

type Props = {
  product: ProductResponse | undefined
}

const CrmAddNewProductButton: FC<Props> = () => {
  const statusProduct = useSelector(
    (state: RootState) => state.editProduct.status
  )

  const statusMapping: { [key: string]: string } = {
    Новий: 'new',
    Активний: 'activated',
    Архівований: 'archived'
  }

  const internalStatus = statusMapping[statusProduct]
  console.log('✌️internalStatus --->', internalStatus)

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { params: productIdParam } = useParams()
  const parsedIndex = Number(productIdParam)
  const productData = useSelector((state: RootState) => state.newProduct)

  const pricesData = useSelector(
    (state: RootState) => state.editProduct.products
  )
  console.log('✌️pricesData --->', pricesData)

  const productId = useSelector(
    (state: RootState) => state.newProduct.productId
  )
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

  const updatePrices = async (pricesData: any[]) => {
    if (pricesData) {
      await Promise.all(
        pricesData.map((price) =>
          axiosInstance.put(
            `/api/price/change_status?price_id=${price.id}&is_active=${price.is_active}&quantity=${price.quantity}`
          )
        )
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
        await updateProductStatus(product_id, internalStatus)
        await updatePrices(pricesData)
        navigate(-1)
      }
    } catch (error) {
      console.log('✌️error --->', error)
      if (error instanceof yup.ValidationError) {
        const newErrors = {} as Record<string, string>
        error.inner.forEach((err) => {
          return !newErrors[err.path!] && (newErrors[err.path!] = err.message)
        })
        dispatch(setFormErrors(newErrors))
      }
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
