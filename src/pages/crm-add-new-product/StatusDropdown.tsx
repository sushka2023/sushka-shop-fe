import { FC, Ref } from 'react'
import CrmStatus from '../../components/Crm-status/CrmStatus'
import ArowIcon from '../../icons/arrow.svg?react'
import styles from './crmAddNewProduct.module.scss'
import { ProductStatusDropDown } from '../../types'

type Props = {
  isOpen: boolean
  containerRef: Ref<HTMLButtonElement>
  applyDropDown: (e: React.MouseEvent<HTMLDivElement>) => void
  handleChangeStatus: (
    type: any,
    newStatusValue: string,
    newStatusName: ProductStatusDropDown
  ) => void
  currentStatus: string
}

const StatusDropdown: FC<Props> = ({
  isOpen,
  containerRef,
  applyDropDown,
  handleChangeStatus,
  currentStatus
}) => {
  return (
    <div className={styles.dropdownPosition} onClick={applyDropDown}>
      <button type="button" ref={containerRef} className={styles.editBtn}>
        Змінити статус
        <ArowIcon className={styles.arrowIcon} />
      </button>
      {isOpen && (
        <CrmStatus
          onStatusChange={(type, newStatusValue, newStatusName) => {
            handleChangeStatus(
              type,
              newStatusValue,
              newStatusName as ProductStatusDropDown
            )
          }}
          currentStatus={currentStatus}
        />
      )}
    </div>
  )
}

export default StatusDropdown
