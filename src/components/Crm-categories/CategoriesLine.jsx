import CategoriesDropdownLine from './CategoriesDropdownLine'
import ArowIcon from '../../icons/arrow.svg?react'
import DeleteIcon from '../../icons/delete.svg?react'
import styles from './crmCategories.module.scss'

const CategoriesLine = ({
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
            return handleClickDelete(e, categoriesLine)
          }}
        />
      )
    )
  }

  const renderCategoriesDropdownLine = (category) => {
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
          return toggleDropdown(categoriesLine)
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
