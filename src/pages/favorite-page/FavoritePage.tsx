import { useState } from 'react'
import Auth from '../../components/auth/Auth'
import ModalPortal from '../../components/modal-portal/ModalPortal'
import IconAddNewItem from '../../icons/add.svg?react'
import ErrorDog from '../../images/error-dog.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './favoritePage.module.scss'
import ItemCard from '../../components/item-card/ItemCard'
import { RootState } from '../../redux/store'
import { getToken } from '../../utils/cookie/token'

const FavoritePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const allItem = useSelector((state: RootState) => state.items.items)
  const accessToken = getToken()
  const favoriteItems = allItem.filter((item) => {
    return item.is_favorite
  })

  const handleClickAuth = () => {
    const accessToken = getToken()
    setIsModalOpen(!accessToken && true)
  }

  return (
    <section className={styles.favoriteBg}>
      <div className={styles.favoriteBorder}></div>
      <div className={styles.container}>
        <h2 className={styles.title}>Улюблене</h2>
        {accessToken ? (
          <ul className={styles.list}>
            {favoriteItems.map((item) => {
              return (
                <ItemCard
                  item={item}
                  key={item.id}
                  isFavorite={item.is_favorite}
                />
              )
            })}
            <li className={styles.addNewItem}>
              <Link className={styles.link} to="/catalog">
                <IconAddNewItem className={styles.addNewItemIcon} />
                <p className={styles.addNewItemText}>
                  Додати товар до улюбленого
                </p>
              </Link>
            </li>
          </ul>
        ) : (
          <div className={styles.errorWrapp}>
            <img className={styles.dogImg} src={ErrorDog} alt="error dog" />
            <h2 className={styles.titleError}>
              Авторизуйтесь, щоб додати товар до улюбленого
            </h2>
            <button className={styles.authBtn} onClick={handleClickAuth}>
              Авторизуватися
            </button>
          </div>
        )}
      </div>
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </section>
  )
}

export default FavoritePage
