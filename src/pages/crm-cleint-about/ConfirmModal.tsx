import React from 'react'
import ModalDialog from '../../components/Crm-Modal-Confirmation/ModalDialog'
import { Button } from '../../components/UI/Button'
import { UserResponseForCRM } from '../../types'

type Props = {
  user: UserResponseForCRM
  openModal: boolean
  setOpenModal: (open: boolean) => void
  changeRole: (role: string) => void
  selectedRole: string
}

const ConfirmModal: React.FC<Props> = ({
  user,
  openModal,
  setOpenModal,
  changeRole,
  selectedRole
}) => {
  return (
    <ModalDialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      title="Змінити роль користувача"
      content={`Ви впевнені, що хочете змінити роль користувача ${user.email}?`}
      actions={
        <React.Fragment>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Скасувати
          </Button>
          <Button
            onClick={() => changeRole(selectedRole)}
            color="primary"
            autoFocus
          >
            Так, змінити
          </Button>
        </React.Fragment>
      }
    />
  )
}

export default ConfirmModal
