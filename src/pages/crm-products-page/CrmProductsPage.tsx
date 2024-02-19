import { Link } from 'react-router-dom'
import PlusIcon from '../../icons/plus.svg?react'
import SearchIcon from '../../icons/search.svg?react'
import styles from './crmProductsPage.module.scss'
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { Button, SelectChangeEvent } from '@mui/material'

import { useCallback, useEffect, useState } from 'react'
import {
  fetchMainCategories,
  fetchProductsForCrm
} from '../../redux/crm-add-new-product/operation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ProductStatus, ProductSubCategoryResponse } from '../../types'
import SelectProductStatus from './SelectProductStatus'
import SelectProductCategory from './SelectProductCategory'

const PAGE_SIZE = 10

export const options = [
  { value: '', label: 'Статус' },
  { value: ProductStatus.NEW, label: 'Новий' },
  { value: ProductStatus.ACTIVATED, label: 'Активний' },
  { value: ProductStatus.ARCHIVED, label: 'Архіований' }
]

const CrmProductsPage = () => {
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const {
    productsForCrmTotalCount,
    productsForCrmPageNumber,
    productsForCrm,
    isLoadingForCrm
  } = useSelector((state: RootState) => state.newProduct)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: PAGE_SIZE,
    page: productsForCrmPageNumber
  })
  const mainCategories = useSelector(
    (state: RootState) => state.allCategories.mainCategories
  )
  const handleCategoryChange = useCallback(
    (event: SelectChangeEvent) => {
      setCategory(event.target.value)
    },
    [setCategory]
  )
  const handleStatusChange = useCallback(
    (event: SelectChangeEvent) => {
      setStatus(event.target.value)
    },
    [setStatus]
  )

  const handlePaginationModelChange = useCallback(
    (paginationModel: GridPaginationModel) => {
      const categoryId = category === '' ? undefined : parseInt(category)
      const productStatus =
        status === '' ? undefined : (status as ProductStatus)

      dispatch(
        fetchProductsForCrm({
          limit: PAGE_SIZE,
          offset: paginationModel.page * PAGE_SIZE,
          productStatus,
          productCategoryId: categoryId
        })
      )
    },
    [status, productsForCrmPageNumber, category]
  )

  useEffect(() => {
    setPaginationModel((model) => ({
      ...model,
      page: productsForCrmPageNumber
    }))
  }, [productsForCrmPageNumber])

  useEffect(() => {
    const categoryId = category === '' ? undefined : parseInt(category)
    const productStatus = status === '' ? undefined : (status as ProductStatus)

    setPaginationModel((model) => ({ ...model, page: 0 }))
    dispatch(
      fetchProductsForCrm({
        limit: PAGE_SIZE,
        offset: 0,
        productStatus,
        productCategoryId: categoryId
      })
    )
  }, [status, category])

  useEffect(() => {
    dispatch(fetchMainCategories({ operationType: 'fetch-main-categories' }))
    dispatch(
      fetchProductsForCrm({
        limit: PAGE_SIZE,
        offset: 0
      })
    )
  }, [])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Номер' },
    {
      field: 'name',
      headerName: 'Назва товару',
      flex: 1
    },
    {
      field: 'product_category_id',
      headerName: 'Категорія',
      flex: 1,
      valueGetter: (params) => {
        const category = mainCategories?.find(
          (mainCategory) => mainCategory.id === params.value
        )
        if (!category) {
          return params.value
        }

        return category.name
      }
    },
    {
      field: 'sub_categories',
      headerName: 'Саб-категорія',
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value
        }

        const subCategories = params.value as ProductSubCategoryResponse[]
        return subCategories.map((category) => category.name).join(', ')
      }
    },
    {
      field: 'product_status',
      headerName: 'Статус товару',
      flex: 1,
      valueGetter: (params) => {
        const option = options.find((option) => option.value === params.value)

        if (!option) {
          return params.value
        }

        return option.label
      }
    },
    {
      field: 'edit',
      headerName: 'Змінити',
      renderCell: () => {
        return <Button>Click</Button>
      }
    }
  ]

  return (
    <section className={styles.containerBg}>
      <div className={styles.container}>
        <div className={styles.spaceBetweenWrapper}>
          <h1 className={styles.title}>Товари</h1>
          <div className={styles.flexWrapper}>
            <div className={styles.selectorWrapper}>
              <label htmlFor="search" className={styles.searchLabel}>
                <SearchIcon className={styles.searchIcon} />
                <input
                  type="search"
                  placeholder="Введіть номер або назву"
                  className={styles.search}
                />
              </label>
              <Link to={'addNewProduct'} className={styles.addNewProduct}>
                Додати
                <PlusIcon className={styles.iconPlus} />
              </Link>
            </div>
            <div className={styles.selectorWrapper}>
              <SelectProductStatus
                status={status}
                handleStatusChange={handleStatusChange}
              />
              <SelectProductCategory
                category={category}
                handleCategoryChange={handleCategoryChange}
                mainCategories={mainCategories}
              />
            </div>
          </div>
        </div>
        <div>
          <DataGrid
            rows={productsForCrm}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[10]}
            paginationMode="server"
            rowCount={productsForCrmTotalCount}
            disableRowSelectionOnClick
            loading={isLoadingForCrm}
          />
        </div>
      </div>
    </section>
  )
}

export default CrmProductsPage
