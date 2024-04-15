import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import { stBoxModalWindow } from './style'
type TModalWindow = {
  yourStBoxModalWindow?: React.CSSProperties
  children: React.ReactNode
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function InfoConfirmationModal({
  yourStBoxModalWindow,
  children,
  openModal,
  setOpenModal
}: TModalWindow) {
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...stBoxModalWindow, ...yourStBoxModalWindow }}>
          <React.Fragment>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
              <CloseIcon
                sx={{ width: 28, height: 28, cursor: 'pointer' }}
                onClick={handleCloseModal}
              />
            </Box>
            {children}
          </React.Fragment>
        </Box>
      </Modal>
    </div>
  )
}
