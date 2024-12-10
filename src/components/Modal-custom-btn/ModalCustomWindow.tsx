import { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import { boxModWin } from './style'
import { useTheme } from '@mui/material'

type TModalWindow = {
  sx?: CSSProperties
  children: ReactNode
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  callback?: () => void
  onAnimationEnd?: () => void
}

export const ModalCustom = ({
  sx,
  children,
  openModal,
  setOpenModal,
  callback
}: TModalWindow) => {
  const theme = useTheme()
  const handleCloseModal = () => {
    setOpenModal(false)
    callback && callback()
  }

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...boxModWin(theme), ...sx }}>
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            [theme.breakpoints.down('sm')]: {
              top: 10,
              right: 10
            }
          }}
        >
          <CloseIcon
            sx={{ width: 28, height: 28, cursor: 'pointer' }}
            onClick={handleCloseModal}
          />
        </Box>
        {children}
      </Box>
    </Modal>
  )
}
