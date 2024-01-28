import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemCard from '../../components/item-card/ItemCard'
import Pagination from '@mui/material/Pagination'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link as ScrollLink } from 'react-scroll'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './CatalogPage.module.scss'
import ArowIcon from '../../icons/arrowdown.svg?react'
import Filter from '../../components/Filter'
import CategoriesButtons from '../../components/Categories-button/Categories'
import {
  FetchItemOperationType,
  fetchItems
} from '../../redux/products/operation'
import { AppDispatch, RootState } from '../../redux/store'

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
  const { params, page } = useParams()
  const [offset, setOffset] = useState<number>(parseInt(page!))
  const [operationType, setOperationType] =
    useState<FetchItemOperationType>('fetch')

  const allProducts = useSelector((state: RootState) => state.items.items)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchItems({ params: offset, operationType: operationType }))
  }, [dispatch, offset, operationType])

  const handleClickLoadMore = () => {
    setOperationType('loadMore')
    const newOffset = offset + 1
    setOffset(newOffset === 1 ? newOffset + 1 : newOffset)
    navigate(`/catalog/${params}/${parseInt(page!) + 1}`)
  }

  const handleClickPagination = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setOperationType('fetch')
    const newPage = parseInt((e.target as HTMLElement).textContent!)
    setOffset(newPage === 1 ? 0 : newPage)
    navigate(`/catalog/${params}/${newPage - 1}`)
  }

  return (
    <section className={styles.catalogBg}>
      <div className={styles.catalogBorder}></div>
      <div className={styles.container}>
        <div className={styles.catalogOption}>
          <CategoriesButtons />
          <div className={styles.optionsWrapper}>
            <Filter />
          </div>
        </div>
        <div>
          <ul className={styles.catalogList}>
            {allProducts.map((item, index) => {
              return (
                <ItemCard
                  item={item}
                  key={index}
                  isFavorite={item.is_favorite}
                />
              )
            })}
          </ul>
        </div>
        <div className={styles.btnWrapper}>
          {offset < 3 && (
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
              <Pagination
                count={3}
                color="primary"
                size="large"
                hidePrevButton
                hideNextButton
                sx={paginationStyles}
                onClick={handleClickPagination}
                page={offset === 0 ? 1 : offset}
              />
            </ScrollLink>
          </ThemeProvider>
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
