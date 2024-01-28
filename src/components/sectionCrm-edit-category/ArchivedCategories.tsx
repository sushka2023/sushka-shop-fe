import styles from './EditCategory.module.scss'
import IconPlus from '../../icons/plus1.svg?react'
import { FC, Fragment } from 'react'
import { ProductCategoryResponse } from '../../types'

type Props = {
  archivedCategories: ProductCategoryResponse[]
  unarchiveCrmCategory: (categoryId: number) => Promise<void>
  categories: ProductCategoryResponse[]
}

const ArchivedCategoriesList: FC<Props> = ({
  archivedCategories,
  unarchiveCrmCategory,
  categories
}) => {
  return (
    <Fragment>
      <ul className={styles.categoryList}>
        {archivedCategories?.map((category) => {
          return (
            <li key={category.id}>
              <div className={styles.category}>
                <div className={styles.textWrapper}>
                  <span className={styles.categoryText}>{category.name}</span>
                </div>

                <button
                  className={styles.btnUnarchive}
                  onClick={() => {
                    return unarchiveCrmCategory(category.id)
                  }}
                  disabled={categories.length >= 5}
                >
                  <IconPlus
                    className={
                      categories.length >= 5
                        ? styles.iconPlusDisable
                        : styles.iconPlus
                    }
                  />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </Fragment>
  )
}

export default ArchivedCategoriesList
