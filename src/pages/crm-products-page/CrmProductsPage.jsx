import { Link } from 'react-router-dom'
import { ReactComponent as PlusIcon } from '../../icons/plus.svg'
import { ReactComponent as SearchIcon } from '../../icons/search.svg'
import styles from './crmProductsPage.module.scss'

const CrmProductsPage = () => {
  return (
    <section className={styles.containerBg}>
      <div className={styles.container}>
        <div className={styles.spaceBetweenWrapper}>
          <h1 className={styles.title}>Товари</h1>
          <div className={styles.flexWrapper}>
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
        </div>
      </div>
    </section>
  )
}

export default CrmProductsPage
