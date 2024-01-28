import { useState, useEffect, useRef } from 'react'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import CrmCategoriesBlock from '../../components/Crm-categories-block/CrmCategoriesBlock'
import CrmAddNewProductTable from '../../components/Crm-add-new-product-table/CrmAddNewProductTable'
import CrmAddNewProductButton from '../../components/Crm-add-new-product-button/CrmAddNewProductButton'
import styles from './crmAddNewProduct.module.scss'
import {
  addData,
  setFormErrors
} from '../../redux/crm-add-new-product/slice/product'
import { AppDispatch, RootState } from '../../redux/store'
import DescriptionProduct from './DescriptionProduct'
import StatusDropdown from './StatusDropdown'
import { newProductSchema } from '../../helpers/validateNewProduct'

const CrmAddNewProduct = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStatus, setCurrentStatus] =
    useState<keyof typeof statusClasses>('Новий')
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
    newStatusName: keyof typeof statusClasses
  ) => {
    setCurrentStatus(newStatusName)
    dispatch(addData({ type, value: newStatusValue }))
  }

  const handleChangeFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target
    validateField(name, value)
    dispatch(
      addData({
        type: name as any,
        value
      })
    )
  }

  const applyDropDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).nodeName === 'BUTTON') {
      return
    }
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
      if (nameInputRef.current) {
        nameInputRef.current.value = ''
      }

      if (descriptionRef.current) {
        descriptionRef.current.value = ''
      }
    }
  }, [productId])

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const statusClasses = {
    Новий: styles.statusNew,
    Активний: styles.statusActive,
    Архівований: styles.statusArchive
  }

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={styles.formWrapp}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>
              <span
                className={`${styles.status} ${statusClasses[currentStatus]}`}
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
            formErrors={formErrors}
            nameInputRef={nameInputRef}
            descriptionRef={descriptionRef}
            handleChangeFormData={handleChangeFormData}
          />
          <div className={styles.categoriesOptionWrapp}>
            <CrmCategoriesBlock />
          </div>
        </div>
        <CrmAddNewProductTable />
      </form>
    </section>
  )
}

export default CrmAddNewProduct
