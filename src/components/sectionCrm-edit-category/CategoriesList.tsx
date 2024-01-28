import { FC, Fragment } from 'react'
import IconCheck from '../../icons/check.svg?react'
import IconEdit from '../../icons/edit.svg?react'
import IconTrash from '../../icons/trash.svg?react'
import styles from './EditCategory.module.scss'
import { ProductCategoryResponse } from '../../types'

type Props = {
  categories: ProductCategoryResponse[]
  currentlyEditing: number | null
  cancelEditing: (e: React.FormEvent<HTMLFormElement>) => void
  editedCategory: any
  handleEditCategory: (e: React.ChangeEvent<HTMLInputElement>) => void
  updateCrmCategory: () => void
  startEditing: (id: number) => void
  deleteCrmCategory: (id: number) => void
}

const CategoriesList: FC<Props> = ({
  categories,
  currentlyEditing,
  cancelEditing,
  editedCategory,
  handleEditCategory,
  updateCrmCategory,
  startEditing,
  deleteCrmCategory
}) => {
  return (
    <Fragment>
      <ul className={styles.categoryList}>
        {categories?.map((category) => {
          return (
            <li key={category.id}>
              {currentlyEditing === category.id ? (
                <form onSubmit={cancelEditing} className={styles.formEdit}>
                  <input
                    className={styles.categoryEdit}
                    type="text"
                    autoFocus
                    value={editedCategory.name}
                    onChange={handleEditCategory}
                  />
                  <button
                    className={styles.btnSave}
                    type="submit"
                    onClick={updateCrmCategory}
                  >
                    <IconCheck className={styles.iconSave} />
                  </button>
                </form>
              ) : (
                <div className={styles.category}>
                  <div className={styles.textWrapper}>
                    <span className={styles.categoryText}>{category.name}</span>
                    <button
                      className={styles.btnEdit}
                      onClick={() => {
                        return startEditing(category.id)
                      }}
                    >
                      <IconEdit className={styles.iconEdit} />
                    </button>
                  </div>

                  <button
                    className={styles.btnDelete}
                    onClick={() => {
                      return deleteCrmCategory(category.id)
                    }}
                  >
                    <IconTrash className={styles.iconDelete} />
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      {categories?.length === 5 && (
        <div>
          <span className={styles.info}>
            Максимальна кількість категорій (5)
          </span>
        </div>
      )}
    </Fragment>
  )
}

export default CategoriesList
