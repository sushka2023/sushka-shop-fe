import { useState, useEffect, useRef } from 'react'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import CrmAddNewProductTable from '../../components/Crm-add-new-product-table/CrmAddNewProductTable'
import CrmAddNewProductButton from '../../components/Crm-add-new-product-button/CrmAddNewProductButton'
import DescriptionProduct from './DescriptionProduct'
import StatusDropdown from './StatusDropdown'
import { CrmViewProductTable } from '../../components/Crm-add-new-product-table/CrmViewProductTable'

import styles from './crmAddNewProduct.module.scss'
import { AppDispatch, RootState } from '../../redux/store'
import {
  addData,
  setFormErrors
} from '../../redux/crm-product/createSlice/product'
import {
  setPopularData,
  setProductStatus
} from '../../redux/crm-product/editSlice/editPrice'

import axiosInstance from '../../axios/settings'
import { newProductSchema } from '../../helpers/validateNewProduct'
import {
  ProductResponse,
  ProductStatus,
  ProductStatusDropDown
} from '../../types'
import { CrmCategoriesToggle } from '../../components/Crm-categories-block/CrmCategoriesToggle'
import { statusMappingEn, statusMappingUa } from '../../helpers/statusMapping'

const CrmAddNewProduct = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStatus, setCurrentStatus] =
    useState<ProductStatusDropDown>('Новий')

  const [initialStatus, setInitialStatus] = useState<string | null>(null)
  const [isPopular, setIsPopular] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<ProductResponse>()

  const containerRef = useRef<HTMLButtonElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const dispatch = useDispatch<AppDispatch>()
  const productId = useSelector(
    (state: RootState) => state.newProduct.productId
  )
  const formErrors = useSelector(
    (state: RootState) => state.newProduct.formErrors
  )
  const { params: productIdParam } = useParams()
  const parsedIndex = Number(productIdParam)

  useEffect(() => {
    if (product) {
      if (nameInputRef.current) nameInputRef.current.value = product.name
      if (descriptionRef.current) {
        descriptionRef.current.value = product.description
      }
      setInitialStatus(statusMappingUa[product.product_status])
      setIsPopular(product.is_popular)
    }
  }, [product])

  useEffect(() => {
    dispatch(setPopularData(false))
  }, [parsedIndex])

  const getProduct = async () => {
    if (isNaN(parsedIndex)) return
    setIsLoading(true)
    try {
      const { data } = await axiosInstance.get(`/api/product/${parsedIndex}`)
      setProduct(data)

      const statusKey = data.product_status as ProductStatus
      const translatedStatus = statusMappingUa[statusKey]

      setInitialStatus(translatedStatus as ProductStatusDropDown)
      setCurrentStatus(translatedStatus as ProductStatusDropDown)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProduct()
  }, [productIdParam])

  const validateField = async (name: string, value: string) => {
    try {
      await (yup.reach(newProductSchema, name) as any).validate(value)
      dispatch(setFormErrors({ ...formErrors, [name]: '' }))
    } catch (error) {
      dispatch(setFormErrors({ ...formErrors, [name]: (error as any).message }))
    }
  }

  const handleChangeStatus = (
    type: any,
    newStatusValue: string,
    newStatusName: keyof typeof statusMappingEn
  ) => {
    setCurrentStatus(newStatusName)

    dispatch(addData({ type, value: newStatusValue }))

    if (initialStatus === newStatusName) {
      dispatch(setProductStatus(''))
    } else if (initialStatus !== newStatusName) {
      dispatch(setProductStatus(newStatusName))
    }
  }

  const handleChangeFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target
    validateField(name, value)
    dispatch(addData({ type: name as any, value }))
  }

  const applyDropDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).nodeName === 'BUTTON') return
    e.stopPropagation()
  }

  const handleDocumentClick = (e: MouseEvent) => {
    setIsOpen((prevIsOpen) => {
      const shouldCloseDropdown =
        containerRef.current &&
        !containerRef.current.contains(e.target as HTMLElement)
      return shouldCloseDropdown ? false : !prevIsOpen
    })
  }

  useEffect(() => {
    if (productId) {
      if (nameInputRef.current) nameInputRef.current.value = ''
      if (descriptionRef.current) descriptionRef.current.value = ''
    }
  }, [productId])

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return isLoading ? (
    <p>loading...</p>
  ) : (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={styles.formWrapp}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>
              <span
                className={`${styles.status} ${statusMappingEn[currentStatus]}`}
              >
                {currentStatus}
              </span>
            </div>
            <div className={styles.editSaveBtnsBlock}>
              <StatusDropdown
                isOpen={isOpen}
                containerRef={containerRef}
                applyDropDown={applyDropDown}
                handleChangeStatus={handleChangeStatus}
                currentStatus={currentStatus}
              />
              <CrmAddNewProductButton />
            </div>
          </div>

          <DescriptionProduct
            product={product}
            formErrors={formErrors}
            nameInputRef={nameInputRef}
            descriptionRef={descriptionRef}
            handleChangeFormData={handleChangeFormData}
          />
          <CrmCategoriesToggle
            parsedIndex={parsedIndex}
            product={product}
            isPopular={isPopular}
            setIsPopular={setIsPopular}
          />
        </div>

        {product ? (
          <CrmViewProductTable prices={product.prices} />
        ) : (
          <CrmAddNewProductTable />
        )}
      </form>
    </section>
  )
}

export default CrmAddNewProduct
