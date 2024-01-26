import styles from './crmCategories.module.scss'

const CategoriesDropdownLine = ({
  category,
  categoriesLine,
  selectedCategories,
  handleChange
}) => {
  return (
    <li className={styles.categoriesListLine}>
      <input
        type="radio"
        id={`${category.name}-${categoriesLine}`}
        name={category.id}
        value={category.name}
        className={styles.categoryInput}
        onChange={(e) => {
          return handleChange(e, categoriesLine)
        }}
        checked={selectedCategories[categoriesLine] === category.name}
      />
      <label
        htmlFor={`${category.name}-${categoriesLine}`}
        className={`${styles.categoryLabel} ${
          selectedCategories[categoriesLine] === category.name
            ? styles.categoryLabelActive
            : ''
        }`}
      >
        {category.name}
      </label>
    </li>
  )
}

export default CategoriesDropdownLine
