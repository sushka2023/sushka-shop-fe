import { FC, Fragment } from 'react'
import IconCheck from '../../icons/check.svg?react'
import styles from './EditCategory.module.scss'
import { ProductCategoryResponse } from '../../types'

type Props = {
  handleCreateCategory: (e: React.FormEvent<HTMLFormElement>) => void
  newCategory: string
  setNewCategory: (value: string) => void
  categories: ProductCategoryResponse[]
}

const FormAddCategory: FC<Props> = ({
  handleCreateCategory,
  newCategory,
  setNewCategory,
  categories
}) => {
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
