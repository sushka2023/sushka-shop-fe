import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PlusIcon from '../../icons/plus1.svg?react'
import { v4 as uuidv4 } from 'uuid'
import CategoriesLine from './CategoriesLine'
import styles from './crmCategories.module.scss'
import { AppDispatch, RootState } from '../../redux/store'
import { ProductCategoryResponse } from '../../types'
import { addData } from '../../redux/crm-add-new-product/slice/product'

type Props = {
  categories: ProductCategoryResponse[] | null
  type: 'main_category' | 'sub_categories'
}

const CrmCategories: FC<Props> = ({ categories, type }) => {
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, string>
  >({})
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({})
  const [categoriesList, setCategoriesList] = useState<(number | string)[]>([0])
  const dispatch = useDispatch<AppDispatch>()
  const productId = useSelector(
    (state: RootState) => state.newProduct.productId
  )

  useEffect(() => {
    if (productId) {
      setSelectedCategories({})
      setIsOpen({})
      setCategoriesList([0])
    }
  }, [productId])

  useEffect(() => {
    const valuesSelectedCategories = Object.values(selectedCategories)

    const categoriesId =
      categories &&
      categories.map((category) => {
        const index = valuesSelectedCategories.findIndex((value) => {
          return value === category.name
        })
        return index !== -1 ? category.id : null
      })

    dispatch(addData({ type, value: categoriesId }))
  }, [categories, dispatch, selectedCategories, type])

  useEffect(() => {
    if (categories && Object.keys(selectedCategories).length === 0) {
      setSelectedCategories({ [0]: categories[0].name })
    }
  }, [categories, selectedCategories])

  const toggleDropdown = (categoriesLine: string) => {
    setIsOpen((prevIsOpen) => {
      return {
        ...prevIsOpen,
        [categoriesLine]: !prevIsOpen[categoriesLine]
      }
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    categoriesLine: string
  ) => {
    setSelectedCategories((prevSelectedCategories) => {
      return {
        ...prevSelectedCategories,
        [categoriesLine]: e.target.value
      }
    })
    setIsOpen((prevIsOpen) => {
      return { ...prevIsOpen, [categoriesLine]: false }
    })
  }

  const handleClickNewCategoryLine = () => {
    if (categories) {
      const newId = uuidv4()
      setCategoriesList((prevCategoriesList) => {
        return [...prevCategoriesList, newId]
      })
      setSelectedCategories((prevSelectedCategories) => {
        return {
          ...prevSelectedCategories,
          [newId]: categories[0].name
        }
      })
    }
  }

  const handleClickDelete = (
    e: React.MouseEvent<SVGSVGElement>,
    categoriesLine: string
  ) => {
    setCategoriesList((prevCategoriesList) => {
      return prevCategoriesList.filter((el) => {
        return el !== categoriesLine
      })
    })
    setSelectedCategories((prevSelectedCategories) => {
      const newSelectedCategories = { ...prevSelectedCategories }
      delete newSelectedCategories[categoriesLine]
      return newSelectedCategories
    })
    setIsOpen((prevIsOpen) => {
      const newIsOpen = { ...prevIsOpen }
      delete newIsOpen[categoriesLine]
      return newIsOpen
    })
  }

  const renderPlusIcon = () => {
    return (
      type === 'sub_categories' && (
        <div
          className={`${styles.iconWrapp} ${categoriesList.length === 5 ? styles.iconWrappDisabled : ''}`}
        >
          <PlusIcon
            className={`${styles.iconPlus} ${categoriesList.length === 5 ? styles.iconPlusDisabled : ''}`}
            onClick={handleClickNewCategoryLine}
          />
        </div>
      )
    )
  }

  const renderCategoriesLine = (categoriesLine: string | number) => {
    return (
      <CategoriesLine
        key={categoriesLine}
        type={type}
        isOpen={isOpen}
        categories={categories}
        selectedCategories={selectedCategories}
        categoriesList={categoriesList}
        categoriesLine={categoriesLine as string}
        toggleDropdown={toggleDropdown}
        handleClickDelete={handleClickDelete}
        handleChange={handleChange}
      />
    )
  }

  return (
    <div className={styles.categoriesWrapper}>
      {renderPlusIcon()}
      <div>
        <p
          className={`${styles.categoriesParagraph}
          ${type === 'main_category' ? styles.mainCategoryLine : ''}`}
        >
          {type === 'main_category'
            ? 'Категорія товару*'
            : 'Саб-категорія товару'}
        </p>
        <ul className={styles.categoriesListWrapp}>
          {categoriesList.map(renderCategoriesLine)}
        </ul>
      </div>
    </div>
  )
}

export default CrmCategories
