import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { logout } from '../../redux/authentication/operation'
import { AppDispatch } from '../../redux/store'
import { Button } from '../UI/Button'
import { btnEditAccount, btnEditModWin } from './style'
import { ModalCustom } from './ModalCustomWindow'

type RootState = {
  auth: {
    accessToken: string
  }
}

export const BasicModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false)

  const [openModal, setOpenModal] = useState(false)

  const token = useSelector((state: RootState) => state.auth.accessToken)

  const handleClickLogout = async () => {
    try {
      setIsLoadingBtn(true)
      await dispatch(logout({ accessToken: token! }))
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoadingBtn(false)
    }
  }

  return (
    <React.Fragment>
      <Button onClick={() => setOpenModal(true)} sx={btnEditAccount}>
        Вийти
      </Button>
      <ModalCustom openModal={openModal} setOpenModal={setOpenModal}>
        <Typography
          id="modal-modal-title"
          variant="body1"
          sx={{ fontSize: 22, fontWeight: 600 }}
        >
          Вийти з аккаунта
        </Typography>

        <Typography
          id="modal-modal-description"
          variant="body2"
          sx={{ mt: 3, fontWeight: 400, fontSize: 18 }}
        >
          Ви точно бажаєте вийти зі свого аккаунта?
        </Typography>
        <Stack spacing={2} direction="row" sx={{ marginTop: '40px' }}>
          <Button
            variant="outlined"
            onClick={() => setOpenModal(false)}
            sx={{
              width: 250,
              height: 50,
              textTransform: 'capitalize'
            }}
          >
            Скасувати
          </Button>
          <Button
            variant="outlined"
            onClick={handleClickLogout}
            sx={{
              ...btnEditModWin,
              width: 250,
              height: 50,
              textTransform: 'capitalize'
            }}
            disabled={isLoadingBtn}
          >
            {isLoadingBtn ? 'Loading...' : 'Вийти'}
          </Button>
        </Stack>
      </ModalCustom>
    </React.Fragment>
  )
}
