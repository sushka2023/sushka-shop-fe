import * as React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'

import { modalDialog, infoIcon, closeIcon, actionsBtn } from './style'

type ModalDialogProps = {
  open: boolean
  onClose: () => void
  title: string
  content: string
  actions?: React.ReactNode // Робимо actions необов'язковим
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  onClose,
  title,
  content,
  actions
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      sx={modalDialog}
    >
      <DialogTitle id="dialog-title" fontWeight={600}>
        <InfoIcon sx={infoIcon} />
        {title}
        <CloseIcon sx={closeIcon} onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'inherit' }}>
          {content}
        </DialogContentText>
      </DialogContent>
      {actions && <DialogActions sx={actionsBtn}>{actions}</DialogActions>}
    </Dialog>
  )
}

export default ModalDialog
