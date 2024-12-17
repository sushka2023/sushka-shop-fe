import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link as ScrollLink } from 'react-scroll'
import styles from './CatalogPage.module.scss'
import ArowIcon from '../../icons/arrowdown.svg?react'
import Filter from '../../components/Filter'
import CategoriesButtons from '../../components/Categories-button/Categories'
import { AppDispatch, RootState } from '../../redux/store'
import { setOffset, setOperation } from '../../redux/products/slice'
import CatalogList from '../../components/catalog-list/CatalogList'

const PRODUCT_QUANTITY = 9

const theme = createTheme({
  palette: {
    primary: {
      main: '#FCC812'
    }
  }
})

const paginationStyles = {
  '& .MuiPaginationItem-root': {
    fontFamily: 'Open Sans',
    fontSize: '22px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '120%',
    color: '#FFF !important'
  }
}

const CatalogPage = () => {
  const [page, setPage] = useState(1)

  const totalCount = useSelector((state: RootState) => state.items.totalCount)
  const offset = useSelector((state: RootState) => state.items.offset)
  const dispatch = useDispatch<AppDispatch>()
  const totalNumberOfPages = Math.ceil(totalCount / PRODUCT_QUANTITY)

  const handleClickLoadMore = () => {
    dispatch(setOperation('loadMore'))
    const newOffset = offset + PRODUCT_QUANTITY
    setPage(page + 1)
    dispatch(setOffset(newOffset))
  }

  const handleClickPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setOperation('fetch'))
    const currentPage = parseInt((e.target as HTMLButtonElement).innerText)
    setPage(currentPage)
    dispatch(setOffset((currentPage - 1) * PRODUCT_QUANTITY))
  }

  return (
    <section className={styles.catalogBg}>
      <div className={styles.catalogBorder}></div>
      <div className={styles.container}>
        <div className={styles.catalogOption}>
          <CategoriesButtons setPage={setPage} />
          <div className={styles.optionsWrapper}>
            <Filter />
          </div>
        </div>
        <div>
          <CatalogList />
        </div>
        <div className={styles.btnWrapper}>
          {page < totalNumberOfPages && (
            <button
              type="button"
              className={styles.loadMore}
              onClick={handleClickLoadMore}
            >
              Більше
              <ArowIcon />
            </button>
          )}
        </div>
        <div className={styles.pagination}>
          <ThemeProvider theme={theme}>
            <ScrollLink to="nav">
              {totalNumberOfPages > 1 && (
                <Pagination
                  count={totalNumberOfPages}
                  color="primary"
                  size="large"
                  hidePrevButton
                  hideNextButton
                  sx={paginationStyles}
                  onClick={handleClickPagination}
                  page={page}
                />
              )}
            </ScrollLink>
          </ThemeProvider>
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
