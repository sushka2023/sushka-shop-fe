import { useState, useEffect, useRef } from 'react'
import CrmStatus from '../../components/Crm-status/CrmStatus'
import CrmImages from '../../components/Crm-images'
import ArowIcon from '../../icons/arrow.svg?react'
import styles from './crmAddNewProduct.module.scss'

const CrmAddNewProduct = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('Новий')
  const containerRef = useRef(null)

  const handleStatusChange = (newStatus) => {
    return setCurrentStatus(newStatus)
  }

  useEffect(() => {
    const handleClickDropdown = (e) => {
      setIsOpen(!isOpen)

      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickDropdown)

    return () => {
      document.removeEventListener('click', handleClickDropdown)
    }
  }, [isOpen])

  const applyDropDown = (e) => {
    if (e.target.nodeName === 'BUTTON') {
      return
    }

    e.stopPropagation()
  }

  const statusClasses = {
    Новий: styles.statusNew,
    Активний: styles.statusActive,
    Архівований: styles.statusArchive
  }

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            <span
              className={`${styles.status} ${statusClasses[currentStatus]}`}
            >
              {currentStatus}
            </span>
          </div>
          <div className={styles.editSaveBtnsBlock}>
            <div className={styles.dropdownPosition} onClick={applyDropDown}>
              <button
                type="button"
                ref={containerRef}
                className={styles.editBtn}
              >
                Змінити статус
                <ArowIcon className={styles.arrowIcon} />
              </button>
              {isOpen && (
                <CrmStatus
                  onStatusChange={handleStatusChange}
                  currentStatus={currentStatus}
                />
              )}
            </div>
            <button className={styles.saveBtns}>Зберегти</button>
          </div>
        </div>
        <div className={styles.inputsWrapp}>
          <div className={styles.textInputsLayout}>
            <label htmlFor="name" className={styles.label}>
              Назва товару*
              <input type="text" id="name" className={styles.nameInput} />
            </label>
            <label htmlFor="description" className={styles.label}>
              Опис*
              <textarea
                type="text"
                id="description"
                className={styles.descriptionTextaria}
              />
            </label>
          </div>
          <CrmImages />
        </div>
      </form>
    </section>
  )
}

export default CrmAddNewProduct
