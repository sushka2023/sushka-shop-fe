import CrmStatus from '../../components/Crm-status/CrmStatus'
import ArowIcon from '../../icons/arrow.svg?react'
import styles from './crmAddNewProduct.module.scss'

const StatusDropdown = ({
  isOpen,
  containerRef,
  applyDropDown,
  handleChangeFormData,
  handleChangeStatus,
  currentStatus,
  setCurrentStatus
}) => {
  return (
    <div className={styles.dropdownPosition} onClick={applyDropDown}>
      <button type="button" ref={containerRef} className={styles.editBtn}>
        Змінити статус
        <ArowIcon className={styles.arrowIcon} />
      </button>
      {isOpen && (
        <CrmStatus
          onChange={handleChangeFormData}
          onStatusChange={(type, newStatusValue, newStatusName) => {
            return handleChangeStatus(
              type,
              newStatusValue,
              newStatusName,
              setCurrentStatus
            )
          }}
          currentStatus={currentStatus}
        />
      )}
    </div>
  )
}

export default StatusDropdown
