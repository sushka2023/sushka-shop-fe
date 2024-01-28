import ArowIcon from '../../icons/arrow.svg?react'
import DeleteIcon from '../../icons/delete.svg?react'
import { ProductCategoryResponse } from '../../types'
import CategoriesDropdownLine from './CategoriesDropdownLine'
import styles from './crmCategories.module.scss'
import { FC } from 'react'

type Props = {
  type: 'sub_categories' | 'main_category'
  isOpen: Record<string, boolean>
  categories: ProductCategoryResponse[] | null
  categoriesList: (string | number)[]
  categoriesLine: string
  toggleDropdown: (categoriesLine: string) => void
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    categoriesLine: string
  ) => void
  handleClickDelete: (
    e: React.MouseEvent<SVGSVGElement>,
    categoriesLine: string
  ) => void
  selectedCategories: Record<string, string>
}

const CategoriesLine: FC<Props> = ({
  categoriesLine,
  type,
  toggleDropdown,
  categories,
  handleChange,
  handleClickDelete,
  categoriesList,
  selectedCategories,
  isOpen
}) => {
  const renderDeleteIcon = () => {
    return (
      (type === 'sub_categories' ||
        (type === 'main_category' && categoriesList.length > 1)) && (
        <DeleteIcon
          className={styles.iconDel}
          onClick={(e) => {
            handleClickDelete(e, categoriesLine)
          }}
        />
      )
    )
  }

  const renderCategoriesDropdownLine = (category: ProductCategoryResponse) => {
    return (
      <CategoriesDropdownLine
        key={category.id}
        category={category}
        handleChange={handleChange}
        categoriesLine={categoriesLine}
        selectedCategories={selectedCategories}
      />
    )
  }

  return (
    <li
      className={`${styles.categoryLine} ${type === 'main_category' ? styles.mainCategoryLine : ''}`}
    >
      {renderDeleteIcon()}
      <button
        className={styles.categoriesBtn}
        type="button"
        onClick={() => {
          toggleDropdown(categoriesLine)
        }}
      >
        {selectedCategories[categoriesLine]}
        <ArowIcon className={styles.iconArrow} />
      </button>
      {isOpen[categoriesLine] && (
        <ul className={styles.categoriesList}>
          {categories && categories.map(renderCategoriesDropdownLine)}
        </ul>
      )}
    </li>
  )
}

export default CategoriesLine
