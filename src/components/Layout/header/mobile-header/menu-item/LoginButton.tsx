import { Fragment, useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

import { Button } from '../../../../UI/Button'
import ModalPortal from '../../../../modal-portal/ModalPortal'
import Auth from '../../../../auth/Auth'

export const LoginButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Fragment>
      <Button
        variant="contained"
        sx={{
          width: '230px',
          borderRadius: '20px',
          fontSize: '14px',
          mt: '20px',
          padding: '6px 10px'
        }}
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        Увійти до кабінету
        <PersonOutlineIcon sx={{ fontSize: '26px', pl: '7px' }} />
      </Button>
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </Fragment>
  )
}
