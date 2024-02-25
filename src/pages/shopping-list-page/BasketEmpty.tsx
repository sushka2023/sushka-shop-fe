import { useNavigate } from 'react-router-dom'
import styles from './ShoppingListPage.module.scss'

const BasketEmpty = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.shopEmptyWrapper}>
        <h2 className={styles.shopEmptyTitle}>
          На жаль, ваш кошик пустий. <br />
          Наповніть його, та повертайтеся - ми раді вас бачити!
        </h2>
        <button
          onClick={() => navigate('/catalog')}
          className={styles.btnEmpty}
        >
          Наповнити кошик
        </button>
      </div>
    </div>
  )
}

export default BasketEmpty
