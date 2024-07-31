import { Link } from 'react-router-dom'
import PlusIcon from '../../icons/plus.svg?react'
import SearchIcon from '../../icons/search.svg?react'
import styles from './crmProductsPage.module.scss'
import { GridPaginationModel } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  fetchMainCategories,
  fetchProductsForCrm,
  searchProductsForCrm
} from '../../redux/crm-add-new-product/operation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ProductStatus } from '../../types'
import SelectProductStatus from './SelectProductStatus'
import SelectProductCategory from './SelectProductCategory'
import CustomPagination from './CrmProductPageCustomPagination'
import { StyledDataGrid } from './CrmProductPageStyledDataGrid'
import { columns } from './CrmProductDataGridColumns'
import useDebounce from '../../hooks/useDebounce'
import CustomNoRowsOverlay from './CustomNoRowsOverlay'

export const PAGE_SIZE = 9
const DEBOUNCE_DELAY = 300
export const OPTIONS = [
  { value: '', label: 'Статус' },
  { value: ProductStatus.NEW, label: 'Новий' },
  { value: ProductStatus.ACTIVATED, label: 'Активний' },
  { value: ProductStatus.ARCHIVED, label: 'Архівований' }
]

const CrmProductsPage = () => {
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const searchDebounce = useDebounce(searchQuery, DEBOUNCE_DELAY)
  const dispatch = useDispatch<AppDispatch>()
  const {
    productsForCrmTotalCount,
    productsForCrmPageNumber,
    productsForCrm,
    isLoadingForCrm,
    searchProductForCrm,
    searchProductsForCrmTotalCount,
    searchProductsForCrmPageNumber,
    isLoadingForCrmSearch
  } = useSelector((state: RootState) => state.newProduct)

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: PAGE_SIZE,
    page: searchQuery
      ? searchProductsForCrmPageNumber
      : productsForCrmPageNumber
  })
  const mainCategories = useSelector(
    (state: RootState) => state.allCategories.mainCategories
  )
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
  }
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value)
  }

  const handlePaginationModelChange = (
    paginationModel: GridPaginationModel
  ) => {
    const categoryId = category === '' ? undefined : parseInt(category)
    const productStatus = status === '' ? undefined : (status as ProductStatus)
    if (searchDebounce) {
      dispatch(
        searchProductsForCrm({
          limit: PAGE_SIZE,
          offset: paginationModel.page * PAGE_SIZE,
          searchQuery: searchDebounce
        })
      )
    } else {
      dispatch(
        fetchProductsForCrm({
          limit: PAGE_SIZE,
          offset: paginationModel.page * PAGE_SIZE,
          productStatus,
          productCategoryId: categoryId
        })
      )
    }
  }

  const searchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    if (!searchDebounce) {
      return
    }
    dispatch(
      searchProductsForCrm({
        limit: PAGE_SIZE,
        offset: 0,
        searchQuery: searchDebounce
      })
    )
  }, [searchDebounce])

  useEffect(() => {
    setPaginationModel(() => ({
      pageSize: PAGE_SIZE,
      page: searchDebounce
        ? searchProductsForCrmPageNumber
        : productsForCrmPageNumber
    }))
  }, [searchDebounce, productsForCrmPageNumber, searchProductsForCrmPageNumber])

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
                  value={searchQuery}
                  onChange={searchTextChange}
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
          <StyledDataGrid
            autoHeight
            rows={searchQuery ? searchProductForCrm : productsForCrm}
            columns={columns(mainCategories)}
            paginationModel={paginationModel}
            slots={{
              pagination: CustomPagination,
              noRowsOverlay: CustomNoRowsOverlay
            }}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[PAGE_SIZE]}
            paginationMode="server"
            rowCount={
              searchQuery
                ? searchProductsForCrmTotalCount
                : productsForCrmTotalCount
            }
            disableRowSelectionOnClick
            disableColumnFilter
            loading={searchQuery ? isLoadingForCrmSearch : isLoadingForCrm}
            disableColumnMenu
          />
        </div>
      </div>
    </section>
  )
}

export default CrmProductsPage
