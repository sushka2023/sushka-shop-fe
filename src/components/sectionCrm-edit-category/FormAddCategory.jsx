import { Fragment } from 'react'
import { ReactComponent as IconCheck } from '../../icons/check.svg'
import styles from './EditCategory.module.scss'
import PropTypes from 'prop-types'

const FormAddCategory = ({
  handleCreateCategory,
  newCategory,
  setNewCategory,
  categories
}) => {
  const handleChangeInput = (e) => {
    const inputValue = e.target.value
    setNewCategory(inputValue)
  }

  return (
    <Fragment>
      <form
        className={styles.formAdd}
        autoComplete="off"
        onSubmit={handleCreateCategory}
      >
        <input
          className={styles.categoryAdd}
          maxLength={20}
          type="text"
          placeholder="Нова категорія"
          required
          value={newCategory}
          onChange={handleChangeInput}
        />
        <button
          className={styles.btnAdd}
          type="submit"
          disabled={categories.length >= 5 || !newCategory}
        >
          <IconCheck
            className={
              categories.length >= 5 ? styles.iconAddDisable : styles.iconAdd
            }
          />
        </button>
      </form>
    </Fragment>
  )
}

export default FormAddCategory

FormAddCategory.propTypes = {
  handleCreateCategory: PropTypes.func.isRequired,
  newCategory: PropTypes.string.isRequired,
  setNewCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired
}
