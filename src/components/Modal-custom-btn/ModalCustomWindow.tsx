import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'

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

  const styleBoxModalWindow: React.CSSProperties = {
    width: '100%',
    maxWidth: 600,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#567343',
    padding: '30px 20px 50px 20px',
    border: 'none',
    fontFamily: 'Open Sans'
  }

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...styleBoxModalWindow, ...yourStBoxModalWindow }}>
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
