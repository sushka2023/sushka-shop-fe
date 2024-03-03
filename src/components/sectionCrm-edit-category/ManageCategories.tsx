/* eslint-disable max-lines */
/* eslint-disable complexity */
import { FC, useEffect, useState } from 'react'
import styles from './EditCategory.module.scss'
import CategoriesList from './CategoriesList'
import ArchivedCategoriesList from './ArchivedCategories'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import FormAddCategory from './FormAddCategory'
import { ProductCategoryResponse } from '../../types'
import axiosInstance from '../../axios/settings'

type Props = {
  type: 'product_category' | 'product_sub_category'
}

const ManageCategories: FC<Props> = ({ type }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState<number | null>(null)
  const [categories, setCategories] = useState<ProductCategoryResponse[]>([])
  const [archivedCategories, setArchivedCategories] = useState<
    ProductCategoryResponse[]
  >([])
  const [newCategory, setNewCategory] = useState('')
  const [editedCategory, setEditedCategory] = useState<
    Partial<ProductCategoryResponse>
  >({ id: 0, name: '' })

  // get categories

  useEffect(() => {
    const fetchCrmCategories = async () => {
      try {
        const { data } = await axiosInstance.get<ProductCategoryResponse[]>(
          `api/${type}/all_for_crm`
        )

        const filteredData = data.filter((item) => {
          return !item.is_deleted
        })
        const filteredArchivedData = data.filter((item) => {
          return item.is_deleted
        })

        setCategories(filteredData)
        setArchivedCategories(filteredArchivedData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCrmCategories()
  }, [type])

  // create category

  const isCategoryExists = async (
    categoryList: ProductCategoryResponse[],
    categoryName: string
  ) => {
    return categoryList.find((category) => {
      return (
        category.name.trim().toLowerCase() === categoryName.trim().toLowerCase()
      )
    })
  }

  const createCrmCategory = async () => {
    if (newCategory.trim() === '' || newCategory.trim().length < 3) {
      Notify.warning(
        'Для створення категорії ведіть текстове значення  (мін. кількість символів: 3)'
      )
      return
    }

    try {
      const categoryExistsInMain = await isCategoryExists(
        categories,
        newCategory
      )

      const categoryExistsInArchived = await isCategoryExists(
        archivedCategories,
        newCategory
      )

      if (categoryExistsInMain || categoryExistsInArchived) {
        Notify.failure(`Категорія <${newCategory}> вже існує у вашому списку!`)
        return
      } else {
        const { data } = await axiosInstance.post(`api/${type}/create`, {
          name: newCategory.trim()
        })

        setCategories([...categories, data])
        setNewCategory('')

        Notify.success(`Категорія <${newCategory}> додана успішно`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreateCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createCrmCategory()
  }

  // delete category

  const deleteCrmCategory = async (categoryId: number) => {
    try {
      const { data } = await axiosInstance.put(`api/${type}/archive`, {
        id: categoryId
      })

      const updatedCategories = categories.filter((category) => {
        return category.id !== categoryId
      })

      setArchivedCategories((prevArchivedCategories) => {
        return [...prevArchivedCategories, data]
      })
      setCategories(updatedCategories)
      Notify.success(`Категорію архівовано`)
    } catch (error) {
      console.error(error)
    }
  }

  //  edit category

  const updateCrmCategory = async () => {
    try {
      if (
        editedCategory.name?.trim() === '' ||
        (editedCategory.name?.trim().length || 0) < 3
      ) {
        Notify.warning(
          'Для едагування категорії ведіть текстове значення  (мін. кількість символів: 3)'
        )
        setCurrentlyEditing(null)
        setEditedCategory({ id: 0, name: '' })
        return
      }

      const { id, name } = editedCategory
      const categoryExistsInMain = await isCategoryExists(categories, name!)

      const categoryExistsInArchived = await isCategoryExists(
        archivedCategories,
        name!
      )

      if (categoryExistsInMain || categoryExistsInArchived) {
        Notify.failure(`Категорія <${name}> вже існує у вашому списку!`)
        setCurrentlyEditing(null)
        setEditedCategory({ id: 0, name: '' })
      } else {
        await axiosInstance.patch(`api/${type}/edit`, { id, name })

        const updatedCategories = categories.map((category) => {
          return category.id === id ? { ...category, name: name! } : category
        })

        setCategories(updatedCategories)
        setCurrentlyEditing(null)
        setEditedCategory({ id: 0, name: '' })
        Notify.success(`Категорію змінено успішно`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCategory({
      ...editedCategory,
      name: e.target.value
    })
  }

  const startEditing = (categoryId: number) => {
    const categoryToEdit = categories.find((category) => {
      return category.id === categoryId
    })
    setEditedCategory({ ...categoryToEdit })
    setCurrentlyEditing(categoryId)
  }

  const cancelEditing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  // unarchive category
  const unarchiveCrmCategory = async (categoryId: number) => {
    try {
      const { data } = await axiosInstance.put(`api/${type}/unarchive`, {
        id: categoryId
      })

      const updatedArchivedCategories = archivedCategories.filter(
        (category) => {
          return category.id !== categoryId
        }
      )
      setArchivedCategories(updatedArchivedCategories)
      addUnarchivedToCategories(data)
      Notify.success(`Категорію успішно додано у список`)
    } catch (error) {
      console.error(error)
    }
  }

  const addUnarchivedToCategories = (unarchived: ProductCategoryResponse) => {
    setCategories((prevCategories) => {
      return [...prevCategories, unarchived]
    })
  }

  return (
    <div>
      <div className={styles.container}>
        <div
          className={`${styles.categoryContainer} ${styles.heightContainer}`}
        >
          {type === 'product_category' ? (
            <h4 className={styles.categoryTitle}>Категорії товарів</h4>
          ) : (
            <h4 className={styles.categoryTitle}>Саб-категорії товарів</h4>
          )}

          <FormAddCategory
            handleCreateCategory={handleCreateCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            categories={categories}
          />

          <CategoriesList
            categories={categories}
            currentlyEditing={currentlyEditing}
            cancelEditing={cancelEditing}
            editedCategory={editedCategory}
            handleEditCategory={handleEditCategory}
            updateCrmCategory={updateCrmCategory}
            startEditing={startEditing}
            deleteCrmCategory={deleteCrmCategory}
          />
        </div>
      </div>
      {archivedCategories?.length !== 0 && (
        <div className={styles.container}>
          <div className={styles.categoryContainer}>
            {type === 'product_category' ? (
              <h4 className={styles.categoryTitle}>
                Архівовані категорії товарів
              </h4>
            ) : (
              <h4 className={styles.categoryTitle}>
                Архівовані саб-категорії товарів
              </h4>
            )}

            <ArchivedCategoriesList
              categories={categories}
              unarchiveCrmCategory={unarchiveCrmCategory}
              archivedCategories={archivedCategories}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageCategories
