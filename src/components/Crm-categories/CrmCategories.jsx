import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PlusIcon from '../../icons/plus1.svg?react'
import { v4 as uuidv4 } from 'uuid'
import { addData } from '../../Redax/Crm-add-new-product/slices/product-slice'
import CategoriesLine from './CategoriesLine'
import styles from './crmCategories.module.scss'
import PropTypes from 'prop-types'
import { selectProductId } from '../../Redax/Crm-add-new-product/selectors/Selectors'

const CrmCategories = ({ categories, type }) => {
  const [selectedCategories, setSelectedCategories] = useState({})
  const [isOpen, setIsOpen] = useState({})
  const [categoriesList, setCategoriesList] = useState([0])
  const dispatch = useDispatch()
  const productId = useSelector(selectProductId)

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

  const toggleDropdown = (categoriesLine) => {
    return setIsOpen((prevIsOpen) => {
      return {
        ...prevIsOpen,
        [categoriesLine]: !prevIsOpen[categoriesLine]
      }
    })
  }

  const handleChange = (e, categoriesLine) => {
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

  const handleClickDelete = (e, categoriesLine) => {
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

  const renderCategoriesLine = (categoriesLine) => {
    return (
      <CategoriesLine
        key={categoriesLine}
        type={type}
        isOpen={isOpen}
        categories={categories}
        selectedCategories={selectedCategories}
        categoriesList={categoriesList}
        categoriesLine={categoriesLine}
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
          className={`${styles.categoriesParagraph} ${
            type === 'sub' && categoriesList.length === 0
              ? styles.categoriesParagraphEmpty
              : ''
          }
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

CrmCategories.propTypes = {
  categories: PropTypes.array,
  type: PropTypes.string
}

export default CrmCategories
