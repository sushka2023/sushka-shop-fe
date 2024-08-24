import * as yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch, useSelector } from 'react-redux'
import {
  newProductSchema,
  newProductImagesSchema,
  newProductPriceSchema
} from '../../helpers/validateNewProduct'
import styles from './crmAddNewProductButton.module.scss'
import { FC, useEffect } from 'react'
import {
  addPrice,
  createNewProduct
} from '../../redux/crm-add-new-product/operation'
import { AppDispatch } from '../../redux/store'
import { setFormErrors } from '../../redux/crm-add-new-product/slice/product'
import { ProductResponse, ProductStatus } from '../../types'
import { RootState } from '../../redux/store/index'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axios/settings'

type Props = {
  product: ProductResponse | undefined
}

const CrmAddNewProductButton: FC<Props> = () => {
  const navigate = useNavigate()
  const { params: productIdParam } = useParams()
  const parsedIndex = Number(productIdParam)
  const productData = useSelector((state: RootState) => state.newProduct)

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

  const handleClickSaveProduct = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    try {
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
        // const values = {
        //   product_id: product?.id,
        //   pr_status: productData.product_status
        // }

        console.log('✌️productIdParam --->', productIdParam)
        const product_id = parsedIndex

        await axiosInstance.put(
          `api/product/${product_id}/change_status?pr_status=${productData.product_status}`
        )
        // console.log('✌️values --->', values)
        navigate(-1)
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {} as Record<string, string>
        error.inner.forEach((err) => {
          return !newErrors[err.path!] && (newErrors[err.path!] = err.message)
        })
        dispatch(setFormErrors(newErrors))
      }
    }
  }

  return (
    <div className={styles.saveBtnWrapp}>
      <button
        className={styles.saveBtns}
        onClick={handleClickSaveProduct}
        disabled={!!productData.isLoading}
      >
        {(productData.isLoading || 0) > 0 && (
          <span>
            <ClipLoader size={15} color={'#FFFFFF'} />
          </span>
        )}
        Зберегти
      </button>
      {(productData.isLoading || 0) > 0 && (
        <p className={styles.isLoadingText}>
          Збереження! Не закривайте сторінку.
        </p>
      )}
    </div>
  )
}

export default CrmAddNewProductButton
