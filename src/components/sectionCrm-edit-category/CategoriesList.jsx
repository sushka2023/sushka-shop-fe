import { Fragment } from 'react'
import { ReactComponent as IconCheck } from '../../icons/check.svg'
import { ReactComponent as IconEdit } from '../../icons/edit.svg'
import { ReactComponent as IconTrash } from '../../icons/trash.svg'
import styles from './EditCategory.module.scss'
import PropTypes from 'prop-types'

const CategoriesList = ({
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

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentlyEditing: PropTypes.number,
  cancelEditing: PropTypes.func.isRequired,
  editedCategory: PropTypes.object.isRequired,
  handleEditCategory: PropTypes.func.isRequired,
  updateCrmCategory: PropTypes.func.isRequired,
  startEditing: PropTypes.func.isRequired,
  deleteCrmCategory: PropTypes.func.isRequired
}
