import { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import { boxModWin } from './style'

type TModalWindow = {
  yourStBoxModalWindow?: CSSProperties
  children: ReactNode
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  callback: () => void
}

export const ModalCustom = ({
  yourStBoxModalWindow,
  children,
  openModal,
  setOpenModal,
  callback
}: TModalWindow) => {
  const handleCloseModal = () => {
    setOpenModal(false)
    callback && callback()
  }

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...boxModWin, ...yourStBoxModalWindow }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
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
