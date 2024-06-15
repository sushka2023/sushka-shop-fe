import React, { FC } from 'react'
import { Alert, Snackbar } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoIcon from '@mui/icons-material/Info'
import { useSnackbar } from '../../hooks/useSnackbar'

export const stSnackebar = {
  border: '1px solid',
  borderColor: 'peach.darker',
  backgroundColor: 'background.default',
  boxShadow: `
   rgba(50, 50, 93, 0.15) 0px 13px 27px -5px,
   rgba(0, 0, 0, 0.1) 0px 8px 16px -5px
 `,
  color: 'secondary.darker',
  borderRadius: '10px  0 0 10px',
  fontWeight: 600,
  fontSize: 17,
  fontFamily: 'Open Sans',
  marginTop: 8
}

const CustomSnackbar: FC = () => {
  const { snackbarData, hideSnackbar } = useSnackbar()

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={snackbarData.open}
        autoHideDuration={2000}
        onClose={hideSnackbar}
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbarData.error ? 'error' : 'success'}
          variant="filled"
          sx={stSnackebar}
          icon={
            snackbarData.error ? (
              <InfoIcon sx={{ color: 'error.darker' }} />
            ) : (
              <CheckCircleIcon sx={{ color: 'primary.darker' }} />
            )
          }
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}
export default CustomSnackbar
