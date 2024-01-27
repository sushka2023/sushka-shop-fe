import { FC } from 'react'
import styles from './crmCategories.module.scss'
import { ProductCategoryResponse } from '../../types'

type Props = {
  category: ProductCategoryResponse
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    categoriesLine: string
  ) => void
  categoriesLine: string
  selectedCategories: Record<string, string>
}

const CategoriesDropdownLine: FC<Props> = ({
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
        name={`${category.id}`}
        value={category.name}
        className={styles.categoryInput}
        onChange={(e) => {
          handleChange(e, categoriesLine)
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
